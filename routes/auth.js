const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync")
const User = require("../models/user");

router.get("/register", (req, res) => {
    res.render("auth/register");
})

router.post("/register", catchAsync(async (req, res) => {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.flash("success", "Welcome to Yelpcamp");
    res.redirect("/campgrounds");
}))

module.exports = router;