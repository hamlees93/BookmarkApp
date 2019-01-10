const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");

//// Receive email and password from react rego form to create new user from the UserModel. Return the token to react ////
function register(req, res, next) {
    const { email, password } = req.body;
    const user = new UserModel({ email });

    UserModel.register(user, password, (err, user) => {
        if (err) {
            return next(new HTTPError(500, err.message));
        }

        const token = JWTService.generateToken(user);

        return res.json({ token });        
    });
};

//// Verification is done in routes and database, so this function is purely to create JWT token ////
function login (req,res) {
    const user = req.user;
    const token = JWTService.generateToken(user);

    return res.json({ token });
}


module.exports = {
    register,
    login
};