const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { validateReview, isReviewAuthor } = require("../middleware/review");
const { isLoggedIn } = require("../middleware/auth");
const reviewCtrl = require("../controllers/review")

router.post("/", isLoggedIn, validateReview, catchAsync(reviewCtrl.createReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviewCtrl.deleteReview))

module.exports = router;