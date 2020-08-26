import express from 'express';
import User from "../controllers/admin";
import Queries from "../controllers/queries";
import Posts from "../controllers/posts";
import Authentication from "../middleware/authenticate";

const router = express.Router();

router.get("/", User.welcome);

router.post("/auth/login", User.login);

router.post("/posts", Authentication, Posts.createPosts);

router.get("/posts", Posts.getPosts);

router.get("/posts/:id", Posts.getPost);

router.patch("/posts/:id", Authentication, Posts.editPost);

router.delete("/posts/:id", Authentication, Posts.deletePost);

router.post("/queries", Queries.createQuery);

router.get("/queries", Authentication, Queries.getQueries);

router.get("/queries/:id", Authentication, Queries.getQuery);

router.delete("/queries/:id", Authentication, Queries.deleteQuery);


export default router;