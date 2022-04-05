const express = require('express');
const Member = require('../models/member');

function list(req, res, next) {
  Member.find()
  .then(objs => res.status(200).json({
    message: 'Members list',
    obj: objs
  }))
  .catch(err => res.status(500).json({
    message: 'Error while consulting members list',
    obj: err
  }));
}

function index(req, res, next) {
  const id = req.params.id;
  Member.findOne({
    _id: id
  })
  .then(obj => res.status(200).json({
    message: `Member ${id}`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't find member ${id}`,
    obj: err
  }));
}

function create (req, res, next) {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const address = new Object();
  address.street = req.body.street;
  address.number = req.body.number;
  address.zip = req.body.zip;
  address.state = req.body.state;
  let member = new Member({
    name: name,
    lastName: lastName,
    phone: phone,
    address: address
  });
  member.save()
  .then(obj => res.status(200).json({
    message: 'Member created succesfully',
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: 'Error while creating member',
    obj: err
  }));
}

function replace(req, res, next) {
  const id = req.params.id;
  const name = req.body.name ? req.body.name : '';
  const lastName = req.body.lastName ? req.body.lastName : '';
  let member = new Object({
    _name: name,
    _lastName: lastName
  });
  Member.findOneAndUpdate({
    _id: id
  }, member)
  .then(obj => res.status(200).json({
    message: `Member ${id} was updated`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't update member ${id}`,
    obj: err
  }));
}

function edit(req, res, next) {res.send(`/members => edit()`);}

function destroy(req, res, next) {
  const id = req.params.id;
  Member.remove({
    _id: id
  })
  .then(obj => res.status(200).json({
    message: `Member ${id} was succesfully deleted`,
    obj: obj
  }))
  .catch(err => res.status(500).json({
    message: `Can't delete member ${id}`,
    obj: err
  }));
}

module.exports = {list, index, create, replace, edit, destroy};
