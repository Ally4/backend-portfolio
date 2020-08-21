import express from 'express';
import User from "../controllers/admin";

const router = express.Router();

router.get("/", function (req, res) {
    return res.send({
        message: 'Welcome to my personal web'
    });
});

router.post("/auth/login", User.login);


export default router;