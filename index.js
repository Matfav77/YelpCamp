const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const { campgroundSchema, reviewSchema } = require("./schemas.js");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressErrors");
const path = require("path");
const Campground = require("./models/campground");
const Review = require("./models/review")
const campgroundRoutes = require("./routes/campground");
const reviewRoutes = require("./routes/review");


mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("public"));


app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.render("home")
})

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong";
    res.status(statusCode).render("error", { err });
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
});

