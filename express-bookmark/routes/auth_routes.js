const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const AuthController = require("./../controllers/auth_controller");
const passport = require("passport");

//// Celebrate and Joi add verification as soon as data is entered, before sending data to the AuthController ////
router.post("/register", celebrate({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), AuthController.register);

//// Call passport's authenticate function to check if details were entered correctly, and to subsequently log user in ////
router.post("/login", celebrate({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), passport.authenticate('local', { session: false}), AuthController.login);

module.exports = router;