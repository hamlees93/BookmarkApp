const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const BookmarksRoutes = require("./bookmarks_routes");
const passport = require("passport");

//// By calling passport's authenticate function on the bookmarks routes, a user must be logged in if they want to access anything within the bookmarks url ////
router.get("/", (req, res) => res.send("Welcome"));
router.use("/auth", AuthRoutes);
router.use("/bookmarks", passport.authenticate("jwt", { session: false }), BookmarksRoutes);

module.exports = router;