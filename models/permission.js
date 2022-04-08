const mongoose = require('mongoose');

class Type {
  static CREATE = new Type(0);
  static READ = new Type(1);
  static UPDATE = new Type(2);
  static DELETE = new Type(3);

  constructor(type) {
    this.type = type;
  }
}

const schema = mongoose.Schema({
  _description: String,
  _type: Type
});

class Permission {
  constructor(description, type) {
    this._description = description;
    this._type = type;
  }

  get description() {
    return this._description;
  }
  set description(description) {
    this._description = description;
  }

  get type() {
    return this._type;
  }
  set type(type) {
    this._type = type;
  }
}

schema.loadClass(Permission);
module.exports = mongoose.model('Permission', schema);
