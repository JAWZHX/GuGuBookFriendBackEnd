const walkFile = require('./walk-file')
const fs = require('fs')

/**
 * 获取sql目录下的文件数据
 * @return {Object} 文件夹信息映射对象
 */
const getSqlMap = () => {
    let basePath = __dirname
    basePath = basePath.replace(/\\/g, '\/')

    let pathArr = basePath.split('\/')
    pathArr = pathArr.splice(0, pathArr.length - 1)
    basePath = pathArr.join('/') + '/sql/'

    let fileList = walkFile(basePath, 'sql')
    return fileList
}

module.exports = getSqlMap