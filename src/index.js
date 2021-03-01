var less = require('./css/index.less')


import pic from "./image/summer.jpg";

var img = new Image();
img.src = pic;
var root = document.getElementById("img");
root.append(img);
console.info(123456, 'aa')