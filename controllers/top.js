const utils = require('../tools/utils')

module.exports = async (ctx, next) => {
    // 新建model
    let Book = utils.bookshelf('cauth').Model.extend({
        tableName: 'books'
    })
    let res = await new Book()
        .query()
        .select('id', 'title', 'image', 'count')
        .orderBy('count', 'DESC')
        .limit(9)
    ctx.state.data = {
        list: res
    }
    next()
}