const utils = require('../tools/utils')

module.exports = async (ctx, next) => {
    const {page, pageSize, skey} = ctx.query
    // 新建model
    let Book = utils.bookshelf('cauth').Model.extend({
        tableName: 'books'
    }) 
    const mysqlSelect = new Book()
                            .query()
                            .select('books.*', 'csessioninfo.user_info')
                            .join('csessioninfo', 'books.openid', 'csessioninfo.openid')
                            .orderBy('books.id', 'desc')
    
    let books = null
    if (skey) {
        // 新建model
        let User = utils.bookshelf('cauth').Model.extend({
            tableName: 'csessioninfo'
        })
        // 查询数据库（依据skey）（获取用户openId）
        let rs = await utils.getOneFromDb(User, { skey })
        const openId = rs.attributes.openid
        // 获取评论tab页的图书列表
        books = await mysqlSelect.where('books.openid', openId)
    } else {
        // 获取书籍tab页的图书列表（分页）
        books = await mysqlSelect.limit(pageSize).offset(Number(page-1) * pageSize)
    }
    
    ctx.state.data = {
        list: books.map(item => {
            const info = JSON.parse(item.user_info)
            return Object.assign({}, item, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
    next()
}