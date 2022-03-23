const express = require('express');
const {Genre} = require('../db');

function list(req, res, next) {
  Genre.findAll({
    include: ['movies']
  })
  .then(objects => res.json(objects))
  .catch(err => res.send(err));
}

function index(req, res, next) {
  const id = req.params.id;
  Genre.findByPk(id)
  .then(object => res.json(object))
  .catch(err => res.send(err));
}

function create (req, res, next) {
  const description = req.body.description;
  let genre = new Object({
    description: description
  });
  Genre.create(genre)
  .then(object => res.json(object))
  .catch(err => res.send(err));
}

function replace(req, res, next) {
  const id = req.params.id;
  Genre.findByPk(id)
  .then(object => {
    const description = req.body.description ? req.body.description : '';
    object.update({
      description: description
    })
    .then(object => res.json(object))
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
}

function edit(req, res, next) {
  const id = req.params.id;
  Genre.findByPk(id)
  .then(object => {
    const description = req.body.description ? req.body.description : '';
    object.update({
      description: description
    })
    .then(object => res.json(object))
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Genre.destroy({
    where: {
      id: id
    }
  })
  .then(object => res.json(object))
  .catch(err => res.send(err));
}

module.exports = {list, index, create, replace, edit, destroy};
