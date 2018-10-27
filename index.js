const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('gugubookfriendbackend');
const config = require('./config');

app.use(async (ctx, next) => {
    ctx.body = 'Hello world';
});

app.listen(config.port, config.serverHost, () => {
    debug(`listen on port ${config.port}`);
});