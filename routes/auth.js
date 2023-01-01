const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync")
const User = require("../models/user");

router.get("/signup", (req, res) => {
    res.render("auth/signup");
})

router.post("/signup", catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to Yelpcamp");
            res.redirect("/campgrounds");
        })
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}))

router.get("/login", (req, res) => {
    res.render("auth/login")
})

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true, }), async (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    console.log(redirectUrl);
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash("success", "Goodbye!");
        res.redirect("/campgrounds");
    })
});


module.exports = router;