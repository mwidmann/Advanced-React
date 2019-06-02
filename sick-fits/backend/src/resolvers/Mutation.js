const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');

const mutations = {
  async createItem(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that');
    }

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
          // connect the user to the user object
          user: {
            connect: {
              id: ctx.request.userId,
            },
          },
        },
      },
      info
    );
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    // take a copy of the updates
    const updates = { ...args };
    // remove the id from the updates
    delete updates.id;
    // run the update
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the item
    const item = await ctx.db.query.item(
      { where },
      `{
      id
      title
      user {
        id
      }
    }`
    );
    // check if they own that item, or have the permission to delete it
    if (!ctx.request.userId) {
      throw new Error('You must login to perform this action');
    }
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN', 'ITEMDELETE'].includes(permission)
    );

    if (!ownsItem && !hasPermissions) {
      throw new Error("You don't have the permission to delete this item");
    }
    // delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  // signup(email: String!, password: String!, name: String!): User!
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash the password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    // create a jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there's a user with that email address
    const user = await ctx.db.query.user({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      throw new Error(`No such user found for email ${email}!`);
    }
    // 2. check if the passwords match
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Password doesn't match`);
    }
    // 3. generate a jwt
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. set the cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return {
      message: 'Signed out',
    };
  },
  async requestReset(parent, args, ctx, info) {
    // 1. check if this is a real user
    const user = await ctx.db.query.user({
      where: { email: args.email.toLowerCase() },
    });
    if (!user) {
      throw new Error(`no such user found for email ${args.email}`);
    }
    // 2. Set reset token and expiry on that user
    const randomBytesPromisify = promisify(randomBytes);
    const resetToken = (await randomBytesPromisify(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour in the future

    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email.toLowerCase() },
      data: { resetToken, resetTokenExpiry },
    });
    // 3. email them the reset token
    // console.log(process.env.FRONTEND_URL, ctx.request.headers.origin);
    const resetTokenLink = process.env.FRONTEND_URL.includes(
      ctx.request.headers.origin
    )
      ? `${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}`
      : `${process.env.VUE_FRONTEND_URL}/reset/${resetToken}`;

    const mailRes = await transport.sendMail({
      from: 'nobody@example.com',
      to: user.email,
      subject: 'Your password reset token',
      html: makeANiceEmail(`Your Password Reset Token is here

      <a href="${resetTokenLink}">Click here to reset.</a>`),
    });

    return {
      message: 'Reset token sent.',
    };
  },
  async resetPassword(
    parent,
    { resetToken, password, confirmPassword },
    ctx,
    info
  ) {
    // 1. check if the passwords match
    if (password !== confirmPassword) {
      throw new Error(`Passwords don't match`);
    }
    // 2. check if the reset token is valid
    const [user] = await ctx.db.query.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });
    if (!user) {
      throw new Error(`The token is either invalid or has expired.`);
    }
    // 3. hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. update the user and remove resetToken and resetTokenExpiry
    const res = await ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // 5. create and set JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    // 6. return the user
    return user;
  },
  async updatePermissions(parent, args, ctx, info) {
    // check if the user has the correct permissions to set permissions
    if (!ctx.request.userId) {
      throw new Error('You must login to perform this action');
    }
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // set the permissions to the requested user...
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
        },
        where: {
          id: args.userId,
        },
      },
      info
    );
  },
  async addToCart(parent, args, ctx, info) {
    // 1. check if the user is signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must login to perform this action');
    }
    // 2. Query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        item: { id: args.id },
        user: { id: userId },
      },
    });
    // check if the item is already in the cart and increment by one if so
    if (existingCartItem) {
      return ctx.db.mutation.updateCartItem(
        {
          data: {
            quantity: existingCartItem.quantity + 1,
          },
          where: { id: existingCartItem.id },
        },
        info
      );
    }
    // create a fresh cart item
    return ctx.db.mutation.createCartItem(
      {
        data: {
          user: { connect: { id: userId } },
          item: { connect: { id: args.id } },
        },
      },
      info
    );
  },
  async removeFromCart(parent, args, ctx, info) {
    // 1. Find the CartItem
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id,
        },
      },
      `{ id, user { id }}`
    );
    // 1.5 make sure we found an item
    if (!cartItem) throw new Error('No CartItem found!');
    // 2. Make sure they own the CartItem
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error('Cheatin, huh?');
    }
    // 3. Delete the CartItem
    return ctx.db.mutation.deleteCartItem({ where: { id: args.id } }, info);
  },
};

module.exports = mutations;
