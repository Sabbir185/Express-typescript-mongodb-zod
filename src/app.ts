import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import apiRouters from './routes';

// app initialization
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
    );
    next();
});
app.use(cors());

// API routes
app.use('/api', apiRouters);

// general response
app.get('/', (req, res) => {
    return res.status(200).json({ error: false, msg: 'Welcome!' });
});

// handle unknown api
app.all('*', (req: Request, res: Response) => {
    return res.status(200).json({ error: true, msg: 'API route not found' });
});

// Global error handle
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
        console.error(error.stack);
        console.error(error.message);
        return res
            .status(500)
            .json({ error: true, msg: 'Internal Server Error' });
    } else {
        return res
            .status(500)
            .json({ error: true, msg: 'Something went wrong' });
    }
    next();
});


export default app;
