const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

// Create a user
// post request http://localhost:7000/users on this api with below json data
// {
//   "name": "News",
//   "age":12,
//   "dob":"15-11-2022",
//   "isMarried":"lse",
//   "skill":{
//       "name":"node",
//       "experience":1
//   }
// }
router.post('/users', userController.create);

// Get all users
http://localhost:7000/users
router.get('/users', userController.getAll);


module.exports = router;
