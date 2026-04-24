const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const generateToken = (userId) => {
   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
   });
};

exports.register = async (req, res) => {
   try {
      const { email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ where: { email } });
      if (user) {
         return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      user = await User.create({
         email,
         password: hashedPassword,
      });

      const token = generateToken(user.id);

      res.status(201).json({
         token,
         user: {
            id: user.id,
            email: user.email,
         },
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
   }
};

exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;

      // Check user
      const user = await User.findOne({ where: { email } });
      if (!user) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user.id);

      res.json({
         token,
         user: {
            id: user.id,
            email: user.email,
         },
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
   }
};

exports.getMe = async (req, res) => {
   try {
      const user = await User.findByPk(req.user.id, {
         attributes: { exclude: ["password"] },
      });
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
   }
};
