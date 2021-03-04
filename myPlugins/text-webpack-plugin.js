class TextWebpackPlugin {
  constructor(options) {
    console.log(options);
  }
  //
  apply(complier) {
    //
    complier.hooks.emit.tapAsync("TextWebpackPlugin", (compilation, cb) => {
      // console.log(compilation.assets);

      let length = Object.keys(compilation.assets).length;

      let content = `一共有${length}个文件，文件名称：`;

      for (let filename in compilation.assets) {
        console.log(filename);
        content += `-----${filename}`;
      }
      // console.log(length);
      compilation.assets["laohan.txt"] = {
        source: function () {
          return content;
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
    // complier.hooks.compile.tap("TextWebpackPlugin", (compilation) => {
    //   console.log(compilation.assets);
    // });
  }
}
module.exports = TextWebpackPlugin;
