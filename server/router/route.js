import { Router } from "express";
const router = Router();

//import all controller
import * as controller from '../controller/appController.js'


//POST methods

//register User
router.route('/register').post(controller.register)

//send the mail
router.route('/registerMail').post((req, res)=>{ res.json('register route')})

//authenticate the users
router.route('/authenticate').post((req, res)=>{res.json('register route')})

//login to the app
router.route('/login').post(controller.login)


//GET methods

//user with username
router.route('/user/:username').get(controller.getUser)

//generate random OTP
router.route('/generateOTP').get(controller.generateOTP)

// verify generated OTP
router.route('/verifyOTP').get(controller.verifyOTP)

//reset all the variables
router.route('/createResetSession').get(controller.createResetSession)


//PUT methods

//to update the user profile
router.route('/updateUser').put()

//to reset password
router.route('/resetPassword').put()



export default router;
