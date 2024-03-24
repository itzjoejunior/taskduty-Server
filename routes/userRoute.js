const express = require("express");
const router = express.Router();
const {registration, login, isLoggedin} = require('../controllers/userController');


// Require controller modules.

// register route
router.post('/register',registration);

// login route 
router.post("/login",login);

// isLoggedin 

router.get('/isloggedin', isLoggedin)



  module.exports =router