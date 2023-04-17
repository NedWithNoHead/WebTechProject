let database = require("../database").userModel;

let remindersController = {
  list: (req, res) => {
    const user = req.user;
    const userFromDb = database.findOne(user.email);
    const friendsInfo = userFromDb.friends.map((friendID) => database.findById(friendID));
    const allReminders = [userFromDb, ...friendsInfo].reduce((all, u) => all.concat(u.reminders), []);
    res.render("reminder/index", { reminders: allReminders });
  },
  new: (req, res) => {
    res.render("reminder/create");
  },
  listOne: (req, res) => {
    const user = req.user;
    const userFromDb = database.findOne(user.email);
    let reminderToFind = req.params.id;
    let searchResult = userFromDb.reminders.find((reminder) => reminder.id == reminderToFind);

    if (searchResult) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.status(404).send("Reminder not found or not authorized to view this reminder");
    }
  },
  create: (req, res) => {
    const user = req.user;
    const userFromDb = database.findOne(user.email);
    let reminder = {
      id: userFromDb.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      subtasks: req.body.subtasks ? req.body.subtasks.split(",") : [],
      tags: req.body.tags ? req.body.tags.split(",") : [],
      reminderDate: req.body.reminderDate,
    };
    userFromDb.reminders.push(reminder);
    res.redirect("/reminder");
  },
  edit: (req, res) => {
    const user = req.user;
    const userFromDb = database.findOne(user.email);
    let reminderToFind = req.params.id;
    let searchResult = userFromDb.reminders.find((reminder) => reminder.id == reminderToFind);

    if (searchResult) {
      res.render("reminder/edit", { reminderItem: searchResult });
    } else {
      res.status(404).send("Reminder not found or not authorized to edit this reminder");
    }
  },
  update: (req, res) => {
    const user = req.user;
  
    if (!user) {
      res.redirect("/login");
      return;
    }
  
    const userFromDb = database.findOne(user.email);
    let reminderToFind = req.params.id;
    let reminderIndex = userFromDb.reminders.findIndex((reminder) => reminder.id == reminderToFind);
  
    if (reminderIndex != -1) {
      let status = req.body.completed === "true";
      let updatedReminder = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        completed: status,
        subtasks: req.body.subtasks ? req.body.subtasks.split(",") : [],
        tags: req.body.tags ? req.body.tags.split(",") : [],
        reminderDate: req.body.reminderDate,
      };
      userFromDb.reminders[reminderIndex] = updatedReminder;
      res.redirect("/reminder");
    } else {
      res.status(404).send("Reminder not found or not authorized to update this reminder");
    }
  },
  

  delete: (req, res) => {
    const user = req.user;
    const userFromDb = database.findOne(user.email);
    let reminderIndex = userFromDb.reminders.findIndex((reminder) => reminder.id == req.params.id);

    if (reminderIndex != -1) {
      userFromDb.reminders.splice(reminderIndex, 1);
      res.redirect("/reminder");
    } else {
      res.status(404).send("Reminder not found or not authorized to delete this reminder");
    }
  },
};

module.exports = remindersController

