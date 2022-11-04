const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET =
  "dkhujfkvncmkjdierjf<V/mvfp203-2-0@#$%nvmcdoeskkfroklsdkfjkkfjh";

module.exports = {
  userAuth: async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).lean();

    if (!user) {
      return res.json({ status: "error", error: "Invalid username/password!" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET
      );
      return res.json({ status: "ok", data: token });
    }

    res.json({ status: "error", error: "Invalid username/password!" });
  },

  userRegist: async (req, res) => {
    console.log(req.body);

    const { username, password: plainTextPassword } = req.body;

    if (!username || typeof username !== "string") {
      return res.json({ status: "error", error: "Invalid username!" });
    }

    if (plainTextPassword.length < 8) {
      return res.json({
        status: "error",
        error: "Your password should be contain at least 8 characters!",
      });
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
      const newUser = await User.create({
        username,
        password,
      });
      console.log("User created successfully: ", newUser);
    } catch (error) {
      if (error.code === 11000) {
        return res.json({
          status: "error",
          error: "This username not available!",
        });
      }
      throw error;
    }

    res.json({ status: "ok" });
  },
};
