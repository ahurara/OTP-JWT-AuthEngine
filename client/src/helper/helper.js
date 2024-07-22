import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
import jwt_decode from "jwt-decode";

// Make Api request

//to get username from token
export async function getUsername(){
    const token =localStorage.getItem('token');
    if(!token) return Promise.reject("Could'nt find the token")
        let decode = jwt_decode(token);
      return decode;

}

//Authenticate function
export async function Authenticate(username){

    try {
        return await axios.post('/api/authenticate', {username})
        
    } catch (error) {
        return {error :'Username doesnt exist'}
    }
}


//get user details
export async function getUser({username}){
    try {
        const {data} =await axios.get(`/api/user/${username}`)
        return {data};
    } catch (error) {
        return {erro : "password does'nt match"}
    }

}

export async function registerUser(credentials) {
    try {
      console.log('Sending credentials:', credentials); // Log the credentials being sent
      const response = await axios.post('/api/register', credentials);
      const { msg, status } = response.data;
      console.log('Registration response:', response.data); // Log the response
  
      let { username, email } = credentials;
  
      // send email
      if (status === 201) {
        const emailResponse = await axios.post('/api/registerMail', { username, userEmail: email, text: msg });
        console.log('Email response:', emailResponse.data); // Log the email response
      }
  
      return msg; // Return the message for success
  
    } catch (error) {
      console.error("API error:", error.response || error.message); // Log the error
      return Promise.reject(error.response?.data?.message || error.message); // More detailed error handling
    }
  }
//login function

export async function verifyPassword({username, password}){
    try {
        if(username){
          const {data} =  await axios.post(`/api/login` , {username , password})
          return Promise.resolve({data})
        }
    } catch (error) {
        return Promise.reject({error: 'Password does not match'})
    }
}

//update user profile function
export async function updateUser(response) {
    try {
      const token = await localStorage.getItem('token');
      const data = await axios.put('/api/updateUser', response, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return Promise.resolve({ data });
    } catch (error) {
      return Promise.reject({ error: "Couldn't update the user profile" });
    }
  }
  


//generate OTP
export async function generateOTP(username){
    try {
      const {data :{code} , status } =  await axios.get('/api/generateOTP', {params :{username}})
      //send mail with the OTP
      if(status == 201)
      {
       let {data :{email}} =await getUser({username});
       let text = `Your password recovery code is ${code}. Verify and recover password`;
       await axios.post(`/api/registerMail`,{username , userEmail :email ,text , subject :'Password Recovery OTP'})

      }
      return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error})
    }

}

//verify OTP
export async function verifyOTP({username ,code}){
    try {
        const {data , status}=await axios.get(`/api/verifyOTP`, {params :{username ,code}});
        return {data,status};
    } catch (error) {
       return Promise.reject(error)
    }
}

//reset Password 
export async function resetPassword({username , password}){
    try {
        const {data, status} = await axios.put(`/api/resetPassword` , {username , password});
        return Promise.resolve({data,status});
    } catch (error) {
        return Promise.reject(error)
    }

}