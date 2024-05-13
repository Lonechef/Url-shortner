const express = require('express');
const { handleUserSignUp,handleUserlogin } = require('../controllers/user'); // Assuming '../controllers/user' exports handleUserSignUp
const router = express.Router();

router.post("/", handleUserSignUp); // Call handleUserSignUp directly
router.post("/login",handleUserlogin )
module.exports = router;