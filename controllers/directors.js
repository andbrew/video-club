const express = require('express');

function list(req, res, next) {
  res.send(`/directors => list() = lists directors`);
}

function index(req, res, next) {
  const id = req.params.id;
  res.send(`/directors => index() = shows director ${id}`);
}

function create (req, res, next) {
  const name = req.body.name;
  const lastName = req.body.lastName;
  res.send(`/directors => create() = creates director ${name} ${lastName}`);
}

function replace(req, res, next) {res.send(`/directors => replace()`);}
function edit(req, res, next) {res.send(`/directors => edit()`);}
function destroy(req, res, next) {res.send(`/directors => destroy()`);}

module.exports = {list, index, create, replace, edit, destroy};
