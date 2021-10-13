import { Application, Request, Response} from 'express';
import ViolenceController from './controller';

const violenceRoute = (app: Application) => {

    app.post("/violences/post", (req: Request, res: Response) => {
        ViolenceController.insert(req, res);
    });

    app.get("/violences/get", (req: Request, res: Response) => {
        ViolenceController.getAll(req, res);
    });

    app.get("/violences/getBy", (req: Request, res: Response) => {
        ViolenceController.getBy(req, res);
    });

};

export default violenceRoute;