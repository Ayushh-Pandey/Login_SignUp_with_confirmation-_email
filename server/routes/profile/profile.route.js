const express = require("express");
const router = express.Router();

const {createProfile,mailToUser} = require("./profile.controller")

router.post('/profile',createProfile);
router.post('/profile/mail',mailToUser)

module.exports = router;