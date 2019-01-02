const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args },
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
};

module.exports = mutations;
