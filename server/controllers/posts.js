import Post from "../models/posts";
import commentSchema from "../validation/comment";
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
       return res.status(201).json({ 
            status: 201, 
            message: "post successfully created", 
            post: post 
        });
    }

    async insertComment(req, res) {

        const { error } = commentSchema.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message.replace(/"/g, ''),
          });
        }

        const { name, comment } = req.body;
        const post = await Post.findOne({ _id: req.params.id });
        if (!post){ 
            return res.status(404).json({ 
                status: 404, 
                message: "The post is not found" 
            })};
        await Post.updateOne({ _id: req.params.id }, { $push: { comments: { name: name, comment: comment } } });
        return res.status(200).json({ 
            status: 200, 
            message: "comment posted Successfully" 
        });
    }

    async like(req, res) {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).json({ 
            status: 404, 
            message: "Post not found!" });
        await Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } });
        return res.status(200).json({ 
            status: 200, 
            message: "The post was liked successfully" 
        });
    }

    async getPosts(_req, res) {
        const posts = await Post.find()
        res.status(200).json({ 
            status: 200, 
            posts: posts 
        });
    }

    async getPost(req, res) {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).json({ 
            status: 404, 
            message: "The post is not found" 
        });
       return res.status(200).json({ 
            status: 200, 
            post: post 
        });
    }

    async editPost(req, res) {
        const { title, content, imageLink } = req.body;
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).json({ 
            status: 404, 
            message: "The post is not found" 
        });

        if (title) { post.title = title }

        if (content) { post.content = content }

        if (imageLink) { post.imageLink = imageLink }

        await post.save()
       return res.status(200).json({ 
            status: 200, 
            message: "successfully edited", 
            post: post 
        });
    }

    async deletePost(req, res) {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).json({ 
            status: 404, 
            message: "The post is not found" 
        });
        await Post.deleteOne({ _id: req.params.id });
       return res.status(200).json({ 
            status: 200, 
            message: "deleted successfully" 
        });
    }
    
}

export default new Posts();

