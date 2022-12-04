"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const joiValidation_1 = require("../Validation/JoiValidation/joiValidation");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.route('/').post(joiValidation_1.userRegistration, userController_1.registerUser);
//admin only get all user details
exports.userRoutes.route('/all').get(auth_1.auth, (0, auth_1.authorizeRoles)("Admin"), userController_1.allUsers);
//admin and authenticated user get particular user details
exports.userRoutes.route('/single/:id').get(auth_1.auth, (0, auth_1.authorizeRoles)("Admin", "User"), userController_1.singleUser);
//authenticated user update his details
exports.userRoutes.route('/update/:id').put(auth_1.auth, (0, auth_1.authorizeRoles)("User"), userController_1.updateUser);
//admin and authenticated user delete particular user account
exports.userRoutes.route('/delete/:id').delete(auth_1.auth, (0, auth_1.authorizeRoles)("User"), userController_1.deleteUser);
//authenticated user update his any field
exports.userRoutes.route('/patch').patch(auth_1.auth, (0, auth_1.authorizeRoles)("User"), userController_1.patchUpdateUser);
//login
exports.userRoutes.route('/login').post(joiValidation_1.userLogin, userController_1.login);
//logout
exports.userRoutes.route('/logout').get(auth_1.auth, userController_1.logout);
//only authenticated user access the this page
exports.userRoutes.route('/auth').get(auth_1.auth, userController_1.authCheck);
exports.default = exports.userRoutes;
