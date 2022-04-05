const express = require('express');
const Genre = require('../models/genre');

function list(req, res, next) {
  Genre.find()
  .then(objs => res.status(200).json({
    message: 'Genres list',
    obj: objs
  }))
  .catch(err => res.status(500).json({
    message: 'Error while consulting genres list',
    obj: err
  }));
}

function index(req, res, next) {
  const id = req.params.id;
  Genre.findOne({
    _id: id
  })
  .then(obj => res.status(200).json({
    message: `Genre ${id}`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't find Genre ${id}`,
    obj: err
  }));
}

function create (req, res, next) {
  const description = req.body.description;
  let genre = new Genre({
    description: description
  });
  genre.save()
  .then(obj => res.status(200).json({
    message: 'Genre created succesfully',
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: 'Error while creating genre',
    obj: err
  }));
}

function replace(req, res, next) {
  const id = req.params.id;
  const description = req.body.description ? req.body.description : '';
  let genre = new Object({
    _description: description,
  });
  Genre.findOneAndUpdate({
    _id: id
  }, genre)
  .then(obj => res.status(200).json({
    message: `Genre ${id} was updated`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't update genre ${id}`,
    obj: err
  }));
}

function edit(req, res, next) {res.send(`/genre => edit()`);}

function destroy(req, res, next) {
  const id = req.params.id;
  Genre.remove({
    _id: id
  })
  .then(obj => res.status(200).json({
    message: `Genre ${id} was succesfully deleted`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't delete genre ${id}`,
    obj: err
  }));
}

module.exports = {list, index, create, replace, edit, destroy};
