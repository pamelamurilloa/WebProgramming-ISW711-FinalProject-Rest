var passport = require('passport')
var LocalStrategy = require('passport-local')
var crypto = require ("node:crypto")

const User = require("./models/userModel");

passport.use(new LocalStrategy(
    {usernameField:"email",
     session:false},
    async function verify(email, password, cb) {

        const user = await User.findOne({ email: email });

        if (!user) { return cb(null, false, { message: 'Incorrect email or password.' }); }

        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
            return cb(null, user);
        });
    }
));

module.exports = passport
