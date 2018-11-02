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

// 查询给定条件的数据
const getOneFromDb = (Model, condition) => {
    return new Promise((resolve, reject) => {
        new Model()
            .where(condition)
            .fetch()
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            }) 
    })
}

// 使用豆瓣API获取图书信息（依据isbn）
const getBookInfo = (isbn) => {
    return new Promise((resolve, reject) => {
        const url = `https://api.douban.com/v2/book/isbn/${isbn}`
        console.log(url)
        async function startGet() {
            let rs = await GET(url)
            resolve(rs)
        }
        startGet()
    })
}

module.exports = {
    GET,
    sha1,
    bookshelf,
    addToDb,
    updateDb,
    getOneFromDb,
    getBookInfo
}