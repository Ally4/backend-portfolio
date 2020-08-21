import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        min: 150,
        required: true
    },
    imageLink: {
        type: String,
    }
});

const Post = mongoose.model("posts", schema);

export default Post;

