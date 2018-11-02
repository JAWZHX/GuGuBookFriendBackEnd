module.exports = async (ctx, next) => {
    ctx.state.data = {
        msg: 'post hello 小程序后台'
    }
    next()
}