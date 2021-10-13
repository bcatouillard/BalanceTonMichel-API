import { Application } from 'express';
import violenceRoute from './../api/violence/routes';

const register = ( app: Application) => {
    violenceRoute(app);
}

export default register;