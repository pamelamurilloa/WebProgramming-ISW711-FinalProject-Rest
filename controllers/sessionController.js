const User = require("../models/userModel")
const Kid = require("../models/kidModel")
const sendMessage = require('../messaging/sms')
const {passport, generateToken} = require("../security")

/**
 * Compares passwords
 *
 * @param {*} req
 * @param {*} res
 */

const userConfirmCode = async (req, res) => {
    let user = await User.findById(req.body.userId)
    if (user.code && user.code === req.body.code) {
        user.code = null
        const response = {_id: user._id, email: user.email, name: user.name, lastName: user.lastName}
        response.token = generateToken(response)
        try {
          await user.save()
          res.json(response)
        } catch (error) {
          res.status(422)
          console.log('error while confirming the code', err)
          res.json({error: 'There was an error confirming the code'})
        }
    } else {
      res.status(401)
      res.json({error:"Invalid code"})
    }
}

const userLogin = async (req, res) => {
    const code = (Math.floor(Math.random() * 1000) + 1000).toString();

    if (req.user) {
        sendMessage(req.user.cellphone, code) //Sends a code to the user's cellphone
        let user = await User.findById(req.user._id)

        user.code = code;

        try {
          const data = await user.save()
          res.json(data);

        } catch (error) {
          res.status(422)
          res.json({error: 'There was an error saving the user'});
        }
    } else {
      res.json({ error: "Incorrect email or password" })
    }

  }

const loginHandler = [
  passport.authenticate('local', {session:false}),
  userLogin
];

const userConfirmPin = async (req, res) => {
  const userId = req.body.userId;
  const pin = parseInt(req.body.pin);
  
  try {
    const user = await User.findOne({ _id: userId, pin: pin })
    res.json(user);
  } catch (err) {
    res.status(404);
    console.log('error while trying to find the user', err)
    res.json({ error: "User doesnt exist" })
  }
}

const kidCompare = async (req, res) => {
    const childId = req.body._id;
    const pin = parseInt(req.body.pin);
  
    try {
      const kid = await Kid.findOne({ _id: childId, pin: pin })
      if (kid) {
        res.json(kid)
      } else {
        res.status(404);
        res.json({ error: "Kid doesnt exist" })
      }
      
    } catch (err) {
      res.status(404);
      console.log('error while trying to find the kid', err)
      res.json({ error: err.message })
    }
}

  module.exports = {
    loginHandler,
    userConfirmPin,
    kidCompare,
    userConfirmCode
  }