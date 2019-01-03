const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');

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
    }`
    );
    // check if they own that item, or have the permission to delete it
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
};

module.exports = mutations;
