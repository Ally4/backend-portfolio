import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import cors from 'cors';
import createOwner from '../server/seeds/seed';
import swagger from '../swagger.json';
import routes from './router/index';


dotenv.config();

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(cors());


app.use(routes);

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swagger));

app.use((_req, res) => {
  res.status(404).json({ 
    status: 404, 
    message: 'Page doesn\'t exists' 
  });
});


const MONGODB_URI = process.env.MONGO_address;

mongoose.connect(MONGODB_URI || 'mongodb://localhost:4000/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

createOwner();

mongoose.connection.on('connected', () => console.log('Mongoose is on!.'));


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});

export default app;