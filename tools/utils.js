const axios = require('axios')
const crypto = require('crypto')

// 封装get请求
const GET = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// sha1加密
const sha1 = (data) => {
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}

module.exports = {
    GET,
    sha1
}