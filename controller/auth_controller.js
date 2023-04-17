let database = require("../database");
const passport = require("../middleware/passport");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  // loginSubmit: (req, res) => {
  //   console.log("Authenticating user with email: ", req.body.email);
  //   passport.authenticate("local", {
  //     successRedirect: "/reminder",
  //     failureRedirect: "/login"
  //   })(req, res);
  // },
  loginSubmit: (req, res, next) => {
    console.log("Login submit route triggered"); // Add this line for debugging
    passport.authenticate("local", {
      successRedirect: "/reminder",
      failureRedirect: "/login",
    })(req, res, next);
  },



  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
