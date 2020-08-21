import express from 'express';
import User from "../controllers/admin";
import Posts from "../controllers/posts";
import Authentication from "../middleware/authenticate";

const router = express.Router();

router.get("/", function (req, res) {
    return res.send({
        message: 'Welcome to my personal web'
    });
});

router.post("/auth/login", User.login);

router.post("/posts", Authentication, Posts.createPosts);

router.get("/posts", Authentication, Posts.getPosts);

router.get("/posts/:id", Authentication, Posts.getPost);

router.patch("/posts/:id", Authentication, Posts.editPost);

router.delete("/posts/:id", Authentication, Posts.deletePost);


export default router;