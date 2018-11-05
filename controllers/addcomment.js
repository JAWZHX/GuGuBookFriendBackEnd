const utils = require('../tools/utils')
module.exports = async (ctx, next) => {
    const {bookid, comment, openid, location, phone} = ctx.request.body
    // 新建model
    let Comment = utils.bookshelf('cauth').Model.extend({
        tableName: 'comments'
    })
    try {
        await new Comment()
                    .query()
                    .insert({bookid, comment, openid, location, phone})
        ctx.state.data = {
            msg: '添加评论成功'
        }
    } catch(e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论失败：' + e.sqlMessage
            }
        }
    }
    next();
}