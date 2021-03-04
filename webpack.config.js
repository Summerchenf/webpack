var htmlWebpackPlugin = require('html-webpack-plugin') //htmlwebpackplugin会在打包结束后，⾃动⽣成⼀个html⽂件，并把打包⽣成的js模块引⼊到该html
var webpack = require('webpack')
const textWebpackPlugin = require("./myPlugins/text-webpack-plugin.js");

module.exports= {
  entry: {
    // main: './src/main.js',
    index: './src/index.js' //多入口配置
  },
  output: {
    filename: '[name].js', //name占位符 main,index
    path: __dirname + '/dist' //打包到dist文件夹 path.resolve(__dirname, "./dist")
  },
  mode: 'development',
  devtool: 'source-map', //前端错误监控，快速的定位问题
  resolveLoader: { //用于解析 webpack 的 loader 包
    modules: ["./node_modules", "./myLoaders"], //在module或者myloader文件下找对应loader
  },
  module: {
    // loader有顺序，从右到左，从下到上
    rules: [
      // test 匹配规则 use 依赖
      { test: /\.css$/, use: ['style-loader','css-loader'] },
      { test: /\.less$/, use: ['style-loader','css-loader','postcss-loader','less-loader'] },
      { 
        test: /.(png|jpe?g|gif)$/, 
        use: {
          loader: 'url-loader',
          options: {
            name: './images/[name].[ext]', //输出img的名字
            limit: 3 * 1024 //对小体积的资源图片进行管理，小图片转成base64,减少请求数量 3kb  ，默认打包进对应的js中
          }
        }
      },
      {
        test: /\.(eot|woff)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
      // 自定义loader
      {
        test: /\.js$/,
        use: ['summerLoader']
      }
    ]
  },
  devServer: { //development环境
    open: true,
    port: 8088,
    proxy: { //代理服务
      '/partyline-backend': {
        target: 'http://10.12.22.101',
        ws: true,
        // hot: true,
        hotOnly: true,
        changeOrigin: true,
        pathRewrite: {
          '^/partyline-backend': '/partyline-backend'
        }
      }
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'summer app', //网页title
      filename: 'index.html', //m默认index.html
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new textWebpackPlugin({
      name: "老韩",
    }),
  ],
}