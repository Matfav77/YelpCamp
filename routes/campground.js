const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware/auth");
const { validateCampground, isAuthor } = require("../middleware/campground")
const campgroundCtrl = require("../controllers/campground");

router.route("/")
    .get(catchAsync(campgroundCtrl.showAllCampgrounds))
    .post(isLoggedIn, validateCampground, catchAsync(campgroundCtrl.createCampground))

router.get("/new", isLoggedIn, campgroundCtrl.renderCreationForm)

router.route("/:id")
    .get(catchAsync(campgroundCtrl.showOneCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundCtrl.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundCtrl.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgroundCtrl.renderEditForm))

module.exports = router;