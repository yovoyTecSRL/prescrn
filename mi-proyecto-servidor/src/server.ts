import express from 'express';
import { Request, Response } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Define additional routes here

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});