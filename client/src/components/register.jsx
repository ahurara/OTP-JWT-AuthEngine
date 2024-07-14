import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from  '../assets/avatar.png';
import styles from  '../styles/Username.module.css';
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";


const Register= () => {

    const [file , setFile] = useState();

    const formik = useFormik({
        initialValues :{
           email:'',
           username:'',
            password :''
        },
        validate:registerValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async value =>{
            value = await Object.assign(value, {profile : file || ''})
            console.log(value)}
    })

    // formik doesnt suport file upload so we need to create this handler
    const onUpload = async e =>{
        const base64 =await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

  return (
    <>
      <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="my-20 flex justify-center items-center h-screen">
          <div className={styles.glass} style={{width:'45%'}}>

            <div className="title flex flex-col items-center">
                <h1 className=" text-5xl font-bold">Register</h1>
                <span className="py-2  text-xl w-2/3 text-center text-gray-500">Happy to join you.</span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex  justify-center py-4">
            <label htmlFor="profile">
            <img className={styles.profile_img} src={file || avatar} alt="Avatar" />
            </label>
           <input onChange={onUpload} type="file" id="profile" name="profile"></input>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
                <input className={styles.textbox} {...formik.getFieldProps('emsil')} type="text"  placeholder="email*"/>
                <input className={styles.textbox} {...formik.getFieldProps('username')} type="text"  placeholder="username*"/>
                <input className={styles.textbox} {...formik.getFieldProps('password')} type="text"  placeholder="Password*"/>
                
                <button className={styles.btn} type="submit"> Register</button>
            </div>

            <div className="text-center py-4">
                <span className="text-gray-500">Already register? <Link className="text-red-500" to="/">Login now</Link></span>
            </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;