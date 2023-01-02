const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware/auth");
const { validateCampground, isAuthor } = require("../middleware/campground")
const campgroundCtrl = require("../controllers/campground");

router.get("/", catchAsync(campgroundCtrl.showAllCampgrounds))

router.get("/new", isLoggedIn, campgroundCtrl.showCreationForm)

router.post("/", isLoggedIn, validateCampground, catchAsync(campgroundCtrl.createCampground))

router.get("/:id", catchAsync(campgroundCtrl.showOneCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgroundCtrl.showEditForm))

router.put("/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundCtrl.editCampground))

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgroundCtrl.deleteCampground))

module.exports = router;