import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator";

//middleware to verify the user
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;
    //check the user existence
    const exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "User not found" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

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
  try {
    const { username, password, profile, email } = req.body;

    // Check the existing user
    const existUsername = UserModel.findOne({ username }).exec();
    const existEmail = UserModel.findOne({ email }).exec();

    const [userWithUsername, userWithEmail] = await Promise.all([
      existUsername,
      existEmail,
    ]);

    if (userWithUsername) {
      return res.status(400).send({ error: "Please use a unique username" });
    }

    if (userWithEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    // Hash the password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || "",
        email,
      });

      // Save user to the database
      const savedUser = await user.save();
      return res.status(201).send({ msg: "User registered successfully" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

/** POST : https://localhost:8000/api/login
 * @param :{
 * username :"example123",
 * password: "admin123",
 }

 */
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordChecked = await bcrypt.compare(password, user.password);

    if (!passwordChecked) {
      return res.status(400).send("Password does not match");
    }

    // Create jwt token
    // First argument: payload, second argument: secret key, third argument: options (expiry date)
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      ENV.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).send({
      msg: "Login successfully",
      username: user.username,
      token,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

/** GET : https://localhost:8000/getUser/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(400).send({ error: "Invalid username" });
    }

    const userDetail = await UserModel.findOne({ username }).exec();

    if (!userDetail) {
      return res.status(404).send({ error: "User not found" });
    }

    //creates a new object rest that contains all properties of userDetail except for password
    const { password, ...rest } = Object.assign({}, userDetail.toJSON());

    return res.status(200).send(rest);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
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
  try {
    // const id = req.query.id;
    const {userId} = req.user;
    if (!userId) {
      return res.status(401).send({ error: "User not found" });
    }

    const body = req.body;

    // Update the data
    const updatedUser = await UserModel.updateOne({ _id: userId }, body);

    if (updatedUser.nModified === 0) {
      return res.status(404).send({ error: "User not found or no changes made" });
    }

    return res.status(200).send({ msg: "User updated successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

/** GET : https://localhost:8000/getUser/generateOTP */
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false, specialChars:false})
  res.status(201).send({code :req.app.locals.OTP})
}

/** GET : https://localhost:8000/getUser/verifyOTP */
export async function verifyOTP(req, res) {
  const {code} = req.query;
  if(parseInt(req.app.locals.OTP) === parseInt(code))
  {
    req.app.locals.OTP=null; //reset the OTP value
    req.app.locals.resetSession=true; //start session for reset password
    return res.status(200).send({ message: 'OTP verified successfully' });
  }
  return res.status(400).send({Error : 'Invalid OTP'})

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
