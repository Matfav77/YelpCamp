const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync")
const authCtrl = require("../controllers/auth")

router.get("/signup", authCtrl.renderSignup)

router.post("/signup", catchAsync(authCtrl.signUp))

router.get("/login", authCtrl.renderLogin)

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }), authCtrl.login)

router.get("/logout", authCtrl.logout);


module.exports = router;