const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true }); // this automatically creates timestamps for us. 

const Blog = mongoose.model("Blog", blogSchema); 
//First argument is the singular of the collection name in the database
// the second argument is the Schema we want to base this model on, which is the one we created above (blogSchema)

// This is mongoose creating a schema for us, and we are telling it
// what type of data each property should be and if it should be required or not 

module.exports = Blog;