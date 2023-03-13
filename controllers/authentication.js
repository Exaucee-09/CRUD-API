// const hash = require("../utils/hash");
// const Joi = require('joi');
// const bcrypt = require('bcrypt');
// const { User } = require("../model/user");
// const routes = require("express").Router();
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const lodash = require('lodash');
// const auth = require("./validateToken");
// require('dotenv').config();

// routes.post('/auth',auth, async (req, res) => {
//   try {
//     // Validate user input
//     const { error } = validation(req.body)
//     if (error) {
//       return res.send(error).status(400)
//     }

//     // Check if user with provided email exists
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Check if password is valid
//     const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Generate JWT token and send it in response
//     const token = jwt.sign({ email: user.email }, process.env.JWT);
//     res.set({
//       'Authorization': `Bearer ${token}`,
//       'Access-Control-Expose-Headers': 'Authorization'
//     }).status(200).json({ message: 'Successfully logged in.' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// });

// function validation(req) {
//   const schema = Joi.object({
//     email: Joi.string().max(100).min(3).email(),
//     password: Joi.string().max(50).min(3).required()
//   });
//   return schema.validate(req);
// }

// // routes.post("/auth",auth, async (req, res) => {
// // 	try {
// // 		const { error } = validate(req.body);
// // 		if (error)
// // 			return res.status(400).send({ message: error.details[0].message });

// // 		const user = await User.findOne({ email: req.body.email });
// // 		if (!user)
// // 			return res.status(401).send({ message: "Invalid Email or Password" });
    

// // 		const validPassword = await bcrypt.compare(
// // 			req.body.password,
// // 			user.password
// // 		);
// // 		if (!validPassword)
// // 			return res.status(401).send({ message: "Invalid Email or Password" });

// // 		const token = user.generateAuthToken();
// // 		res.status(200).send({ data: token, message: "logged in successfully" });
		
// // 	} catch (error) {
// // 		res.status(500).send({ message: "Internal Server Error" });
// // 	}
// // });

// // const validate = (data) => {
// // 	const schema = Joi.object({
// // 		email: Joi.string().email().required().label("Email"),
// // 		password: Joi.string().required().label("Password"),
// // 	});
// // 	return schema.validate(data);
// // };

// module.exports = routes;


const hash = require("../utils/hash");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require("../model/user");
const routes = require("express").Router();
const jwt = require('jsonwebtoken');
const auth = require("./validateToken");
require('dotenv').config();

routes.post('/auth', auth ,async (req, res) => {
  try {
    // Validate user input
    const { error } = validation(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if user with provided email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if password is valid
    const password=hash(req.body.password)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token and send it in response
    const token = jwt.sign({ email: user.email }, 'ineza');
    res.set({
      'Authorization': `Bearer ${token}`,
      'Access-Control-Expose-Headers': 'Authorization'
    }).status(200).json({ message: 'Successfully logged in.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

function validation(req) {
  const schema = Joi.object({
    email: Joi.string().max(100).min(3).email().required(),
    password: Joi.string().max(50).min(3).required()
  });
  return schema.validate(req);
}

module.exports = routes;

