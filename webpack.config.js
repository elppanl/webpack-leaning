const path = require('path');
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");

var website ={
    publicPath:"http://localhost:1717/"
}

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
        filename:'[name].js',
        publicPath:website.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules: [
            {
              test: /\.css$/,
              use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            },{
                test:/\.(png|jpg|gif|JPEG)/ ,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,  //如果这里数字很大，图片会已64位码的形式写到CSS文件里
                        outputPath:'images/'  //使打包后的图片保存在dist/images中
                    }
                }]
             },{
                 test: /\.(htm|html)$/i,
                  use:[ 'html-withimg-loader'] 
             }
          ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
           
        }),
        new extractTextPlugin("css/index.css")
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
}