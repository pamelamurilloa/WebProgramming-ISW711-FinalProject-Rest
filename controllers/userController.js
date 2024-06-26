const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");
const Kid = require("../models/kidModel");
var { hashSync } = require ('bcryptjs')
const {randomUUID} = require('crypto')

var moment = require('moment');
const { ConversationContextImpl } = require("twilio/lib/rest/conversations/v1/conversation");
/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */

const userPost = async (req, res) => {
  let user = new User();

  user.email = req.body.email
  user.pin  = req.body.pin
  user.name  = req.body.name
  user.lastName  = req.body.lastName
  user.cellphone  = req.body.cellphone
  user.salt = randomUUID()
  user.state  = 'pending'
  user.birthday  = moment(req.body.birthday).format('YYYY-MM-DD')
  user.kids = []

  user.password  = hashSync(req.body.password)

  let today = new Date()
  let birthday = new Date(user.birthday)
  let age = today.getFullYear() - birthday.getFullYear()
  let monthDiff = today.getMonth() - birthday.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
      age--;
  }
  
  if (user.email && user.password && user.pin && user.name && user.lastName && user.cellphone && user.birthday && age >= 18 && user.kids) {
    
    try {
      const data = await user.save()

      let playlist = new Playlist();

      playlist.name = 'General';
      playlist.user  = data._id;
      playlist.kids  = [];
      playlist.videos  = [];
      
      await playlist.save()

      res.status(201); // Created
      res.json(data)

    } catch( err ) {
        res.status(422);
        console.error('Error while saving the user, error in server', err);
        res.json({
          error: 'There was an error saving the user'
        });
    };

  } else {
    res.status(422);
    console.log('error while saving the user, invalid credentials')
    res.json({error: 'No valid data provided for user'});
  }
};

/**
 * Get all users
 *
 * @param {*} req
 * @param {*} res
 */

const userGet = (req, res) => {
    User.findById(req.params.id)
      .then( (user) => {
        res.json(user);
      })
      .catch(err => {
        res.status(404);
        console.log('error while trying to find the user', err)
        res.json({ error: "User doesnt exist" })
      });
};

const userGetAll = (req, res) => {
  User.find()
    .then( users => {
      res.json(users);
    })
    .catch(err => {
      res.status(422);
      res.json({ "error": err });
    });
};

/**
 * Updates a user
 *
 * @param {*} req
 * @param {*} res
 */

const userPatch = async (req, res) => {
    let user = new User();
    await User.findById(req.params.id)
    .then( (data) => {
      user = data;
    })
    .catch(err => {
      res.status(404);
      console.log('error while trying to find the user', err)
      res.json({ error: "User doesnt exist" })
    });

    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password;
    user.pin = req.body.pin ? req.body.pin : user.pin;
    user.name = req.body.name ? req.body.name : user.name;
    user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
    user.cellphone = req.body.cellphone ? req.body.cellphone : user.cellphone;
    user.birthday = req.body.birthday ? req.body.birthday : user.birthday;
    user.kids = req.body.kids ? req.body.kids : user.kids;

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
};

/**
 * Deletes a user
 *
 * @param {*} req
 * @param {*} res
 */
 const userDelete = async (req, res) => {
    // get user by id
    let user = new User();
    await User.findById(req.params.id)
    .then( (data) => {
      user = data;
    })
    .catch(err => {
      res.status(404);
      console.log('error while trying to find the user', err)
      res.json({ error: "User doesnt exist" })
    });

    try {
        await Kid.deleteMany( {_id: { $in: user.kids } } )
        .catch (err => {
          res.status(422);
          console.log('error while deleting the user', err);
          res.json({error: 'There was an error deleting the user'});
        })
      
        await user.deleteOne(req.body.id)
        .then ( () => {
            res.status(204); //No content
            res.json('User deleted succesfully');
          }
        )
        .catch (err => {
          res.status(422);
          console.log('error while saving the user', err);
          res.json({error: 'There was an error saving the user'});
        })
    }
    catch (err) {
      console.log('error while deleting the user', err);
      res.json({error: 'User doesnt exist'});
    }
};

module.exports = {
  userGet,
  userGetAll,
  userPost,
  userPatch,
  userDelete
}