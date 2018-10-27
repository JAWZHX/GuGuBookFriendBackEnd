const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('gugubookfriendbackend');
const response = require('./middlewares/response')
const config = require('./config');

// 应用响应处理中间件
app.use(response)

app.use(async (ctx, next) => {
    ctx.body = 'Hello world';
});

app.listen(config.port, config.serverHost, () => {
    debug(`服务器运行在http://localhost:${config.port}`);
});