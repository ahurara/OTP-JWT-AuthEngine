import React from "react";
import { Link } from "react-router-dom";
import avatar from  '../assets/avatar.png';
import styles from  '../styles/Username.module.css';
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";

const UserName = () => {

    const formik = useFormik({
        initialValues :{
            username :''
        },
        validate:usernameValidate,
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
                <h1 className=" text-5xl font-bold">Hello Again.!</h1>
                <span className="py-2  text-xl w-2/3 text-center text-gray-500">Explore moe by connecting with us</span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex  justify-center py-4">
            <img className={styles.profile_img} src={avatar} alt="Avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
                <input className={styles.textbox} {...formik.getFieldProps('username')} type="text"  placeholder="Username"/>
                <button className={styles.btn} type="submit"> Let's go</button>
            </div>

            <div className="text-center py-4">
                <span className="text-gray-500">Not a member <Link className="text-red-500" to="/register">Register Now</Link></span>
            </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserName;
