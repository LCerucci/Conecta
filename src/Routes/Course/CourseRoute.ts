import { Request, Response, NextFunction, Router } from "express";
import { CoursePostController } from "../../Controller/Course/Post";
import { CourseGetController } from "../../Controller/Course/Get";
import { CoursePutController } from "../../Controller/Course/Put";
import { CourseDeleteController } from "../../Controller/Course/Delete";
import { Authentication } from "../../Middleware/Authentication";

export const courseRoute: Router = Router();
const Post: CoursePostController = new CoursePostController();
const Get: CourseGetController = new CourseGetController();
const Put: CoursePutController = new CoursePutController();
const Delete: CourseDeleteController = new CourseDeleteController();

//Post Course route
courseRoute.post('/post/:idInst', Authentication, (req: Request, res: Response, next: NextFunction) => {
    Post.createCourse(req, res, next);
});

//Get Course route
courseRoute.get('/get/:id', (req: Request, res: Response, next: NextFunction) => {
    Get.getCourseById(req, res, next);
});

courseRoute.get('/search', (req: Request, res: Response, next: NextFunction) => {
    Get.getCourseByParam(req, res, next);
});

//Put Course route
courseRoute.put('/update/:id', Authentication, (req: Request, res: Response, next: NextFunction) => {
    Put.updateCourse(req, res, next);
});

//Delete Course route
courseRoute.delete('/delete/:id', Authentication, (req: Request, res: Response, next: NextFunction) => {
    Delete.deleteCourse(req, res, next);
});