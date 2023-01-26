const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    seq: 
    { 
        type: Number, 
        default: 0 
    },
    postDate:
    {
        type: Date,
        required: [true, "Date is required"]
    },
    header:
    {
        type: String,
        required: [true, "Header is required"]
    },
    subheader:
    {
        type: String,
        // required: [true, "Subheader is required"]
    },
    content:
    {
        type: String,
        required: [true, "Content is required"]
    },
    mainImage:
    {
        type: String,
        required: [true, "mainImage is required"]
    },
    secondaryImage:
    {
        type: String,
        required: [true, "secondaryImage is required"]
    }
    
});

NewsSchema.plugin(AutoIncrement, {inc_field: 'inc_id'});

const News = mongoose.model("MapPaths", NewsSchema);
module.exports = News;