const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _description: String
});

class Genre {
  constructor(description) {
    this._description = description;
  }

  get description() {
    return this._description;
  }
  set description(description) {
    this._description = description;
  }
}

schema.loadClass(Genre);
module.exports = mongoose.model('Genre', schema);
