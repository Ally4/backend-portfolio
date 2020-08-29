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
                status: 404, error: "The post is not found" 
            })};
        await Post.updateOne({ _id: req.params.id }, { $push: { comments: { name: name, comment: comment } } });
        return res.status(200).json({ 
            status: 200, 
            message: "comment posted Successfully" 
        });
    }

    async likePost(req, res) {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).json({ 
                status: 404, 
                error: "The post is not found" 
            })
        };
        await Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } });
        return res.status(200).json({ 
            status: 200, 
            message: "You liked the post" 
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





  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
// import Post from "../models/posts";

// class Comments {
//     async addComment(req, res) {
//         const { name, comment } = req.body;
//         const post = await Post.findOne({ _id: req.params.id });
//         if (!post) return res.status(404).send({ status: 404, error: "Post not found!" });
//         await Post.updateOne({ _id: req.params.id }, { $push: { comments: { name: name, comment: comment } } });
//         return res.status(200).send({ status: 200, message: "comment posted Successfully" });
//     }
// }

// export default new Comments();



// min: 150,
// required: true
// },
// imageLink: {
// type: String,
// required: true
// },
// comments: {
// type: Array
// },
// likes: {
// type: Number,
// default: 0
// }
// });







// import chai from "chai";
// import chaiHttp from "chai-http";
// import app from "../app";
// import { data } from "./testData";
// import { postId } from "./posts.test";

// const { expect } = chai;
// chai.use(chaiHttp);

// describe('Comment on a blog Post', () => {
//     it('should return 200 ok status code on successful comment post', (done) => {
//         chai
//             .request(app)
//             .post(`/posts/comment/${postId}`)
//             .send(data.validComment)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             })
//     });

//     it('should return 400 bad request status when passed an invalid comment', (done) => {
//         chai
//             .request(app)
//             .post(`/posts/comment/${postId}`)
//             .send(data.invalidComment)
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });

//     it('should return 404 not found status when passed an invalid post Id', (done) => {
//         chai
//             .request(app)
//             .post(`/posts/comment/${data.invalidPostID}`)
//             .send(data.validComment)
//             .end((err, res) => {
//                 expect(res).to.have.status(404);
//                 expect(res.body).to.have.property("error");
//                 done();
//             });
//     });
// });




// import chai from "chai";
// import chaiHttp from "chai-http";
// import app from "../app";
// import { data } from "./testData";
// import { postId } from "./posts.test";

// const { expect } = chai;
// chai.use(chaiHttp);

// describe('Like a blog Post', () => {
//     it('should return 200 ok status code on successful liked post', (done) => {
//         chai
//             .request(app)
//             .post(`/posts/like/${postId}`)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             })
//     });

//     it('should return 404 not found status when passed an invalid post Id', (done) => {
//         chai
//             .request(app)
//             .post(`/posts/like/${data.invalidPostID}`)
//             .end((err, res) => {
//                 expect(res).to.have.status(404);
//                 expect(res.body).to.have.property("error");
//                 done();
//             });
//     });
// });



// import Post from "../models/posts";

// class Like {
//     async likePost(req, res) {
//         const post = await Post.findOne({ _id: req.params.id });
//         if (!post) return res.status(404).send({ status: 404, error: "Post not found!" });
//         await Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } });
//         return res.status(200).send({ status: 200, message: "Liked!!!" });
//     }
// }


// export default new Like();