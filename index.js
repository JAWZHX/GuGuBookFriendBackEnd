const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('gugubookfriendbackend');
const response = require('./middlewares/response')
const bodyparser = require('koa-bodyparser')

// 读取配置文件信息
require('env2')('./.env')
const {env} = process

// 解析请求体
app.use(bodyparser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 应用响应处理中间件
app.use(response)

app.listen(env.port, env.serverHost, () => {
    debug(`服务器运行在http://${env.serverHost}:${env.port}`);
    console.log(`服务器运行在http://${env.serverHost}:${env.port}`)
});