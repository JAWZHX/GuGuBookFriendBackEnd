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

    let info = await new Book()
        .where({id: ctx.query.id})
        .fetch({withRelated: ['user']})

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
        info: info
    }
    next()
}