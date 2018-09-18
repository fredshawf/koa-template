module.exports = class ClassLoader {
  
  constructor(root_paths){
    this.root_paths = root_paths;
  }
  
  
  load(class_name, super_scope = null){
    let filename = this._underscore_case(class_name);
    
    let full_file_path = _detect_file_path(filename, super_scope);
    
    if (!full_file_path) return undefined;
    
    return _is_directory(full_file_path) ? 
      load_directory(class_name, full_file_path, super_scope) : 
      load_file(class_name, full_file_path, super_scope);
  }
  
  
  _detect_file_path(filename, super_scope = null) {
    if (super_scope) {
      let full_path = Path.join(super_scope.path, filename);
      return _is_file_existent(full_path)) ? full_path : undefined;
    } 
    
    for (let root in this.root_paths){
      let absolute_root = Path.resolve(root);
      let full_path = Path.join(absolute_root, filename);
      if (_is_file_existent(full_path))) return full_path;
    }
    
    return undefined;
  }
  
  
  _is_file_existent(path) {
    try {
      FS.accessSync(path); 
      return true;
    } catch (e) {
      return false;
    }
  }
  
  _is_directory(path){
    let stat = lstatSync(path);
    return stat.isDirectory();
  }
  
  
  
  // TODO: 将clas_name(Article)类名转化为下划线文件名
  _underscore_case(class_name) {
    
    
  }
  
  
  
  load_directory(class_name, full_path, super_scope=null){
    // 根据class_name创建一个命名空间类
    let klass = new Function();
    klass.path = full_path;
    klass.loader = this;
    Reflect.defineProperty(klass, 'name', {value: class_name});
    
    // 设置命名空间类的自动加载
    klass = new Proxy(klass, {
      get: (tar, attr) => {  
        return tar.loader.load(attr, tar) || Reflect.get(tar, attr);
      }
    });
    
    if (super_scope) {
      super_scope[class_name] = klass;
    } else {
      global.classes[class_name] = klass;
    }
    
  }
  
  
  load_file(class_name, full_path, super_scope=null){
    let klass = require(full_path);
    if (super_scope) {
      super_scope[class_name] = klass;
    } else {
      global.classes[class_name] = Klass;
    } 
  }
  
}