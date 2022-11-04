const express = require("express");
const router = express.Router();

const controller = require('../controllers/usersController');


/*----------------Login route ------------*/
router.post("/login", controller.userAuth);


/*----------------Register route ------------*/
router.post("/register", controller.userRegist);


module.exports = router;
