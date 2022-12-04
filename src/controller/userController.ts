import express, { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';

import { JWT_SCRETKEY, TOKEN_EXPIRE } from '../config/config';
import User from '../models/userModel';

const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

//registration
export const registerUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const {
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
            role,
        } = req.body;

        const userEmail = await User.findOne({
            where: {
                email: email,
            },
        });

        if (userEmail == null) {
            if (((firstName && lastName) || fullName) && dob && age && gender && email && pno && password && confirmPassword) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const hashedConfirmPassword = await bcrypt.hash(
                    confirmPassword,
                    10,
                );

                if (password === confirmPassword) {
                    var user = await User.create({
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
                } else {
                    res.status(400).send({
                        message: "Password And ConfirmPassword Doesn't Match",
                    });
                }
            } else {
                res.status(400).send({ message: 'All Fields All Required' });
            }
        } else {
            res.status(400).send({ message: 'Email Already Exist' });
        }
    } catch (error) {
        console.log(error);
    }
};

//get all users details
export const allUsers: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let users;
    try {
        users = await User.findAll({});

        res.status(200).json({
            users: users,
        });
    } catch (error) {
        console.log(error);
    }
};

//get particular user detail
export const singleUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let user;

    try {
        user = await User.findOne({
            where: { id: req.params.id },
        });

        res.status(200).json({
            user: user,
        });
    } catch (error) {
        console.log(error);
    }
};

//update particular user details
export const updateUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let user;
    const {
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
    } = req.body;

    try {
        user = await User.update(
            {
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
            },
            {
                where: { id: req.params.id },
            },
        );

        //  await user.save();

        res.status(200).send({
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

//update particular fields from user details
export const patchUpdateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let user;
    const {
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
    } = req.body;

    try {
        user = await User.update(
            {
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
            },
            {
                where: { id: req.params.id },
            },
        );

        res.status(200).send({
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

//delete particular user account
export const deleteUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let user;
    try {
        user = await User.destroy({
            where: { id: req.params.id },
        });

        res.status(200).send({
            message: 'user deleted',
        });
    } catch (error) {
        console.log(error);
    }
};

//login
export const login: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (email && password) {
            const user = await User.findOne({
                where: { email },
            });

            if (user != null) {
                const passwordMatched = await bcrypt.compare(
                    password,
                    user.password,
                );

                //token

                const token = jsonWebToken.sign({ userId: user.id}, JWT_SCRETKEY, {
                    expiresIn: TOKEN_EXPIRE,
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
                        userId:user.id,
                    firstName: user.firstName,
                    lastName:user.lastName,
                    fullName:user.fullName,
                    email:user.email,
                    phone:user.pno,
                    dob:user.dob,
                    age:user.age,
                    gender:user.gender,
                    role:user.role
                    });
                }
            } else {
                res.status(400).send({ message: 'You Are NOt A Register User' });
            }
        } else {
            res.status(400).send({ message: 'All Fields All Required' });
        }
    } catch (error) {
        console.log(error);
    }
};

//logout
export const logout: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        res.cookie('jwt', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: 'Logged Out',
        });
    } catch (error) {
        console.log(error);
    }
};

export const authCheck: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.send('you are authenticated');
};

module.exports = {
    registerUser,
    allUsers,
    singleUser,
    updateUser,
    patchUpdateUser,
    deleteUser,
    login,
    logout,
    authCheck,
};
