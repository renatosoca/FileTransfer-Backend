import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { dbConnection } from './database/config';

const app = express();
dbConnection();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3333;
app.listen( port, () => console.log(`Server running on port: ${port}`))