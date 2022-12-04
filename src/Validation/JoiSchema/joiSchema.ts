import Joi from 'Joi';

import { LoginTypes, RegisterTypes } from '../ValidationTypes/validationTypes';

export const userRegistrationSchema = Joi.object<RegisterTypes>({
    firstName: Joi.string(),
    lastName: Joi.string(),
    //  fullNames:firstName.concat(lastName),
    fullName: Joi.string().min(5),
    dob: Joi.date().required(),
    age: Joi.number().integer().required(),
    gender: Joi.string().required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'in'],
            },
        })
        .required(),
    pno: Joi.number().min(10).required(),

    password: Joi.string().min(8).max(30).required(),
    confirmPassword: Joi.ref('password'),
    role: Joi.string().valid('Admin', 'User'),
})
    .xor('fullName', 'firstName') //enter fullName or firstName
    .and('firstName', 'lastName'); //enter fistName  and lastName must filled

export const userLoginSchema = Joi.object<LoginTypes>({
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'in'],
            },
        })
        .required(),
});

module.exports = {
    userRegistrationSchema,
    userLoginSchema,
};
