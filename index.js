const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
// const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");
const {ensureAuthenticated, forwardAuthenticated} = require("./middleware/checkAuth");
const authController = require("./controller/auth_controller");
const friendController = require("./controller/friend_controller");



app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes start here

// \login \routes
app.use(passport.initialize());
app.use(passport.session());
// app.get("/login", (req, res) => {
//   res.render("login")
// })
app.get("/login", forwardAuthenticated, authController.login);
app.post("/login", authController.loginSubmit)


// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/reminder",
//     failureRedirect: "/login",
//   })
// );



app.get("/reminder", ensureAuthenticated, reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
// app.get("/register", authController.register);
// app.get("/login", authController.login);
// app.post("/register", authController.registerSubmit);
// app.post("/login", authController.loginSubmit);

// new routes for friends
app.get("/friends", ensureAuthenticated, friendController.listFriends);
app.get("/friends/search", ensureAuthenticated, friendController.searchUser);
app.post("/friends/add/:id", ensureAuthenticated, friendController.addFriend);


app.listen(3002, function () {
  console.log(
    "Server running. Visit: localhost:3002/reminder in your browser 🚀"
  );
});


// const express = require("express");
// const app = express();
// const path = require("path");
// const ejsLayouts = require("express-ejs-layouts");
// const session = require("express-session");
// const reminderController = require("./controller/reminder_controller");
// const authController = require("./controller/auth_controller");
// const friendController = require("./controller/friend_controller");

// app.use(express.static(path.join(__dirname, "public")));

// app.use(express.urlencoded({ extended: false }));

// app.use(ejsLayouts);
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//       maxAge: 24 * 60 * 60 * 1000,
//     },
//   })
// );

// const passport = require("./middleware/passport");
// app.use(passport.initialize());
// app.use(passport.session());

// app.set("view engine", "ejs");

// // Routes start here

// app.get("/login", authController.login);
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/reminders",
//     failureRedirect: "/login",
//   })
// );

// app.get("/reminders", reminderController.list);
// app.get("/reminder/new", reminderController.new);
// app.get("/reminder/:id", reminderController.listOne);
// app.get("/reminder/:id/edit", reminderController.edit);
// app.post("/reminder/", reminderController.create);
// app.post("/reminder/update/:id", reminderController.update);
// app.post("/reminder/delete/:id", reminderController.delete);

// // new routes for friends
// app.get("/friends", friendController.listFriends);
// app.get("/friends/search", friendController.searchUser);
// app.post("/friends/add/:id", friendController.addFriend);


// app.listen(3002, function () {
//   console.log(
//     "Server running. Visit: localhost:3002/reminders in your browser 🚀"
//   );
// });
