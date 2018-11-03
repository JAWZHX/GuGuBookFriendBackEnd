const utils = require('../tools/utils')

module.exports = async (ctx, next) => {
    // 新建model（Book）
    let Book = utils.bookshelf('cauth').Model.extend({
        tableName: 'books'
    })

    new Book()
        .query()
        .where({id: ctx.query.id})
        .increment('count', 1)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log('错误')
            console.log(err)
        })

    ctx.state.data = {
        msg: '图书详情接口'
    }
    next()
}