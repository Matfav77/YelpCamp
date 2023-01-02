const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review");

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200")
})

const campgroundSchema = new Schema({
    title: { type: String, required: true },
    images: [imageSchema],
    price: { type: Number, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
});

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Campground", campgroundSchema);