
import { Request, Response, NextFunction, Router } from "express";
import { InstitutionPostController } from "../../Controller/Institution/Post";
import { InstitutionGetConstroller } from "../../Controller/Institution/Get"
import { InstitutionPutController } from "../../Controller/Institution/Put";
import { InstitutionDeleteController } from "../../Controller/Institution/Delete";
import { Authentication } from "../../Middleware/Authentication"; 
       
export const institutionRoute: Router = Router();
const Post: InstitutionPostController = new InstitutionPostController();
const Get: InstitutionGetConstroller = new InstitutionGetConstroller();
const Put: InstitutionPutController = new InstitutionPutController();
const Delete: InstitutionDeleteController = new InstitutionDeleteController();

//Post Institution route
institutionRoute.post('/post', Authentication, (req: Request, res: Response, next: NextFunction) => {
    Post.postInstitution(req, res, next);
});

//Get Institution route
institutionRoute.get('/get/:id', (req: Request, res: Response, next: NextFunction) => {
    Get.getInstitutionById(req, res, next);
});

institutionRoute.get('/search', (req: Request, res: Response, next: NextFunction) => {
    Get.getInstitutionByParams(req, res, next);
});

//Put Institution route
institutionRoute.put('/update/:id', Authentication, (req: Request, res: Response, next: NextFunction) => {
    Put.updateInstitution(req, res, next);
});

//Delete Institution route
institutionRoute.delete('/delete/:id', Authentication, (req: Request, res: Response, next: NextFunction) => {
    Delete.deleteInstitution(req, res, next);
});