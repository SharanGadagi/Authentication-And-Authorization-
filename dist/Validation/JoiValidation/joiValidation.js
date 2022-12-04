"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegistration = void 0;
const joiSchema_1 = require("../JoiSchema/joiSchema");
const userRegistration = (req, res, next) => {
    const body = req.body;
    const { error, value } = joiSchema_1.userRegistrationSchema.validate(body);
    if (error) {
        res.status(401).send({ error: error.details[0].message });
        console.log(error.details[0].message);
    }
    next();
};
exports.userRegistration = userRegistration;
const userLogin = (req, res, next) => {
    const body = req.body;
    const { error, value } = joiSchema_1.userLoginSchema.validate(body);
    if (error) {
        res.status(400).send({ error: error.details[0].message });
        console.log(error.details[0].message);
    }
    next();
};
exports.userLogin = userLogin;
module.exports = {
    userRegistration: exports.userRegistration,
    userLogin: exports.userLogin
};
