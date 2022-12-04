"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userRegistrationSchema = void 0;
const Joi_1 = __importDefault(require("Joi"));
exports.userRegistrationSchema = Joi_1.default.object({
    firstName: Joi_1.default.string(),
    lastName: Joi_1.default.string(),
    //  fullNames:firstName.concat(lastName),
    fullName: Joi_1.default.string().min(5),
    dob: Joi_1.default.date().required(),
    age: Joi_1.default.number().integer().required(),
    gender: Joi_1.default.string().required(),
    email: Joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'in'],
        },
    })
        .required(),
    pno: Joi_1.default.number().min(10).required(),
    password: Joi_1.default.string().min(8).max(30).required(),
    confirmPassword: Joi_1.default.ref('password'),
    role: Joi_1.default.string().valid('Admin', 'User'),
})
    .xor('fullName', 'firstName') //enter fullName or firstName
    .and('firstName', 'lastName'); //enter fistName  and lastName must filled
exports.userLoginSchema = Joi_1.default.object({
    password: Joi_1.default.string().min(8).max(30).required(),
    email: Joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'in'],
        },
    })
        .required(),
});
module.exports = {
    userRegistrationSchema: exports.userRegistrationSchema,
    userLoginSchema: exports.userLoginSchema,
};
