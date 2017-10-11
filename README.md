# webpack3.0学习 #

## webpack是什么 ##

webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，Webpack还肩负起了优化项目的责任。

<img src="/img/webpack.png">

## 安装webpack ##

### 全局安装 ###

首先，打开命令行工具，建立文件夹，进入文件夹里；

    mkdir webpack_demo
    cd webpack_demo

由于webpack是基于node.js,所以我们先必须安装node.js;安装完成后，执行下一步：

    npm install -g webpack

这样就可以全局安装webpack了；但是webpack官方是不推荐的。这会将您项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

如果安装失败，可能有三种原因：

+ node版本过低，你可以通过node -v查看版本信息；
+ 网络比较慢，由于npm安装比较慢，你可以通过cnpm或者科学上网，进行安装；
+ 如果你使用的是Linux或者Mac，可能是权限问题，请使用sudo；

### 具体项目安装 ###

首先，初始化文件夹，主要目的是生成package.json文件，里面包含了项目的依赖、自定义脚本任务等等；

    npm init
    或者
    npm init -y

说说着两种的区别，npm init执行后，会让你填写项目信息，而npm  init  -y执行，是默认给你选择了项目信息，当然你想改的时候，进入package.json可以向直接修改；

然后，安装webpack：

    npm init --save-dev webpack

这里的参数–-save是要保存到package.json中，-dev是在开发时使用这个包，而生产环境中不使用。

具体请参考：<http://blog.hawkzz.com/2017/03/30/%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96/>

## 查看webpack版本 ##

    webpack -v

现在(2017/09/17)最新的版本是webpack@3.6.0

## 建立基本项目结构 ##

在根目录建立两个文件夹，分别是src和dist:

+ src文件夹：源代码，用于开发环境；
+ dist文件夹：打包好的文件夹，用于生产环境；

## 编写程序文件 ##

在dist文件夹创建一个index.html文件，并编写下面代码.

/dist/index.html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>webpack</title>
    </head>
    <body>
        <div id="title"></div>
        <script src="./bundle.js"></script>
    </body>
    </html>

在src文件夹创建entery.js文件，用于编写javascript代码，也是入口文件；

/src/entery.js

    window.onload = function(){
        document.getElementById('title').innerHTML = "Hello Webpack!";
    }

## webpack命令行打包 ##

webpack命令行使用基本方法：

    webpack {entry file} {destination for bundled file}

+ {entry file}:入口文件的路径，即将要打包的文件
+ {destination for bundled file}:打包后存放的路径

    webpack src/entery.js dist/bundle.js

执行上面的命令，这样就会在dist文件夹里自动生成一个bundle.js 文件，这样就打包完毕；

<img src="/img/1.png">

## 创建配置文件webpack.config.js ##

在根目录在手动创建webpack.config.js，配置基本模板

    module.exports ={
        entry:{},
        output:{},
        module:{},
        plugins:[],
        devServer:{}
    }

+ entry：配置入口文件的地址，可以是单一入口，也可以是多入口；
+ output：配置出口文件的地址，支持多出口配置；
+ module：配置模块，主要解析CSS和图片转换压缩等功能；
+ plugins：配置插件；
+ devServer：配置开发服务功能；

## entry选项配置 ##

这个选项配置我们要压缩的文件一般是javascript。

    entry：{
        entry:'./src/entery.js'
    }

## output选择配置 ##

出口配置用来告诉webpack最后打包文件的地址和文件名称；

    output:{
        //打包后的文件路径
        path: path.resolve(__dirname,'dist'),
        //打包后的文件名称
        filename:'bundle.js'
    }

当然还要引入path模块，这个是nodejs自带的模块；在webpack.config.js文件的头部引入；

    const path = require('path');

现在的代码结构：

    const path = require('path');
    module.exports={
        //入口文件的配置项
        entry:{
            entry:'./src/entry.js'
        },
        //出口文件的配置项
        output:{
            //输出的路径，用了Node语法
            path:path.resolve(__dirname,'dist'),
            //输出的文件名称
            filename:'bundle.js'
        },
        //模块：例如解读CSS,图片如何转换，压缩
        module:{},
        //插件，用于生产模版和各项功能
        plugins:[],
        //配置webpack开发服务功能
        devServer:{}
    }

## 多入口，出口配置 ##

    const path = require('path');
    module.exports={
        //入口文件的配置项
        entry:{
            entry:'./src/entry.js',
            //这里我们又引入了一个入口文件
            entry2:'./src/entry2.js'
        },
        //出口文件的配置项
        output:{
            //输出的路径，用了Node语法
            path:path.resolve(__dirname,'dist'),
            //输出的文件名称
            filename:'[name].js'
        },
        //模块：例如解读CSS,图片如何转换，压缩
        module:{},
        //插件，用于生产模版和各项功能
        plugins:[],
        //配置webpack开发服务功能
        devServer:{}
    }

将filename的值修改为[name].js;它的意思是根据入口文件的名称，打包成相同的名称，有几个入口文件，就可以打包出几个出口文件；

## 服务和热更新配置 ##

首先，配置devServer

    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:1608
    }

+ contentBase：服务器基本运行路径
+ host：服务器运行地址
+ compress：服务器压缩式，一般为true
+ port：服务运行端口

然后，下载webpack-dev-server模块，

    npm install webpack-dev-server --save-dev

最后，配置package.json里的scripts选项

     "scripts": {
        "server": "webpack-dev-server"
    }

运行命令 npm run server ,服务器运行，在浏览器中打开http://localhost:1608，既可以看到页面；

当 npm run server 启动后，服务器有一种监控机制（watch），可以实现热更新；

## js压缩 ##

webpack自带一个插件uglifyjs-webpack-plugin来压缩js，所以不需要再次安装，当一切都准备妥当，引入uglifyjs-webpack-plugin模块：

    const uglify = require('uglifyjs-webpack-plugin');

因为它是一个插件，所以把它放在plugins里：

    plugins:[
        new uglify()
    ]

这样就完事了，执行命令webpack，压缩文件就OK了，一般不会出现问题，（但是我在实际操作中报错了，uglifyjs-webpack-plugin没有找到，所以，如果你报错了，还是安装一下吧）

    npm install uglifyjs-webpack-plugin --save-dev

## 打包HTML文件 ##

首先删除dist目录下的所有文件，然后在src文件下创建index.html文件，

/src/index.html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>webpack</title>
    </head>
    <body>
        <div id="title"></div>
    </body>
    </html>

配置webpack.config.js文件，安装html-webpack-plugin插件

    npm install html-webpack-plugin --save-dev

然后引入改插件：

    const htmlPlugin =  require('html-webpack-plugin');

在plugins下，加载htmlPlugin插件

    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        })
    ]

+ minify：是对html文件进行压缩， removeAttributeQuotes是去掉属性的双引号；
+ hash：为了开发中js有缓存效果，加入hash，可以有效避免js缓存；
+ template：需要打包的HTML模板路径和文件名称；

## Loaders ##

Loaders是Webpack最重要的功能之一，他也是Webpack如此盛行的原因。通过使用不同的Loader，Webpack可以的脚本和工具，从而对不同的文件格式进行特定处理。

Loader的配置模型：

+ test：用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
+ use：loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
+ include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
+ query：为loaders提供额外的设置选项（可选）。

## 打包CSS ##

首先，在src目录下建立css文件夹，和index.css文件，并编写如下代码：

    body{
        background: burlywood;
        color:white;
        font-size:30px;
    }

建立好后，需要引入到入口文件中，才可以打包。在entery.js的首行加入代码：

    import css from './css/index.css';

接下来我们就需要解析css文件，通过loader，下面到我们下载style-loader和css-loader：

    npm install style-loader css-loader --save-dev

配置loader：

第一种方法：

    module:{
        rule:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }

第二种方法：

    module:{
        rules:[
            {
                test：/\.css$/,
                loader:['style-loader','css-loader']
            }
        ]
    }

第三种方法:

    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    }
                ]
            }
        ]
    }

这样我们就配置好了，使用命令webpack打包，就可以看的样式生效；

## 分离CSS ##

目前，打包后的文件中，css是打包在js代码里面的，这样不便于以后的维护，所以需要吧CSS从js中分离出来，我们需要使用插件[Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)

安装：

    npm install --save-dev extract-text-webpack-plugin

在webpack.config.js中引入

    const ExtractTextPlugin = require('extract-text-webpack-plugin');

在Plugins中配置:

    new ExtractTextPlugin('css/index.css');
    //css/index.css是分离后的路径位置

修改Loader配置：

    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            }
        ]
    }

## Less打包和分离 ##

Less作为目前很火的CSS预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展；

安装：

    npm install --save-dev less less-loader

在webpack.config.js中配置Loader:

    module:{
        rules:[
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"less-loader"
                    }]
                })
            }
        ]
    }

## Sass打包和分离 ##

Sass的打包和分离和less的类似，首先下载安装Sass所支持的服务与loader

安装：

    npm install --save-dev node-sass sass-loader

在webpack.config.js中配置Loader:

    module:{
        rules:[
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"sass-loader"
                    }]
                })
            }
        ]
    }

## css自动加载前缀 ##

CSS3是目前作为一个前端必须要掌握的技能，但是由于现在好多浏览器还是不兼容CSS3，所以前端需要多写很丑很难看的前缀代码；以前都是边查Can I Use ，边添加，这样很麻烦，现在配置一个插件[postcss](https://github.com/postcss/postcss-loader)就可以搞定；

PostCSS是一个CSS的处理平台，它可以帮助你的CSS实现更多的功能，但是今天我们就通过其中的一个加前缀的功能，初步了解一下PostCSS。

安装：

    npm install --save-dev postcss-loader autoprefixer

在根目录下，建立一个postcss.config.js文件：

    module.exports = {
        plugins:[
            require('autoprefixer')
        ]
    }

这就是对postCSS一个简单的配置，引入了autoprefixer插件。让postCSS拥有添加前缀的能力，它会根据 can i use 来增加相应的css3属性前缀。

在webpack.config.js中配置Loader:

    {
        test: /\.css$/,
        use: extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', 
                    options: { importLoaders: 1 } 
                },
                'postcss-loader'
            ]
        })

    }

## 消除多余CSS ##

随着项目的进展，编写的CSS会越来越多，有时候需求更改，带来DOM结构的更改，造成CSS的冗余，所以为了减少CSS文件的体积，需要消除冗余的CSS；使用PurifyCSS可以大大减少CSS冗余；这个插件必须配合extract-text-webpack-plugin来使用；

安装：

    npm install --save-dev purifycss-webpack purify-css

引入glob：

因为需要同步检查HTML模板，所以需要引入node的glob对象使用，在webpack.config.js文件头部引入

    const glob = require('glob');

引入purifycss-webpack:

    const PurifyCssPlugin = require('purifycss-webpack');

配置plugins：

    plugins:[
        new PurifyCssPlugin({
            paths:glob.sync(path.join(__dirname,'src/*.html'))
        })
    ]

