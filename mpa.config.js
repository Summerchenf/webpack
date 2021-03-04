const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const glob = require("glob");

const setMPA = () => {
  const entry = {};
  const htmlwebpackplugins = [];

  var jsDir = path.resolve(__dirname, 'src') //拓展出src下的所有文件
  var entryFiles = glob.sync(jsDir + '/*.{js,jsx}') //获取src文件下的。js文件

  entryFiles.map((item, index) => {
    var file= item.split('src/')[1];
    var pageName = file.split('.js')[0]
    console.log(pageName);

    entry[pageName] = item;

    htmlwebpackplugins.push(
      new htmlwebpackplugin({
        template: path.join(__dirname, `./src/${pageName}.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
      })
    );
  });

  //   console.log(entryFiles);
  return {
    entry,
    htmlwebpackplugins,
  };
};

const { entry, htmlwebpackplugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  mode: "development",
  plugins: [...htmlwebpackplugins],
};
