const express = require("express");
const authcontroller = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authcontroller.signUp);
router.post("/signin", authcontroller.signIn);
router.post("/signout", authcontroller.signOut);

module.exports = router;
