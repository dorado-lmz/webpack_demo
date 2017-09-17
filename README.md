# webpack3.0学习demo #

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


