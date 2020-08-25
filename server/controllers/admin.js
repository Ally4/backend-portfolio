import Admin from "../models/admin";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import signin from "../validation/admin";


dotenv.config();

class User {
    async login(req, res) {
        const { error } = signin.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message.replace(/"/g, ''),
          });
        }
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email });
        if (!admin) return res.status(400).json({ 
            status: 400, 
            message: "There is a bad credential" 
        });
        if (admin.password !== password) return res.status(400).json({ 
            status: 400,
            message: "There is a bad credential" 
        });
        const payload = 'admin';
        const token = jwt.sign(payload, process.env.Key);
        return res.status(200).json({ 
            status: 200, 
            message: "successfully Login", 
            token: token });
    }
}

export default new User();