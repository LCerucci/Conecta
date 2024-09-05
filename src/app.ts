import cookiePrser from 'cookie-parser';
import { userRoute } from "./Routes/User/UserRoute";
import { courseRoute } from "./Routes/Course/CourseRoute";
import express, { Request, Response, NextFunction, json } from 'express';
import { institutionRoute } from "./Routes/Instituition/InstitutionRoute";

const app = express();


//Json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Cookie handler
app.use(cookiePrser());


//Route mapping
app.use('/course', courseRoute);
app.use('/institution', institutionRoute);
app.use('/user', userRoute);


//Server port
app.listen(process.env.PORT, () => {
    console.log(`http server listen on port ${process.env.PORT}`);
});