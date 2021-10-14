import { Application, Request, Response} from 'express';
import UserController from './controller';

const userRoute = (app: Application) => {

    app.post("/user/authenticate", (req: Request, res: Response) => {
        UserController.authenticate(req, res);
    })

    app.post("/user/new", (req: Request, res: Response) => {
        UserController.insert(req, res);
    })

};

export default userRoute;