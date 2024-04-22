const User = require("../models/userModel");
const Kid = require("../models/kidModel");
const passport = require("../security");

/**
 * Compares passwords
 *
 * @param {*} req
 * @param {*} res
 */


const userLogin = async (req, res) => {
  console.log(req.user)
  res.json(req.user)
  
  // const email = req.body.email
    // const password = req.body.password

    // if (!email || !password) {
    //   res.status(400)
    //   return res.json({error: "Missing credentials"})
    // }

    // User.findOne({ email: email, password: password })
    // .then( (user) => {
    //     res.status(200);
    //     res.json(user);
    // })
    // .catch(err => {
    //   res.status(404);
    //   console.log('error while trying to find the user', err)
    //   res.json({ error: "User doesnt exist" })
    // });
  
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
    kidCompare
  }