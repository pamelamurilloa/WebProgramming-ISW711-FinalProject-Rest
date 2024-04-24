const User = require("../models/userModel");
const Kid = require("../models/kidModel");

/**
 * Creates a kid
 *
 * @param {*} req
 * @param {*} res
 */

const getUser = async (userId) => {
    let user = await User.findById(userId)
    .catch(err => {
      console.log('error while trying to find the user', err)
    });

    return user;
}

const kidPost = async (req, res) => {
    let kid = new Kid();    

    let userId = req.body.userId;
    let user = new User();
    user = await getUser(userId);

    kid.name = req.body.name;
    kid.pin  = req.body.pin;
    kid.avatar = req.body.avatar;
    kid.age  = req.body.age;

    // Saves the kid with their parent
    if (user && kid.name && kid.pin && kid.avatar && kid.age) {
        let newKid = await kid.save()
        .catch(err => {
            res.status(404);
            console.log('error while saving the kid', err)
            res.json({ error: "There was an error saving the kid" })
            });

        // Add the kid's ID to the user's kids array
        user.kids.push(newKid._id);

        // Updated the user file with the new information
        await user.save()
        .then (data => {
            res.status(200); // Saved
            res.header({
                'kid_location': `/tubekids/kids/?id=${newKid.id}`,
                'user_location': `/tubekids/users/?id=${data.id}`
            });
            res.json(data);
        })
        .catch (err => {
            res.status(422);
            console.log('error while saving the user', err);
            res.json({error: 'There was an error saving the user'});
        })
    }

};

/**
 * Get all kids
 *
 * @param {*} req
 * @param {*} res
 */

const kidGet = (req, res) => {
    Kid.findById(req.params.id)
      .then( (kid) => {
        res.json(kid);
      })
      .catch(err => {
        res.status(404);
        console.log('error while trying to find the kid', err)
        res.json({ error: "Kid doesnt exist" })
      });
};

const kidGetAll = async (req, res) => {
  
    try {
        let userId = req.params.userId;
        let user = await User.findById(userId);

        let kids = [];

        if ( typeof user.kids !== "undefined") {
            for (const kidId of user.kids) {
                const kid = await Kid.findById(kidId.toString());
                if (kid) {
                    kids.push(kid);
                }
            }
        }

        res.status(200);
        res.json(kids);
    } catch (err) {
        res.status(404);
        console.log('error while trying to find the kid', err)
        res.json({ error: "Kid doesnt exist" })
      };
};

/**
 * Updates a kid
 *
 * @param {*} req
 * @param {*} res
 */

const kidPatch = async (req, res) => {
    let kid = await Kid.findById(req.params.id)
    .catch(err => {
        res.status(422);
        console.log('error while trying to find the kid', err)
        res.json({ error: "Kid doesnt exist" })
    });

    kid.name = req.body.name ? req.body.name : kid.name;
    kid.pin = req.body.pin ? req.body.pin : kid.pin;
    kid.avatar = req.body.avatar ? req.body.avatar : kid.avatar;
    kid.age = req.body.age ? req.body.age : kid.age;

    kid.save()
    .then ( () => {
        res.status(200); // Saved
        res.json(kid);
    })
    .catch(err => {
        res.status(404);
        console.log('error while saving the kid', err)
        res.json({ error: "There was an error saving the kid" })
    });
};

/**
 * Deletes a kid
 *
 * @param {*} req
 * @param {*} res
 */
 const kidDelete = async (req, res) => {
    // get kid by id
    let userId = req.body.userId;

    await Kid.findByIdAndDelete( req.params.id)
    .then ( () => {
        console.log("Successfully deleted");
    })
    .catch (err => {
        res.status(422);
        console.log('error while deleting the kid', err)
        res.json({error: 'There was an error deleting the kid'});
    });
      
    console.log();
    await User.findByIdAndUpdate(userId, { $pull: { kids: { $in: [req.params.id] } } })
    .then ( () => {
        res.status(200); // Saved
        res.json({});
    }).catch (err => {
        res.status(422);
          console.log('Error while removing the kid from the parent', err);
          return res.json({error: 'There was an error removing the kid from the parent'});
    });
};

module.exports = {
  kidGet,
  kidGetAll,
  kidPost,
  kidPatch,
  kidDelete
}