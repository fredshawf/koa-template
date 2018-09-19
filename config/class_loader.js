const Path = require('path');
const FS = require('fs');

module.exports = class ClassLoader {
  
  constructor(root_paths){
    this.root_paths = root_paths;
  }
  
  
  load(class_name, super_scope = null){
    let filename = this._underscore_case(class_name);
    
    let [full_file_path, file_stat] = this._detect_file(filename, super_scope);
    
    if (!full_file_path) return undefined;
    
    return file_stat.isDirectory() ? 
      this._load_directory(class_name, full_file_path, super_scope) : 
      this._load_file(class_name, full_file_path, super_scope);
  }
  
  
  _detect_file(filename, super_scope = null) {
    if (super_scope) {
      let full_path = Path.join(super_scope.path, filename);    
      return this._parse_file(full_path);
    } 
    
    for (let root of this.root_paths){
      let full_path = Path.join(Path.resolve(root), filename);
      let result = this._parse_file(full_path);
      if (result[0]) return result;
    }
    return []
  }
  
  
  _parse_file(full_path) {
    try {
      let stat = FS.lstatSync(full_path + '.js');
      return [full_path, stat];
    } catch (e) {
      try {
        let stat = FS.lstatSync(full_path);
        return [full_path, stat];
      } catch (e) {
        return [];
      }
    }
  }
  
  
  _underscore_case(class_name) {
    let file_name = class_name.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
    file_name = file_name.replace(/^_/, '');
    return file_name;
  }
  
  
  _load_directory(class_name, full_path, super_scope=null){
    // 根据class_name创建一个命名空间类
    let klass = new Function();
    klass.path = full_path;
    klass.loader = this;
    Reflect.defineProperty(klass, 'name', {value: class_name});
    
    // 设置命名空间类的自动加载
    klass = new Proxy(klass, {
      get: (tar, attr) => {
        let sub_klass = tar[attr];
        
        if (sub_klass || typeof(attr) !== 'string') return sub_klass;
        return tar.loader.load(attr, tar);
      }
    });
    
    if (super_scope) {
      super_scope[class_name] = klass;
    } else {
      global.classes[class_name] = klass;
    }
    
    return klass;
  }
  
  
  _load_file(class_name, full_path, super_scope=null){
    let klass = require(full_path);
    if (super_scope) {
      super_scope[class_name] = klass;
    } else {
      global.classes[class_name] = Klass;
    }
    return klass;
  }
  
}