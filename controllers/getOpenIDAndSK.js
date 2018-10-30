const utils = require('../tools/utils')
const WXBizDataCrypt = require('../tools/WXBizDataCrypt')

// 读取配置文件信息
require('env2')('./.env')
const {env} = process

// 获取open_id 和 session_key
module.exports = async(ctx, next) => {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${env.AppID}&secret=${env.AppSecret}&js_code=${ctx.query.code}&grant_type=authorization_code`
    let res = await utils.GET(url)
    const skey = utils.sha1(res.data.session_key)
    let pc = new WXBizDataCrypt(env.AppID, res.data.session_key)
    let data = pc.decryptData(ctx.query.encryptedData, ctx.query.iv)
    // open_id =======> data.openId
    // skey =======> skey
    // create_time =====> Date.now()
    // last_visit_time =====> Date.now()
    // session_key ========> res.data.session_key
    // user_info =========> ctx.query.rawData
    // 将数据存储到数据库
    ctx.state.data = {
        Msg: '登录'
    }
    next()
}