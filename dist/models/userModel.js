"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const { Sequelize, DataTypes, Model } = require('sequelize');
const db_1 = __importDefault(require("../connection/db"));
class User extends Model {
}
exports.User = User;
User.init({
    firstName: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //     notNull: {
        //         msg: 'Please enter your name',
        //     },
        // },
    },
    lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
    },
    fullName: {
        type: DataTypes.STRING
    },
    dob: {
        type: DataTypes.DATEONLY
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your Age',
            },
        },
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your Gender',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { args: true, msg: 'email format is not correct' },
            notNull: { args: true, msg: "email can't be empty" },
            notEmpty: { args: true, msg: "email can't be empty string" },
        },
    },
    pno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
            len: [10],
            isNumeric: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { args: true, message: "password can't be empty" },
            len: [8, 1000],
        },
    },
    confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { args: true, message: "password can't be empty" },
            len: [8, 1000],
        },
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'User',
    },
}, {
    // Other model options go here
    tableName: 'users',
    sequelize: db_1.default, // We need to pass the connection instance
});
// `sequelize.define` also returns the model
console.log(User === db_1.default.models.User); // true
exports.default = User;
