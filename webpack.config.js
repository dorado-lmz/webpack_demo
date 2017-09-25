const path = require('path');

const uglify = require('uglifyjs-webpack-plugin');

const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/entery.js',
        entry2: './src/entery2.js'
    },
    //出口文件的配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename:'bundle.js'
        filename: '[name].js'
    },
    //模块，主要是解读css和图片转换压缩等功能
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },
    //配置插件，用于生产模块和各项功能
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        })
    ],
    //配置webpack开发服务功能
    devServer: {
        //配置服务的基本路径
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址
        host: 'localhost',
        //服务器压缩是否开启
        compress: true,
        //配置服务器的端口
        port: 1608
    }
}