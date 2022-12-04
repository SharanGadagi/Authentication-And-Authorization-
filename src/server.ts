import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';

import { PORT } from './config/config';
import User from './models/userModel';
import userRoutes from './Routes/userRoutes';

const app: express.Application = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



User.sync({ force: false });

//user type used globally in project
declare global {
    namespace Express {
        interface Request {
            user: any;
            token: string;
        }
    }
}



app.use('/user', userRoutes);


app.listen(PORT, () => {
    console.log(`app listening on: http://localhost:${PORT}`);
});
