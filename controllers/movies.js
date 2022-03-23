const express = require('express');
const {Movie, Actor} = require('../db');

function list(req, res, next) {
  Movie.findAll({
    include: ['director', 'actors']
  })
  .then(objects => res.json(objects))
  .catch(err => res.send(err));
}

function index(req, res, next) {
  const id = req.params.id;
  Movie.findByPk(id)
  .then(object => res.json(object))
  .catch(err => res.send(err));
}

function create (req, res, next) {
  const title = req.body.title;
  const directorId = req.body.directorId;
  const genreId = req.body.genreId;
  let movie = new Object({
    title: title,
    directorId: directorId,
    genreId: genreId
  });
  Movie.create(movie)
  .then(object => res.json(object))
  .catch(err => res.send(err));
}

function addActor(req, res, next) {
  const movieId = req.body.movieId;
  const actorId = req.body.actorId;
  Movie.findByPk(movieId)
  .then(movie => {
    Actor.findByPk(actorId)
    .then(actor => {
      movie.addActor(actor);
      res.json(movie);
    })
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
}

function replace(req, res, next) {
  const id = req.params.id;
  Movie.findByPk(id)
  .then(object => {
    const title = req.body.title ? req.body.title : '';
    const directorId = req.body.directorId ? req.body.directorId : '';
    const genreId = req.body.genreId ? req.body.genreId : '';
    object.update({
      title: title,
      directorId: directorId,
      genreId: genreId
    })
    .then(object => res.json(object))
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
}

function edit(req, res, next) {
  const id = req.params.id;
  Movie.findByPk(id)
  .then(object => {
    const title = req.body.title ? req.body.title : '';
    const directorId = req.body.directorId ? req.body.directorId : '';
    const genreId = req.body.genreId ? req.body.genreId : '';
    object.update({
      title: title,
      directorId: directorId,
      genreId: genreId
    })
    .then(object => res.json(object))
    .catch(err => res.send(err));
  })
  .catch(err => res.send(err));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Movie.destroy({
    where: {
      id: id
    }
  })
  .then(object => res.json(object))
  .catch(err => res.send(err));
}

module.exports = {list, index, create, addActor, replace, edit, destroy};
