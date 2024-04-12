const express = require("express");
const router = express.Router();

const {createUser,loginUser} = require("./user.controller")

router.post('/registration',createUser);
router.post('/login',loginUser)

module.exports = router;