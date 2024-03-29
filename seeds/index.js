const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const axios = require("axios");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

async function getImg() {
    try {
        const res = await axios.get('https://api.unsplash.com//photos/random', {
            params: {
                collection: 1114848,
                client_id: "BpjlYfapw__e2pwws-LzBuBFY0ReIdyJ0r1lYxxH4ME"
            }
        });
        return res.data.urls.small;
    }
    catch (err) {
        console.log(err)
    }
}

const seedDB = async (numberSeeds = 1) => {
    await Campground.deleteMany({});
    for (let i = 0; i < Math.min(numberSeeds, 50); i++) { // 50 requests per hour max to the Unsplash API
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '63f5cf5eae3f99bd6cc95c75',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [`${cities[random1000].longitude}`, `${cities[random1000].latitude}`]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dkgjp7bfh/image/upload/v1672668786/Yelpcamp/iiqlw8vyyrfmxjhhmmbk.jpg',
                    filename: 'Yelpcamp/iiqlw8vyyrfmxjhhmmbk'
                },
                {
                    url: 'https://res.cloudinary.com/dkgjp7bfh/image/upload/v1672668786/Yelpcamp/qwjmwt6mokvkbsy2ezlh.jpg',
                    filename: 'Yelpcamp/qwjmwt6mokvkbsy2ezlh'
                }
            ],
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo eaque explicabo exercitationem modi praesentium impedit sapiente ipsum quam libero obcaecati, id doloremque aperiam architecto ad hic eius corrupti. Maiores, libero.",
            price: Math.floor(Math.random() * 20) + 10
        })
        await camp.save();
    }
};

seedDB(50).then(() => {
    mongoose.connection.close();
});
