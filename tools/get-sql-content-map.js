const fs = require('fs')
const getSqlMap = require('./get-sql-map')

/**
 * 获取所有sql脚本内容
 */

let sqlContentMap = {}

/**
 * 读取SQL文件的内容
 * @param {String} fileName 文件名 
 * @param {String} path 文件的路径 
 */
const getSqlContent = (fileName, path) => {
    let content = fs.readFileSync(path, 'binary')
    sqlContentMap[fileName] = content
}

/**
 * 封装所有SQL文件脚本内容
 * @return {Object} sql文件信息映射对象
 */
const getSqlContentMap = () => {
    let sqlMap = getSqlMap()
    for(let key in sqlMap) {
        getSqlContent(key, sqlMap[key])
    }
    return sqlContentMap
}

module.exports = getSqlContentMap