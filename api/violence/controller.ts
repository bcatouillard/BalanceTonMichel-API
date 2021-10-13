import { Request, Response} from 'express';
import { Violence, QueryFields } from './model';

const ViolenceController = {

    /**
     * Insert in Database
     * @param req Request from Frontend
     * @param res Response with success and data
     */
    async insert(req: Request, res: Response){
        const violence = req.body;
        try {
            const document = await Violence.create(violence);
            res.status(200).send({success: true, insertedDocument: document});
        } catch (error) {
            res.status(400).send({ success: false, error });
        }
    },

    /**
     * Get All Data in Database
     * @param req Request from Frontend
     * @param res Response with success and data
     */
    async getAll(req: Request, res: Response) {
        try {
            const allViolences = await Violence.find();
            res.status(200).send({ success: true, data: allViolences });
        } catch (error) {
            res.status(400).send({ success: false, error });
        }
    },

    /**
     * Get Data using filters in URL
     * @param req Request from Frontend
     * @param res Response with success and data
     */
    async getBy(req: Request, res: Response) {
        const { city, country, gender , startDate, endDate, type } = req.query;
        try {
            const requiredFields: QueryFields = {};

            if(city) requiredFields.city = city.toString();

            if(country) requiredFields.country = country.toString();

            if(gender) requiredFields.gender = gender.toString();

            if(startDate && endDate) {
                const startDateIntoDate = new Date(startDate.toString());
                const endDateIntoDate = new Date(endDate.toString());
                requiredFields.time = { $gte: startDateIntoDate, $lte: endDateIntoDate }
            }

            if(type) requiredFields.type = type.toString();

            const filteredViolences = await Violence.find(requiredFields);
            res.status(200).send({ success: true, data: filteredViolences });

        } catch (error) {
            res.status(400).send({ success: false, error });
        }
    }
}

export default ViolenceController;