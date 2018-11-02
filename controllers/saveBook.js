const utils = require('../tools/utils')

module.exports = async (ctx, next) => {
    // 查询数据库是否已存在书籍
    // 新建model（Book）
    let Book = utils.bookshelf('cauth').Model.extend({
        tableName: 'books'
    })
    let isExists = await utils.getOneFromDb(Book, { isbn: ctx.request.body.isbn })
    if (isExists) {
        ctx.state.code = -1
        ctx.state.data = {
            msg: '图书已存在'
        }
    } else {
        // 1、获取前端传来的skey
        const skey = ctx.request.body.skey
        // 2、新建model（User）
        let User = utils.bookshelf('cauth').Model.extend({
            tableName: 'csessioninfo'
        })
        // 3、查询数据库（依据skey）（获取用户openId）
        let rs = await utils.getOneFromDb(User, { skey })
        const openId = rs.attributes.open_id
        // 4、获取图书信息
        let rs1 = await utils.getBookInfo(ctx.request.body.isbn)
        // 5、过滤信息
        let tags = rs1.data.tags.map((item) => {
            return `${item.title} ${item.count}`
        })
        tags = tags.join(',')
        let author = rs1.data.author.join(',')
        const book = {
            isbn: ctx.request.body.isbn,
            openid: openId,
            title: rs1.data.title,
            image: rs1.data.image,
            alt: rs1.data.alt,
            publisher: rs1.data.publisher,
            summary: rs1.data.summary,
            price: rs1.data.price,
            rate: rs1.data.rating.average,
            tags: tags,
            author: author
        }
        // 将书籍信息存入数据库
        // 入库
        let rs2 = await utils.addToDb(Book, book);
        ctx.state.data = {
            msg: `${book.title}添加成功`
        }
    }
    next()
}