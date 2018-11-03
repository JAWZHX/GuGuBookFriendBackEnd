module.exports = async (ctx, next) => {
    console.log(ctx.query)
    ctx.state.data = {
        msg: '图书详情接口'
    }
    next()
}