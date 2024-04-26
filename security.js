var passport = require('passport')
var LocalStrategy = require('passport-local')
const jwt = require('jsonwebtoken');
var { hashSync, compareSync} = require ('bcryptjs')

const User = require("./models/userModel");

const theSecretKey = process.env.JWT_SECRET;

passport.use(new LocalStrategy(
    {usernameField:"email",
     session:false},
    async function verify(email, password, cb) {

        const user = await User.findOne({ email: email });

        if (!user) { return cb(null, false, { message: 'Incorrect email or password.' }); }

        if (!compareSync(password, user.password)) {
            return cb(null, false, { message: 'Incorrect email or password.' });
        } 
        
        return cb(null, user);
    }
));

const generateToken = (data) => {
    return jwt.sign(
        data,
        theSecretKey
    );
}


module.exports = {
    passport,
    generateToken
}
