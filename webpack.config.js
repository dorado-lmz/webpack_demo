const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCssPlugin = require('purifycss-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const entry = require('./config/entry.config.js');

const website= {};
if(process.env.type == 'build'){
    website.publicPath = "http://hawkzz.com:1608/";
}else{
    website.publicPath = 'http://localhost:1608/';
}

module.exports = {
    // devtool:'source-map',
    //入口文件的配置项
    entry: entry.path,
    //出口文件的配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename:'bundle.js'
        filename: 'js/[name].js',
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
            }, {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
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
        new ExtractTextPlugin('css/index.css'),
        //消除多余的css
        new PurifyCssPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        //引入外部js库，如：JQuery
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new webpack.BannerPlugin('ZhouZhuang版权所有'),
        new webpack.optimize.CommonsChunkPlugin({
            name:['jquery'],
            filename:'assets/js/[name].js',
            minChunks:2
        }),
        new CopyPlugin([{
            from:__dirname+'/src/public',
            to:'./public'
        }])
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
    },
    watchOptions:{
        //检测修改的时间，单位毫秒
        poll:1000,
        //防止重复保存的时间，单位毫秒
        aggregateTimeout:500,
        ignored:/node_modules/
    }
}