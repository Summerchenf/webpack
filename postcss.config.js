module.exports = {
  plugins: [
    require("autoprefixer")({ //根据浏览器自动添加样式前缀
      overrideBrowserslist: ["last 2 versions", ">1%"],
    }),
  ],
};
