//// Put logic that will be used by more than 1 function, but doesn't quite fit in the controller in the services directory ////

const JWT = require("jsonwebtoken");
//// Expire token after 1 day ////
const expiry = "1d";

//// Use JWT's sign function to create a token based on the user's email, the secret key, the user ID and the expiry ////
function generateToken(user) {
    const token = JWT.sign(
        {
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user._id.toString(),
            expiresIn: expiry
        }
    );

    return token;
}

module.exports = {
    generateToken
}