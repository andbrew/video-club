const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const User = require('../models/user');

function list(req, res, next) {
  User.find()
  .then(objs => res.status(200).json({
    message: 'Users list',
    obj: objs
  }))
  .catch(err => res.status(500).json({
    message: 'Error while consulting users list',
    obj: err
  }));
}

function index(req, res, next) {
  const id = req.params.id;
  User.findOne({
    _id: id
  })
  .then(obj => res.status(200).json({
    message: `User ${id}`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't find user ${id}`,
    obj: err
  }));
}

function create (req, res, next) {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  async.parallel({
    salt: callback => {
      bcrypt.genSalt(10, callback);
    }
  }, (err, result) => {
    bcrypt.hash(password, result.salt, (err, hash) => {
      let user = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: hash,
        salt: result.salt
      });
      user.save()
      .then(obj => res.status(200).json({
        message: 'User created succesfully',
        obj: obj
      }))
      .catch(err => res.status(500).json({
        message: 'Error while creating user',
        obj: err
      }));
    });
  });
}

function replace(req, res, next) {
  const id = req.params.id;
  const name = req.body.name ? req.body.name : '';
  const lastName = req.body.lastName ? req.body.lastName : '';
  let user = new Object({
    _name: name,
    _lastName: lastName
  });
  User.findOneAndUpdate({
    _id: id
  }, user)
  .then(obj => res.status(200).json({
    message: `User ${id} was updated`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't update user ${id}`,
    obj: err
  }));
}

function edit(req, res, next) {res.send(`/users => edit()`);}

function destroy(req, res, next) {
  const id = req.params.id;
  User.remove({
    _id: id
  })
  .then(obj => res.status(200).json({
    message: `User ${id} was succesfully deleted`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't delete user ${id}`,
    obj: err
  }));
}

module.exports = {list, index, create, replace, edit, destroy};
