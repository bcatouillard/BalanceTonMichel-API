import express from 'express';
import helmet from 'helmet';
import csp from 'helmet-csp';
import express_enforces_ssl from 'express-enforces-ssl';
import cors from 'cors';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import register from './bin/routes';
import connectToDb  from './bin/connect';

dotenv.config();

const app = express();

app.use(urlencoded({
    extended: true
}));

app.use(json());
app.use(compression());
app.use(cors());
app.use(morgan(':method :url :status - :response-time ms'));

/**
 * Security Block
 */
app.use(helmet.hidePoweredBy());
app.use(csp({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ['data:'],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report-violation',
    }
}));
app.use(helmet.xssFilter());
if (process.env.NODE_ENV === "prod") {
    const sixtyDaysInSeconds = 5184000;
    app.use(express_enforces_ssl());
    app.use(helmet.hsts({maxAge: sixtyDaysInSeconds}));
}

app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});


connectToDb();

register(app);

export default app;