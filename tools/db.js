const mysql = require('mysql')

/**
 * 数据库操作文件
 */

// 读取数据库配置信息
require('env2')('../.env')
const {env} = process

// 创建数据库连接池
const pool = mysql.createPool({
    host: env.mysqlHost,
    user: env.user,
    password: env.password,
    database: env.database
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = {
    query
}