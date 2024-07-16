import jwt from "jsonwebtoken";
import ENV from '../config.js'

//auth middleware
export async function Auth(req, res, next){
    try {

        //access authorize header to validate request
        const token =req.headers.authorization.split(' ')[1]
        // res.json(token);

        //retrieve the details for the logged in users
        const decodedToken =await jwt.verify(token, ENV.JWT_SECRET);
        req.user =decodedToken;
        next()
        
    } catch (error) {
        return res.status().json({error : "Authentication failed"})
    }
}


export function localVariables(req,res,next){
    req.app.locals = {
        OTP:null,
        resetSession:false
    }
    next();

}