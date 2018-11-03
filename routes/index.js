/**
 * 路由集合
 */

const router = require('koa-router')()

// 获取controllers
const controllers = require('../controllers')

// 测试前后端对接
router.get('/demo', controllers.demo)
// 测试post
router.post('/demo', controllers.demopost)

// 获取open_id和session_key（登录以及保存和更新用户信息的功能）
router.get('/getOpenIDAndSK', controllers.getOpenIDAndSK)

// 存储图书信息
router.post('/saveBook', controllers.saveBook)

// 获取图书列表信息
router.get('/booklist', controllers.booklist)

// 获取图书详情信息
router.get('/bookDetail', controllers.bookDetail)

// 获取轮播图数据
router.get('/top', controllers.top)

module.exports = router