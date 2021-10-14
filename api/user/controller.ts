import { Request, Response} from 'express';
import { compare, hash, genSalt } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from './model';

const UserController = {

    async insert(req: Request, res: Response){
        const { username, password, role} = req.body;
        const saltRounds = 10;
        try {
            const searchInDb = await User.findOne({username: username.toLowerCase()});

            if(searchInDb)
                res.status(403).json('Username already taken');


            genSalt(saltRounds, (errorSalt, salt) => {
                if(errorSalt)
                    res.status(400).json('error in salt generation');

                hash(password, salt, async (errorHash, hashPassword) => {
                    if(errorHash)
                        res.status(400).json('error in hashing password');

                    const document = await User.create({username: username.toLowerCase(), password: hashPassword, role});
                    delete document.password;
                    res.status(200).send({success: true, insertedDocument: document});
                });
            });
        } catch (error) {
            res.status(400).send({ success: false, error });
        }
    },

    async authenticate(req: Request, res: Response) {
        const SECRET_KEY = process.env.SECRET_KEY;
        const { password, username } = req.body;

        try {
            const foundUser: any = await User.findOne({username: username.toLowerCase() });

            if(foundUser.length > 0){
                res.status(400).send({success: false, error: "User not found"});
            }


            compare(password, foundUser.password, (err, response) => {
                if(err)
                    res.status(400).send({error: "Invalid Password"});

                if(response) {
                    delete foundUser.password;

                    const expireIn = 24*60*60;
                    const token = sign({
                        user: foundUser
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                    res.header('Authorization', 'Bearer ' + token).status(200).send({ success: true, user: foundUser});
                }
            })
            
        } catch (error) {
            res.status(400).send({success: false, error});
        }
    }
}

export default UserController;