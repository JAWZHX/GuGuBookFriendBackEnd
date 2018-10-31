const utils = require('../tools/utils')
const WXBizDataCrypt = require('../tools/WXBizDataCrypt')

// 读取配置文件信息
require('env2')('./.env')
const {env} = process

// 创建用户
module.exports = async(ctx, next) => {
    // 获取open_id 和 session_key
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${env.AppID}&secret=${env.AppSecret}&js_code=${ctx.query.code}&grant_type=authorization_code`
    let res = await utils.GET(url)
    const skey = utils.sha1(res.data.session_key)
    // 数据解密
    let pc = new WXBizDataCrypt(env.AppID, res.data.session_key)
    let data = pc.decryptData(ctx.query.encryptedData, ctx.query.iv)

    // 表名：csessioninfo
    // open_id =======> data.openId
    // skey =======> skey
    // create_time =====> Date.now()
    // last_visit_time =====> Date.now()
    // session_key ========> res.data.session_key
    // user_info =========> ctx.query.rawData

    // 将数据存储到数据库
    // 1、创建model
    let Pet = utils.bookshelf('cauth').Model.extend({
        tableName: 'csessioninfo'
    })
    let rs = null
    // 条件判断(依据标志决定要保存还是更新信息)
    if (ctx.query.loginState === 'save') {
        // 2、添加数据
        let rowData = {
            'open_id': data.openId,
            'skey': skey,
            'session_key': res.data.session_key,
            'user_info': ctx.query.rawData
        }
        rs = await utils.addToDb(Pet, rowData)
    } else {
        let updateData = {
            'skey': skey,
            'session_key': res.data.session_key,
            'user_info': ctx.query.rawData
        }
        let condition = {
            'open_id': data.openId
        }
        rs = await utils.updateDb(Pet, updateData, condition)
    }
    
    // 3、返回用户信息
    ctx.state.data = {
        userInfo: rs.attributes.user_info,
        skey: rs.attributes.skey
    }
    next()
}