import mongoose from 'mongoose';

const portfolio = mongoose.model('portfolio', new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    email: String,
    password: String
}));

export default portfolio;
