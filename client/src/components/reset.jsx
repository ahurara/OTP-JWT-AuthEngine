import React from "react";
import { Link } from "react-router-dom";
import avatar from  '../assets/avatar.png';
import styles from  '../styles/Username.module.css';
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/validate";


const Reset= () => {

    const formik = useFormik({
        initialValues :{
            password :'',
            confirmPwd :''
        },
        validate:resetPasswordValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async value =>{ console.log(value)}
    })
  return (
    <>
      <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className=" flex justify-center items-center h-screen">
          <div className={styles.glass}>

            <div className="title flex flex-col items-center">
                <h1 className=" text-5xl font-bold">Reset</h1>
                <span className="py-2  text-xl w-2/3 text-center text-gray-500">Enter new password</span>
            </div>

            <form className="py-20" onSubmit={formik.handleSubmit}>
           

            <div className="textbox flex flex-col items-center gap-6">
                <input className={styles.textbox} {...formik.getFieldProps('password')} type="text"  placeholder="New Password"/>
                <input className={styles.textbox} {...formik.getFieldProps('confirmPwd')} type="text"  placeholder="Repeat Password"/>
               
                <button className={styles.btn} type="submit"> Sign in</button>
            </div>

         

            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
