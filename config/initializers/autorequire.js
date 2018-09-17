const Path = require('path');
const FS = require('fs');


if (!global.classes) {
  global.classes = {};
}



global.__proto__ = new Proxy(global.__proto__, {
  get: (origin_obj, attr) => {
    if (klass = global.classes.hasOwnProperty(attr) || try_load(attr)) {
      return klass;
    } else {
      console.log(11111);
      return Reflect.get(origin_obj, attr);
    }
  }
})


const try_load = (class_name) => {
  
  let class_filename = ''; // TODO: 将clas_name(Article)类名转化为下划线文件名
  
  Koa.app.config.autoload_paths.forEach((root) => {

    let absolute_directory = Path.resolve(root);
    let absolute_path = Path.join(absolute_directory, class_filename);
    try { return load(absolte_path); } catch (e) {}
  })
  
  return false;
}


const load = (file) => {
  file_stat = fs.lstatSync(absolte_path);
  if (file_stat.isDirectory()) {
    // TODO: 创建一个文件夹对应的类
  } else {
    // TODO: 记载对应类并放入, 并将类放入global.classes中
  }
}


