const mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem({
      data: { ...args }
    }, info)
    return item
  },
  async updateItem(parent, args, ctx, info) {
    // take a copy of the updates
    const updates = { ...args }
    // remove the id from the updates
    delete updates.id
    // run the update
    return ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id
      }
    }, info)
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    // find the item
    const item = await ctx.db.query.item({ where }, `{
      id
      title
    }`)
    // check if they own that item, or have the permission to delete it
    // delete it
    return ctx.db.mutation.deleteItem({ where }, info)
  }
};

module.exports = mutations;
