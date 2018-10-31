const axios = require('axios')
const crypto = require('crypto')
const knex = require('knex')

// 读取数据库配置信息
require('env2')('../.env')
const {env} = process

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

// 连接数据库
const bookshelf = (database) => {
    let db = undefined
    let config = {
        client: 'mysql',
        connection: {
            host: env.mysqlHost,
            user: env.user,
            password: env.password,
            database: database,
            charset: 'utf8'
        }
    }
    // 保证数据库连接只初始化一次
    if(!db) {
        db = knex(config)
    }
    const bookshelf = require('bookshelf')(db)
    return bookshelf
}

// 向数据库添加数据
const addToDb = (Model, data) => {
    return new Promise((resolve, reject) => {
        new Model(data)
            .save()
            .then((saved) => {
                resolve(saved)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// 向数据库更新数据
const updateDb = (Model, data, condition) => {
    return new Promise((resolve, reject) => {
        new Model()
            .where(condition)
            .save(data, {patch: true})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    GET,
    sha1,
    bookshelf,
    addToDb,
    updateDb
}