const utils = require('../tools/utils')

module.exports = async (ctx, next) => {
    // 新建model
    let User = utils.bookshelf('cauth').Model.extend({
        tableName: 'csessioninfo',
        book: function() {
            return this.hasOne(Book, 'openid', 'openid')
        }
    })
    // 新建model
    let Book = utils.bookshelf('cauth').Model.extend({
        tableName: 'books',
        user: function() {
            return this.belongsTo(User, 'openid', 'openid');
        } 
    }) 
    // 获取图书列表信息
    let bookList = await utils.linkedQuery(Book, 'user', 'id', 'DESC', ctx.query.page, ctx.query.pageSize)
    
    ctx.state.data = {
        list: bookList
    }
    next()
}