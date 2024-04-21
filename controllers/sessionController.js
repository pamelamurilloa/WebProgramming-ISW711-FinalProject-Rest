const User = require("../models/userModel");
const Kid = require("../models/kidModel");

/**
 * Compares passwords
 *
 * @param {*} req
 * @param {*} res
 */
const userLogin = (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
  
    User.findOne({ email: email, password: password })
    .then( (user) => {
        res.status(200);
        res.json(user);
    })
    .catch(err => {
      res.status(404);
      console.log('error while trying to find the user', err)
      res.json({ error: "User doesnt exist" })
    });
  
  }

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
    userLogin,
    kidCompare
  }