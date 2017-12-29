# webpack3.0学习 #

## 博客地址 ##

<http://blog.hawkzz.com>

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

## CSS中图片处理 ##

在src目录下新建一个images目录，把图片放入images文件夹中；在index.html文件中增加一个div标签：

/src/index.html:

    <div id="image"></div>

编写css,给刚刚增加的div标签添加背景图片：

/src/css/index.css:

    #image{
        background: url('../images/webpack.jpg');
        width: 497px;
        height: 270px;
    }

安装loader:

    npm install --save-dev file-loader url-loader


在webpack.config.js中配置loader：

    module:{
        rules:[
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500000，
                        outputPath:'images/'
                    }
                }]
            }
        ]
    }

## url-loader与file-loader ##

file-loader：解决引用路径的问题；

url-loader：如果图片较多，会发很多http请求，降低页面性能，url-loader将引入的图片编码，生成dataURL；url-loader会提供一个limit参数（单位B），小于limit字节的图片会被转为dataURL，大于limit的会使用file-loader进行copy；outputPath是图片分离后的路径；

简单说两者关系，url-loader封装了file-loader，url-loader不依赖file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader；

## CSS中图片路径处理 ##

利用extract-text-webpack-plugin插件将CSS文件分离出来，但是CSS里的图片路径并不正确，这里使用publicPath解决；

publicPath是在webpack.config.js文件的output选项中，主要作用是处理静态文件路径的；

声明一个website对象：

    const website = {
        publicPath:'http://localhost:1608/'
    }

这里的IP和端口，必须和devServer配置的IP和端口一致。

配置output选择：

    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: website.publicPath
    }

## HTML中图片处理 ##

在webpack中是不喜欢你使用标签\<img\>来引入图片的，但是作前端特别热衷于这种写法，国人也为此开发了一个：html-withimg-loader。他可以很好的处理我们在html 中引入图片的问题。

安装loader：

    npm install --save-dev html-withimg-loader

在webpack.config.js中配置loader:

    module:{
        rules:[
            {
                test:/\.(htm|html)$/,
                use:["html-withimg-loader"]
            }
        ]
    }

## Babel是什么 ##

Babel是一个编译JavaScript的平台，它的强大之处表现在可以通过编译帮你达到：

+ 使用下一代的javascript（ES6，ES7,……）代码，即使当前浏览器没有完成支持；
+ 使用基于JavvScript进行扩展语言，比如React的JSX；

## webpack配置Babel ##

安装依赖包：

    npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-env

+ babel-core：babel的核心包；
+ babel-loader：babel的loader包；
+ babel-preset-es2015：解析es6的包；
+ babel-preset-env：解析es6的包；（官方最新推荐）
+ babel-preset-react：解析React的JSX的包；

在webpack.config.js中配置babel:

    module:{
        rules:[
            {
                test:'/\.(js|jsx)$/',
                use:{
                    loader:'babel-loader'
                },
                exclude:/node_module/
            }
        ]
    }

在根目录下建立.babelrc文件，虽然Babel可以直接在webpack.config.js中进行配置，但是考虑到babel具有非常多的配置选项，如果卸载webapck.config.js中会非常的雍长不可阅读，所以我们经常把配置卸载.babelrc文件里。

.babelrc

    {
        "presets":["env","react"]
    }

## 打包第三方类库 ##

在工作中引入第三方的类库是在所难免的，比如引入JQuery；那么如何引入呢？下面我们来说说：

首先我们安装第三方类库，这里用jquery为例子：

    npm install jquery --save

要注意的是这里我们使用“--save”来安装模块，因为引入的第三方类库肯定是需要在生产环境要用；

第二步，就是要引入第三方类库了，这里有两种方法来引入：

第一种，在/src/entery.js（即入口文件）中，直接引入jquery:

/src/entery.js

    import $ from 'jquery';

一行简单的import命令就ok了；

第二种，就是在webpack配置文件中，全局引入jquery：

/webpack.config.js

    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ]

通过webpack自带的插件ProvidePlugin；

两种方法的区别：

+ import引入方法：引用后不管你在代码中使用不适用该类库，都会把该类库打包起来，这样有时就会让代码产生冗余。
+ ProvidePlugin引入方法：引用后只有在类库使用时，才按需进行打包，所以建议在工作使用插件的方式进行引入。

## 抽离第三方类库 ##

上面说到如何引入和打包第三方类库，通过上面的方法有一个问题，那就是将第三方类库全部打包到/src/entery.js中，增加了文件的大小，和复杂度；因此，我们需要抽离第三方类库：

首先，修改入口文件：

/webpack.config.js

    entry:{
        entry:'./src/entery.js',
        jquery:'jquery'
    }

接着，使用optimize优化插件

    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:['jqury'],
            filename:'assets/js/[name].js',
            minChunks:2
        })
    ]

+ name ：对应入口文件的名字；
+ filename ： 文件抽离后的路径；
+ minChunks ： 固定配置，必写；

## 静态资源打包 ##

在工作中可能会有一些在项目中没有引用的图片资源或者是其他静态资源，但是又必须留着，这时我们就需要处理这些静态资源；

下载安装插件copy-webpack-plugin

    npm install --save-dev copy-webpack-plugin

配置webpack.config.js文件：

    const CopyPlugin = require('copy-webpack-plugin');
        ...
    plugins:[
        new CopyPlugin([{
            from:__dirname + '/src/public',
            to:'./public'
        }])
    ]

+ from：要打包的静态资源源目录地址
+ to：要打包到的文件夹路径

## watch的配置 ##

/webpack.config.js

    watchOptions:{
        poll:1000,
        aggregateTimeout:500,
        ignored:/node_module/
    }

+ poll：检测修改的时间，单位毫秒
+ aggregateTimeout：防止重复保存的时间，单位毫秒
+ ignored：忽略的目录

## 如何打包多页面 ##

在学了webpack之后，我的感受是我会配置webpack了，也能运行了，但是学习的过程中都是单页面的，那么多页是如何打包的呢？其实多页面的打包和单页面的打包的原理是一样的，只是多配置几个对应的入口，和出口，以及HtmlWebpackPlugin对象；当然你完全可以像下面这样：

    const config = {
        entry:{
            index:'./src/index.js'，
            info:'./src/index.js'
        },
        output:{
            path: path.join(__dirname, 'dist'),
            filename: 'js/[name].js'
        }
        ...
        plugins:[
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                chunks:['index'],
                hash: true,
                minify: {
                    removeAttributeQuotes:true,
                    removeComments: true,
                    collapseWhitespace: true,
                    removeScriptTypeAttributes:true,
                    removeStyleLinkTypeAttributes:true
                }
            }),
            new HtmlWebpackPlugin({
                filename: 'info.html',
                template: './src/info.html',
                hash: true,
                chunks:['info'],
                minify: {
                    removeAttributeQuotes:true,
                    removeComments: true,
                    collapseWhitespace: true,
                    removeScriptTypeAttributes:true,
                    removeStyleLinkTypeAttributes:true
                }
            })
        ]
    }

细心的你肯定发现我改变了几个地方，一是,把output.filename的‘js/index.js’变成了‘js/[name].js’,这是因为我们是多页面，每个页面对应相应的js这样方便管理，二是，在HtmlWebpackPlugin对象中添加了chunks这个属性，chunk属性是让你选择对应的js模块；

上面这种写法当然是没有问题，这是只有两个页面无所谓，那么有十个甚至更多呢，我们一直做着重复的事，这不是我们程序员的风格，我们就是为了能够偷懒才做程序员的不是吗?(当然还有高工资(#^.^#))，接下来我们来抽离这些重复的事；

首先，我们通过Node的glob对象，来获取我们存在的html或js；

    /**
    *
    * @param {string}  globPath  文件的路径
    * @returns entries
    */
    function getView(globPath,flag){
        let files = glob.sync(globPath);

        let entries = {},
        entry, dirname, basename, pathname, extname;

        files.forEach(item => {
            entry = item;
            dirname = path.dirname(entry);//当前目录
            extname = path.extname(entry);//后缀
            basename = path.basename(entry, extname);//文件名
            pathname = path.join(dirname, basename);//文件路径
            if (extname === '.html') {
                entries[pathname] = './' + entry;
            } else if (extname === '.js') {
                entries[basename] = entry;
            }
        });

        return entries;
    }

既然，我们已经有了getView()函数，可以获取html和js文件，那么我们就可以确定有多少个入口，和多少个页面;

    let entriesObj = getView('./src/js/*.js');

    let config = {
        entry:entriesObj,
        ...
    }

上面我们就配置好了入口，不需要我们手动添加了，有多少js就有多少入口；

    let pages = Object.keys(getView('./src/*html'));

    pages.forEach(pathname => {
        let htmlname = pathname.split('src\\')[1];
        let conf = {
            filename: `${htmlname}.html`,
            template: `${pathname}.html`,
            hash: true,
            chunks:[htmlname],
            minify: {
                removeAttributeQuotes:true,
                removeComments: true,
                collapseWhitespace: true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true
            }
        }

        config.plugins.push(new HtmlWebpackPlugin(conf));
    });

最后，我们获取HTML页面，和添加对应页面的HTMLWebpackPlugin对象；
