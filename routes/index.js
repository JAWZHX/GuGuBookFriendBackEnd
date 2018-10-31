/**
 * 路由集合
 */

const router = require('koa-router')()

// 获取controllers
const controllers = require('../controllers')

// 测试前后端对接
router.get('/demo', controllers.demo)

// 获取open_id和session_key（登录以及保存和更新用户信息的功能）
router.get('/getOpenIDAndSK', controllers.getOpenIDAndSK)


module.exports = router