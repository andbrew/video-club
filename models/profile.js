const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _description: String,
  _status: Boolean,
  _permissions: Array
});

class Profile {
  constructor(description, status, permissions) {
    this._description = description;
    this._status = status;
    this._permissions = permissions;
  }

  get description() {
    return this._description;
  }
  set description(description) {
    this._description = description;
  }

  get status() {
    return this._status;
  }
  set status(status) {
    this._status = status;
  }

  get permissions() {
    return this._permissions;
  }
  set permissions(permissions) {
    this._permissions = permissions;
  }
}

schema.loadClass(Profile);
module.exports = mongoose.model('Profile', schema);
