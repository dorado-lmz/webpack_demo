const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const website = {
    publicPath: 'http://localhost:1608/'
}

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
        filename: '[name].js',
        // publicPath
        publicPath: website.publicPath
    },
    //模块，主要是解读css和图片转换压缩等功能
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ["style-loader", "css-loader"]
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'less-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(png|jpg|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000, //图片大小，单位B
                            outputPath: 'images/' //图片输出路径
                        }
                    }
                ]
            }, {
                test: /\.(htm|html)/,
                use: ["html-withimg-loader"]
            }
        ]
    },
    //配置插件，用于生产模块和各项功能
    plugins: [
        //压缩js插件 new UglifyJsPlugin(), 打包html文件
        new HtmlPlugin({
            minify: { //压缩html
                //去掉属性的引号
                removeAttributeQuotes: true
            },
            hash: true, //添加hash，避免缓存js
            template: './src/index.html' //配置模板路径
        }),
        //css分离
        new ExtractTextPlugin('css/index.css')
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