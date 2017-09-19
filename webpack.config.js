const path = require('path');

module.exports={
    //入口文件的配置项
    entry:{
        entry:'./src/entery.js',
        entry2:'./src/entery2.js'
    },
    //出口文件的配置项
    output:{
        path:path.resolve(__dirname,'dist'),
        // filename:'bundle.js'
        filename:'[name].js'
    },
    //模块，主要是解读css和图片转换压缩等功能
    module:{},
    //配置插件，用于生产模块和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}