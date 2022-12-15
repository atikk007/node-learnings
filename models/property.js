const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title: {
        type: String,
        require: true
    },
    size: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Property = mongoose.model('ListingAndReview', listingSchema);

module.exports = Property;