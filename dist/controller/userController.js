"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = exports.logout = exports.login = exports.deleteUser = exports.patchUpdateUser = exports.updateUser = exports.singleUser = exports.allUsers = exports.registerUser = void 0;
const config_1 = require("../config/config");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
//registration
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, fullName, dob, age, gender, email, pno, password, confirmPassword, role, } = req.body;
        const userEmail = yield userModel_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (userEmail == null) {
            if (((firstName && lastName) || fullName) && dob && age && gender && email && pno && password && confirmPassword) {
                const hashedPassword = yield bcrypt.hash(password, 10);
                const hashedConfirmPassword = yield bcrypt.hash(confirmPassword, 10);
                if (password === confirmPassword) {
                    var user = yield userModel_1.default.create({
                        firstName,
                        lastName,
                        fullName,
                        dob,
                        age,
                        gender,
                        email,
                        pno,
                        password: hashedPassword,
                        confirmPassword: hashedConfirmPassword,
                        role,
                    });
                    res.status(201).send({
                        user,
                        message: 'user created',
                    });
                }
                else {
                    res.status(400).send({
                        message: "Password And ConfirmPassword Doesn't Match",
                    });
                }
            }
            else {
                res.status(400).send({ message: 'All Fields All Required' });
            }
        }
        else {
            res.status(400).send({ message: 'Email Already Exist' });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerUser = registerUser;
//get all users details
const allUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield userModel_1.default.findAll({});
        res.status(200).json({
            users: users,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.allUsers = allUsers;
//get particular user detail
const singleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    try {
        user = yield userModel_1.default.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json({
            user: user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.singleUser = singleUser;
//update particular user details
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    const { firstName, lastName, fullName, dob, age, gender, email, pno, password, confirmPassword, } = req.body;
    try {
        user = yield userModel_1.default.update({
            firstName,
            lastName,
            fullName,
            dob,
            age,
            gender,
            email,
            pno,
            password,
            confirmPassword,
        }, {
            where: { id: req.params.id },
        });
        //  await user.save();
        res.status(200).send({
            user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
//update particular fields from user details
const patchUpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    const { firstName, lastName, fullName, dob, age, gender, email, pno, password, confirmPassword, } = req.body;
    try {
        user = yield userModel_1.default.update({
            firstName,
            lastName,
            fullName,
            dob,
            age,
            gender,
            email,
            pno,
            password,
            confirmPassword,
        }, {
            where: { id: req.params.id },
        });
        res.status(200).send({
            user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.patchUpdateUser = patchUpdateUser;
//delete particular user account
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    try {
        user = yield userModel_1.default.destroy({
            where: { id: req.params.id },
        });
        res.status(200).send({
            message: 'user deleted',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
//login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email && password) {
            const user = yield userModel_1.default.findOne({
                where: { email },
            });
            if (user != null) {
                const passwordMatched = yield bcrypt.compare(password, user.password);
                //token
                const token = jsonWebToken.sign({ userId: user.id }, config_1.JWT_SCRETKEY, {
                    expiresIn: config_1.TOKEN_EXPIRE,
                });
                // token saved in cookie
                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 60000),
                    httpOnly: true,
                });
                if (user.email === email && passwordMatched) {
                    res.status(200).send({
                        message: 'Login successfully',
                        token,
                        userId: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: user.fullName,
                        email: user.email,
                        phone: user.pno,
                        dob: user.dob,
                        age: user.age,
                        gender: user.gender,
                        role: user.role
                    });
                }
            }
            else {
                res.status(400).send({ message: 'You Are NOt A Register User' });
            }
        }
        else {
            res.status(400).send({ message: 'All Fields All Required' });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
//logout
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('jwt', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: 'Logged Out',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.logout = logout;
const authCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('you are authenticated');
});
exports.authCheck = authCheck;
module.exports = {
    registerUser: exports.registerUser,
    allUsers: exports.allUsers,
    singleUser: exports.singleUser,
    updateUser: exports.updateUser,
    patchUpdateUser: exports.patchUpdateUser,
    deleteUser: exports.deleteUser,
    login: exports.login,
    logout: exports.logout,
    authCheck: exports.authCheck,
};
