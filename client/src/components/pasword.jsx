import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../helper/helper";

const Password = () => {
  const navigate = useNavigate();

  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  console.log(apiData);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log("Form submitted", value); // 
      
      
      try {
        let loginPromise = verifyPassword({ username, password: value.password });
        toast.promise(loginPromise, {
          loading: 'Checking...',
          success: <b>Login Successfully</b>,
          error: <b>Password not match</b>
        });
    
        const res = await loginPromise;
        let { token } = res.data;
        localStorage.setItem("token", token);
        
        navigate("/profile");
      } catch (error) {
        console.error("Error during login:", error);
        // Handle error if needed
      }
    }
    
  });

  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-600">{serverError.message}</h1>;

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className=" flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h1 className=" text-5xl font-bold">
                Hello {apiData?.firstname || apiData?.username}
              </h1>
              <span className="py-2  text-xl w-2/3 text-center text-gray-500">
                Explore moe by connecting with us
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex  justify-center py-4">
                <img
                  className={styles.profile_img}
                  src={apiData?.profile || avatar}
                  alt="Avatar"
                />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <input
                  className={styles.textbox}
                  {...formik.getFieldProps("password")}
                  type="text"
                  placeholder="Password"
                />
                <button className={styles.btn} type="submit">
                  {" "}
                  Sign in
                </button>
              </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Forgot Password?{" "}
                  <Link className="text-red-500" to="/recovery">
                    Recover Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
