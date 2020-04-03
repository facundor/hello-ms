const express = require('express');
const router = express.Router();
const User = require('../model/User')
const mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let user = { id: 304, name: "Charles", surname: "Darwin"};
  res.status(200).end(JSON.stringify(user));
});

/* POST user. */
router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let user = req.body
  console.log(user);
  res.status(200).end(JSON.stringify(user));
});

module.exports = router;
