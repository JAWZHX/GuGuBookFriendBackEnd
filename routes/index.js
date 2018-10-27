/**
 * 路由集合
 */

const router = require('koa-router')()

// 获取controllers
const controllers = require('../controllers')

// 测试前后端对接
router.get('/demo', controllers.demo)

module.exports = router