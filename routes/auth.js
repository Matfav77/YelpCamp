const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync")
const authCtrl = require("../controllers/auth")

router.route("/signup")
    .get(authCtrl.renderSignup)
    .post(catchAsync(authCtrl.signUp))

router.route("/login")
    .get(authCtrl.renderLogin)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }), authCtrl.login)

router.get("/logout", authCtrl.logout);


module.exports = router;