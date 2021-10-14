import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swagger from '../api/violence/violence.json';
import violenceRoute from './../api/violence/routes';
import userRoute from '../api/user/routes';

const register = ( app: Application) => {

    app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swagger));

    violenceRoute(app);
    userRoute(app);
}

export default register;