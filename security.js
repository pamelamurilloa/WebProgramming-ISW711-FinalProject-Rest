var passport = require('passport')
var LocalStrategy = require('passport-local')
var { hashSync, compareSync} = require ('bcryptjs')

const User = require("./models/userModel");

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

module.exports = {
    passport
}
