import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { dbConnection } from './database/config';
import { router } from './routes';

const app = express();
dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.static('storage'));

app.use('/api/', router);

const port = process.env.PORT || 3333;
app.listen( port, () => console.log(`Server running on port: ${port}`))