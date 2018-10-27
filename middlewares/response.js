const debug = require('debug')('gugubookfriendbackend')

/**
 * 响应处理模块
 */

 module.exports = async function (ctx, next) {
     try {
        // 调用下一个中间件
        next()

        // 处理响应结果
        ctx.body = ctx.body ? ctx.body : {
            code: ctx.state.code !== undefined ? ctx.state.code : 0,
            data: ctx.state.data !== undefined ? ctx.state.data : {}
        }
     }catch(e) {
        // 捕捉错误并打印
        debug('响应处理模块错误：%o', e)

        // 设置状态码：200， 但是属于服务端错误
        ctx.status = 200

        // 输出详细的错误信息
        ctx.body = {
            code: -1,
            error: e && e.message ? e.message : e.toString()
        }
     }
 }