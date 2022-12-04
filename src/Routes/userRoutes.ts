import express from 'express';

import {
	allUsers,
	authCheck,
	deleteUser,
	login,
	logout,
	patchUpdateUser,
	registerUser,
	singleUser,
	updateUser,
} from '../controller/userController';
import { auth, authorizeRoles } from '../middleware/auth';
import {
	userLogin,
	userRegistration,
} from '../Validation/JoiValidation/joiValidation';

export const userRoutes = express.Router();


userRoutes.route('/').post(userRegistration, registerUser);

//admin only get all user details
userRoutes.route('/all').get(auth, authorizeRoles("Admin"), allUsers);

//admin and authenticated user get particular user details
userRoutes.route('/single/:id').get(auth, authorizeRoles("Admin", "User"), singleUser);

//authenticated user update his details
userRoutes.route('/update/:id').put(auth,authorizeRoles("User"), updateUser)

//admin and authenticated user delete particular user account
userRoutes.route('/delete/:id').delete(auth,authorizeRoles("User"),deleteUser);

//authenticated user update his any field
userRoutes.route('/patch').patch(auth,authorizeRoles("User"), patchUpdateUser);

//login
userRoutes.route('/login').post(userLogin, login);

//logout
userRoutes.route('/logout').get(auth, logout);


//only authenticated user access the this page
userRoutes.route('/auth').get(auth, authCheck);





export default userRoutes;