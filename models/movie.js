const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _title: String
});

class Movie {
  constructor(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }
  set title(title) {
    this._title = title;
  }
}

schema.loadClass(Movie);
module.exports = mongoose.model('Movie', schema);
