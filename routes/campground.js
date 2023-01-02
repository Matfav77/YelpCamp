const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware/auth");
const { validateCampground, isAuthor } = require("../middleware/campground")
const campgroundCtrl = require("../controllers/campground");
const multer = require('multer');
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.route("/")
    .get(catchAsync(campgroundCtrl.showAllCampgrounds))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgroundCtrl.createCampground))

router.get("/new", isLoggedIn, campgroundCtrl.renderCreationForm)

router.route("/:id")
    .get(catchAsync(campgroundCtrl.showOneCampground))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgroundCtrl.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundCtrl.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgroundCtrl.renderEditForm))

module.exports = router;