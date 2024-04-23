const User = require("../models/userModel");
const Kid = require("../models/kidModel");
const passport = require("../security");

/**
 * Compares passwords
 *
 * @param {*} req
 * @param {*} res
 */

const userConfirmCode = async (req, res) => {
    let user = await User.findById(req.user._id)
    if (user.state === req.code) {
        user.state = 'Logged in';
        await user.save()
        .then (data => {
          res.status(200); // Successfull login
          res.json(data);
        })
        .catch (err => {
          res.status(422);
          console.log('error while confirming the code', err);
          res.json({error: 'There was an error confirming the code'});
        })
    }
}

const userLogin = async (req, res) => {
    const code = (Math.floor(Math.random() * 1000) + 1000).toString();

    if (req.user) {
        sendMessage(req.user.cellphone, code) //Sends a code to the user's cellphone
        let user = await User.findById(req.user._id)

        user.state = code;

        await user.save()
        .then (data => {
          res.status(200); // Saved
          res.json(data);
        })
        .catch (err => {
          res.status(422);
          console.log('error while saving the user', err);
          res.json({error: 'There was an error saving the user'});
        })
    } else {
      res.json({ error: "Incorrect email or password" })
    }

  }

const loginHandler = [
  passport.authenticate('local', {session:false}),
  userLogin,

];

const kidCompare = (req, res) => {
    const childId = req.params.id;
    const pin = req.params.pin;
  
    Kid.findOne({ _id: childId, pin: pin })
    .then( (kid) => {
      res.status(200);
      res.json(kid);
    })
    .catch(err => {
      res.status(404);
      console.log('error while trying to find the kid', err)
      res.json({ error: "Kid doesnt exist" })
    });
}

  module.exports = {
    loginHandler,
    kidCompare,
    userConfirmCode
  }