const express = require('express');
const Actor = require('../models/actor');

function list(req, res, next) {
  Actor.find()
  .then(objs => res.status(200).json({
    message: 'Actors list',
    obj: objs
  }))
  .catch(err => res.status(500).json({
    message: 'Error while consulting actors list',
    obj: err
  }));
}

function index(req, res, next) {
  const id = req.params.id;
  Actor.findOne({
    _id: id
  })
  .then(obj => res.status(200).json({
    message: `Actor ${id}`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't find actor ${id}`,
    obj: err
  }));
}

function create (req, res, next) {
  const name = req.body.name;
  const lastName = req.body.lastName;
  let actor = new Actor({
    name: name,
    lastName: lastName
  });
  actor.save()
  .then(obj => res.status(200).json({
    message: 'Actor created succesfully',
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: 'Error while creating actor',
    obj: err
  }));
}

function replace(req, res, next) {
  const id = req.params.id;
  const name = req.body.name ? req.body.name : '';
  const lastName = req.body.lastName ? req.body.lastName : '';
  let actor = new Object({
    _name: name,
    _lastName: lastName
  });
  Actor.findOneAndUpdate({
    _id: id
  }, actor)
  .then(obj => res.status(200).json({
    message: `Actor ${id} was updated`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't update actor ${id}`,
    obj: err
  }));
}

function edit(req, res, next) {res.send(`/actors => edit()`);}

function destroy(req, res, next) {
  const id = req.params.id;
  Actor.remove({
    _id: id
  })
  .then(obj => res.status(200).json({
    message: `Actor ${id} was succesfully deleted`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't delete actor ${id}`,
    obj: err
  }));
}

module.exports = {list, index, create, replace, edit, destroy};
