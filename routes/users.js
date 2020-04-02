var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let user = { id: 304, name: "Charles", surname: "Darwin"};
  res.status(200).end(JSON.stringify(user));
});

module.exports = router;
