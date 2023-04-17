
const { userModel } = require("../database");

const showFriends = (req, res) => {
  const currentUser = req.user;
  if (!currentUser) {
    res.redirect("/login");
  } else {
    const userRecord = userModel.findById(currentUser.id);
    const friendsData = userRecord.friends.map((friendId) => userModel.findById(friendId));
    res.render("friends/list", { friends: friendsData });
  }
};

const findUser = (req, res) => {
  const currentUser = req.user;
  if (!currentUser) {
    res.redirect("/login");
  } else {
    const searchTerm = req.query.q;
    const userList = searchTerm
      ? userModel.searchUser(searchTerm).filter((user) => user.id !== currentUser.id)
      : [];
    res.render("friends/search", { users: userList });
  }
};

const includeFriend = (req, res) => {
  const currentUser = req.user;
  if (!currentUser) {
    res.redirect("/login");
  } else {
    const friendToAdd = parseInt(req.params.id);
    const userRecord = userModel.findById(currentUser.id);
    if (!userRecord.friends.includes(friendToAdd)) {
      userRecord.friends.push(friendToAdd);
    }
    res.redirect("/friends");
  }
};

module.exports = { listFriends: showFriends, searchUser: findUser, addFriend: includeFriend };
