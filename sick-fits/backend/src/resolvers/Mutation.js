const mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem({
      data: { ...args }
    }, info)
    return item
  },
  async updateItem(parent, args, ctx, info) {
    const updatedItem = await ctx.db.mutation.updateItem({
      data: { ...args }
    }, {
      id: args.id
    }, info)
    return updatedItem
  }
};

module.exports = mutations;
