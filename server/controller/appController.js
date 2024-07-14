/** POST : https://localhost:8000/api/register
 * @param :{
 * username :"example123",
 * password: "admin123",
 * email: "example@gmail.com",
 * firstName: "champ",
 * lastName: "champion",
 * mobile: "00000000000",
 * address: "Apt.50 , kulas light , greenbrough",
 * profile: "",
 * }
 
 */
export async function register(req, res) {
  res.json("register route");
}

/** POST : https://localhost:8000/api/login
 * @param :{
 * username :"example123",
 * password: "admin123",
 }

 */
export async function login(req, res) {
  res.json("login route");
}

 /** GET : https://localhost:8000/getUser/example123 */
export async function getUser(req, res) {
  res.json("getUser route");
}

/** PUT : https://localhost:8000/api/register
 * @param :{
 *      id : 'userId'
 * }
 * body :{
 *      firstName :"",
 *      address:"",
 *      profile: "",
 * }
 
 */
export async function updateUser(req, res) {
  res.json("updateUser route");
}


 /** GET : https://localhost:8000/getUser/generateOTP */
export async function generateOTP(req, res) {
    res.json("generateOTP route");
  }


  /** GET : https://localhost:8000/getUser/verifyOTP */
export async function verifyOTP(req, res) {
    res.json("verifyOTP route");
  }


  //redirect user when OTP is valid
/** GET : https://localhost:8000/getUser/createResetSession*/
export async function createResetSession(req, res) {
    res.json("createResetSession route");
  }

  //update the password when we have a valid session
  /** PUT : https://localhost:8000/getUser/resetPassword*/
export async function resetPassword(req, res) {
    res.json("resetPassword route");
  }
  
  
