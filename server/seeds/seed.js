import Owner from "../models/admin";
import dotenv from "dotenv";

dotenv.config();

const upDateDb = async () => {
    await Owner.deleteOne({ email: process.env.ownerEmail });
}

const createOwner = () => {
    const ownerCredentials = {
        email: process.env.ownerEmail,
        password: process.env.ownerPassword
    }

    upDateDb();

    const login = new Owner(ownerCredentials);
    login.save();
}

export default createOwner;