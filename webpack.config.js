const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

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
        //压缩js插件
        new UglifyJsPlugin(),
        //打包html文件
        new HtmlPlugin({
            minify:{ //压缩html
                //去掉属性的引号
                removeAttributeQuotes:true
            },
            hash:true,//添加hash，避免缓存js
            template:'./src/index.html'//配置模板路径
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