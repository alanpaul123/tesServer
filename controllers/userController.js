const users = require("../models/userModel");

const jwt = require("jsonwebtoken");
// Register
exports.registerController = async (req, res) => {
  console.log("Inside register Funtion");
  const { username, email, password, firstName, lastName, number } = req.body;
  //   console.log(id, email, password);
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("Account aldready exists!! Please login....");
    } else {
      // add /register new :create object for your model
      const newUser = new users({
        username,
        email,
        password,
        firstName: firstName ? firstName : "",
        lastName: lastName ? lastName : "",
        number: number ? number : 0,
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// Login
exports.loginController = async (req, res) => {
  console.log("Inside Login function");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      // token generate

      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_PASSWORD
      );
      res.status(200).json({
        user: existingUser,
        token,
      });
    } else {
      res.status(404).json("Invalid Email / Password...");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
