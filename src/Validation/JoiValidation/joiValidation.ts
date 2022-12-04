import { NextFunction, Request, Response } from 'express';

import {
	userLoginSchema,
	userRegistrationSchema,
} from '../JoiSchema/joiSchema';

export const userRegistration = (req: Request, res: Response, next: NextFunction) => {

    const body = req.body;

    const { error, value } = userRegistrationSchema.validate(body);
    if (error) {
        res.status(401).send({ error: error.details[0].message })
        console.log(error.details[0].message)
    }
    next();


}

export const userLogin = (req: Request, res: Response, next: NextFunction) => {

    const body = req.body;

    const { error, value } = userLoginSchema.validate(body);

    if (error) {
        res.status(400).send({ error: error.details[0].message })
        console.log(error.details[0].message)
    }
    next();
}

module.exports = {
    userRegistration,
    userLogin
}