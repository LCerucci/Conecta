import path from 'path';
import cookiePrser from 'cookie-parser';
import { userRoute } from "./Routes/User/UserRoute";
import { courseRoute } from "./Routes/Course/CourseRoute";
import { RequestHandler } from './Error/Handler/RequestHandler';
import express, { Request, Response, NextFunction } from 'express';
import { institutionRoute } from "./Routes/Instituition/InstitutionRoute";

const app = express();

//Render config
app.set('view engine', 'ejs');
app.set('vies', path.join(__dirname, 'View'));

//Json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cookie handler
app.use(cookiePrser());

//Route mapping
app.use('/course', courseRoute);
app.use('/institution', institutionRoute);
app.use('/user', userRoute);

//Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    RequestHandler(err, _req, res, _next);
});

//Server port
app.listen(process.env.PORT, () => {
    console.log(`http server listen on port ${process.env.PORT}`);
});