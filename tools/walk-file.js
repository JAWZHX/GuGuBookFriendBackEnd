const fs = require('fs')

/**
 * 遍历目录操作
 * @param {String} path 要遍历的目录路径
 * @param {String} mime 要遍历的文件类型
 * @return {Object} 文件映射对象
 */

 const walkFile = (path, mime) => {
     let files = fs.readdirSync(path)
     let fileList = {}

     for(let [i, item] of files.entries()) {
         let itemArr = item.split('\.')

         let itemMime = (itemArr.length > 1) ? itemArr[itemArr.length - 1] : undefined
         if(mime === itemMime) {
             fileList[item] = path + item
         }
     }

     return fileList
 }

 module.exports = walkFile