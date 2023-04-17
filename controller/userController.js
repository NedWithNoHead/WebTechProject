const userModel = require("../database").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    console.log("User found:", user); // Add this line for debugging
    if (isUserValid(user, password)) {
      return user;
    } else {
      console.log("Invalid password"); // Add this line for debugging
    }
  } else {
    console.log("User not found"); // Add this line for debugging
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
