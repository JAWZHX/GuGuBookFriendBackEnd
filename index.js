const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('gugubookfriendbackend');
const response = require('./middlewares/response')
const bodyparser = require('koa-bodyparser')
const config = require('./config');

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 应用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyparser())

app.listen(config.port, config.serverHost, () => {
    debug(`服务器运行在http://localhost:${config.port}`);
});