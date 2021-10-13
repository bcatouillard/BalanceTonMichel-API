import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swagger from '../api/violence/violence.json';
import violenceRoute from './../api/violence/routes';

const register = ( app: Application) => {

    app.use("/", swaggerUi.serve, swaggerUi.setup(swagger));

    violenceRoute(app);
}

export default register;