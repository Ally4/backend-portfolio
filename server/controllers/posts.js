import Post from "../models/posts";
import postSchema from "../validation/posts";

class Posts {

    async createPosts(req, res) {

        const { error } = postSchema.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message.replace(/"/g, ''),
          });
        }

        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imageLink: req.body.imageLink
        });

        await post.save();
        res.status(200).json({ 
            status: 200, 
            message: "post successfully created", 
            post: post 
        });
    }
}

export default new Posts();