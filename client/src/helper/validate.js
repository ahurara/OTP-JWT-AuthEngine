import toast from "react-hot-toast";
import { UserName } from "../components";
import { Authenticate } from "./helper";

//validate login page username
export async function usernameValidate(values){
    const error = usernameVerify({},values)

    if(values.username)
    {
        //check if user exist
        const {status} = await Authenticate(values.username);

        if(status != 200){
            error.exist= toast.error("User does not exist")
        }
    }

    return error;
}

//validate password
export async function passwordValidate(values){
    const error = passwordVerify({},values)

    return error;
}

// validate username
function usernameVerify(error=[] ,values){
    if(!values.username){
        error.username=toast.error("Username required ..!")
    }else if (values.username.includes(" ")){
        error.username=toast.error("Invalid Username")
    }

    return error;
}

// validate password
function passwordVerify(error=[] ,values){
    if(!values.password){
        error.password=toast.error("password required ..!")
    }else if (values.password.includes(" ")){
        error.password=toast.error("Invalid password")
    }else if (values.password.length <4 ){
        error.password=toast.error("Password must be more than 4 character")
    }

    return error;
}

// validate email
function emailVerify(error = [], values) {
    if (!values.email) {
        error.email = toast.error("Email required...!");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(values.email)) {
        error.email = toast.error("Invalid Email address");
    }

    return error;
}



// validate Reset password
export async function resetPasswordValidation(values){
    const error = passwordVerify({},values)

    if(values.password !== values.confirmPwd){
        error.exist=toast.error("Password not matched..!")
    }
    return error;
}

//validate register component

export async function registerValidation(values){
    const error = usernameVerify([],values  );
    passwordVerify(error ,values);
    emailVerify(error ,values);
    return error;


}

//validate profile page

export async function profileValidate(values){
    const error = emailVerify([],values);
    return error;

}