const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function home(req, res, next) {
  res.render('index', { title: 'Express' });
}

function login(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({
    _emal: email
  })
  .select('_password _salt')
  .then(user => {
    if(user) {
      bcrypt.hash(password, user.salt, (err, hash) => {
        if(err) {
          res.status(403).json({
            message: 'Error while hashing password'
          });
        }
        if(hash === user.password) {
          const jwtKey = '3c6e0b8a9c15224a8228b9a98ca1531d';
          res.status(200).json({
            message: 'Authorized',
            obj: jwt.sign({
              exp: Math.floor(Date.now() / 1000) + 60,
              data: user.id
            }, jwtKey)
          });
        }
        else {
          res.status(403).json({
            message: 'Invalid credentials'
          });
        }
      })
    }
  })
  .catch(err => res.status(500).json({
    message: 'Error in login',
    obj: err
  }));
}

module.exports = {home, login}
