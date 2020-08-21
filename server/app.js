import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './router/index';

const app = express();

app.use(express.json());

app.use(bodyParser.json());


app.use(routes);

app.use((_req, res) => {
  res.status(404).json({ 
    status: 404, 
    message: 'Page doesn\'t exists' 
  });
});

const MONGODB_URI = 'mongodb+srv://Ally:Ally@portfolio.g7x1n.mongodb.net/portfolio?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI || 'mongodb://localhost:4000/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => console.log('Mongoose is on!.'));


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});

export default app;