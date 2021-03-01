
//loader -> 拿到一个模块的内容 ->对内容进行处理-> 传递给下一个loader
//loader 普通的函数 但是不可以是箭头函数 
//loader 一定要有返回值
//loader中有异步代码如何处理
//多个自定义loader 如何处理 注意顺序

//如何配置loader 如何接受配置参数

module.exports = function (content,map,meta) {
  // content: JS文件内容
  // 一定要有return或者callback
  return content.replace('aa','hello')

  // 异步loader
  // var callback = this.async()
  // setTimeout(() => {
  //   const result = content.replace("aa", "异步打包");
  //   callback(null, result);
  // }, 3000);

}
