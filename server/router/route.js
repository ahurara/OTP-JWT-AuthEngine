import { Router } from "express";
const router = Router();

//import all controller
import * as controller from '../controller/appController.js'
import { Auth, localVariables } from "../middleware/auth.js";
import { registerMail } from "../controller/mailer.js";

//POST methods

//register User
router.route('/register').post(controller.register)

//send the mail
router.route('/registerMail').post(registerMail)

//authenticate the users
router.route('/authenticate').post(controller.verifyUser,(req, res)=>{res.end()})

//login to the app
router.route('/login').post(controller.verifyUser,controller.login)


//GET methods

//user with username
router.route('/user/:username').get(controller.getUser)

//generate random OTP
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP)

// verify generated OTP
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP)

//reset all the variables
router.route('/createResetSession').get(controller.createResetSession)


//PUT methods

//to update the user profile
router.route('/updateUser').put(Auth,controller.updateUser)

//to reset password
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword)



export default router;
