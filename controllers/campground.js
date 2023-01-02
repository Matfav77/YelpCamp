const Campground = require("../models/campground");

module.exports.showAllCampgrounds = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}

module.exports.renderCreationForm = (req, res) => {
    res.render("campgrounds/new");
}

module.exports.createCampground = async (req, res) => {
    const newCampground = new Campground(req.body.campground);
    newCampground.images = req.files.map(el => ({ url: el.path, filename: el.filename }));
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash("success", "Successfully created a new campground!");
    res.redirect(`/campgrounds/${newCampground._id}`);
}

module.exports.showOneCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("author");
    if (!campground) {
        req.flash("error", "Cannot find that campground.");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash("error", "Cannot find that campground.");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
}

module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const foundCampground = await Campground.findById(id);
    const campground = { ...req.body.campground };
    const imgs = req.files.map(el => ({ url: el.path, filename: el.filename }));
    campground.images = foundCampground.images;
    campground.images.push(...imgs);
    await Campground.findByIdAndUpdate(id, campground);
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${foundCampground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted a campground!");
    res.redirect("/campgrounds");
}