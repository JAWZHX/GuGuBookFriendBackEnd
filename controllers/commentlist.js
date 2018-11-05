const utils = require('../tools/utils')

module.exports = async (ctx,next) => {
    const {bookid, skey} = ctx.query
    // 新建model
    let Comment = utils.bookshelf('cauth').Model.extend({
        tableName: 'comments'
    })
    const mysqlSelect = new Comment()
                            .query()
                            .select('comments.*', 'csessioninfo.user_info')
                            .join('csessioninfo', 'comments.openid', 'csessioninfo.openid')
    let comments = null
    if(bookid) {
        // 获取图书详情页的评论列表
        comments = await mysqlSelect.where('bookid', bookid)
    } else if(skey) {
        // 新建model
        let User = utils.bookshelf('cauth').Model.extend({
            tableName: 'csessioninfo'
        })
        // 查询数据库（依据skey）（获取用户openId）
        let rs = await utils.getOneFromDb(User, { skey })
        // 获取评论tab页的评论列表
        comments = await mysqlSelect.where('comments.openid', rs.attributes.openid)
    }                       
    ctx.state.data = {
        list: comments.map(v => {
            const info = JSON.parse(v.user_info)

            return Object.assign({}, v, {
                title: info.nickName,
                image: info.avatarUrl
            })
        })
    }
    next()
}