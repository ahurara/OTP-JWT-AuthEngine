import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVR_DOMAIN;

// Make Api request


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

//register user function
export async function registerUser(credentials){
    try {

      const {data :{msg} ,status} =  await axios.post(`/api/register` , credentials)
      let {username , email} = credentials;

      //send email
      if(status == 201)
      {
        await axios.post(`/api/registerMail` , {username , userEmail :email , text :msg})
      }
      Promise.resolve(msg)
        
    } catch (error) {
        return Promise.reject({error});
        
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
export async function updateUser(response){
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put(`/api/updateUser`, response , {header :{'Authorization' : `Bearer ${token}`}})
        return Promise.resolve({data});
    } catch (error) {
        Promise.reject({error:"COuldnt update the user profile"})
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