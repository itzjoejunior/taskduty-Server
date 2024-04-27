
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

// Registration

const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(400)
        .json({
          success: false,
          message: "all fields are required to register",
        });
      return;
    }
    const registeration = await userModel.create({ ...req.body });
    res
      .status(201)
      .json({
        success: true,
        message: "registered successfully",
        registeration,
      });
  } catch (error) {
    // if ((error.code = 11000)) {
    //   res.status(400)
    //     .json({ success: false, message: "Email already exists." });
    //   return;
    // }
    res.status(500).json({ error });
    console.log(error.message);
  }
};

// Login Function

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "please provide email and password" });
      return;
    }

    // finding a reg email and validating the email

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "Wrong credentials" });
      return;
    }

    // comparing password and validating the password

    const auth = await user.comparePassword(password);
    if (!auth) {
      res.status(400).json({ success: false, message: "Wrong credentials" });
      return;
    }

    // token

    const token = await user.generateToken();
    console.log(token);
    if (token) {
      res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
        },
        success: true,
        message: "logged in sucessfully",
        token,
      });
      return;
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//isLoggedin ftn

const isLoggedin = (req,res) => {
  try {
    const aurthHeader = req.headers.authorization
    const token = aurthHeader.split(" ")[1];
    if(!token){
      return res.json(false)
    }
    jwt.verify(token, process.env.JWT_SECRETE);
    res.json(true)

  } catch (error) {
    res.json(false)
    console.log(error.message);
    
  }
}

module.exports = {
  registration,
  login,
  isLoggedin
};
