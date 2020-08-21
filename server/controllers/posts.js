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
            message: "Post not found!" 
        });
        res.status(200).json({ 
            status: 200, 
            post: post 
        });
    }

    async editPost(req, res) {
        const { title, content, imgLink } = req.body;
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).json({ 
            status: 404, 
            message: "Post not found!" 
        });

        if (title) {
            post.title = title
        }

        if (content) {
            post.content = content;
        }

        if (imgLink) {
            post.imageLink = imgLink
        }

        await post.save()
        res.status(200).json({ 
            status: 200, 
            message: "successfully edited", 
            post: post 
        });
    }
}

export default new Posts();