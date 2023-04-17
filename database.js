// let Database = {
//     cindy: {
//         reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}]
//     },
//     alex: {
//         reminders: []
//     } 
// }

// module.exports = Database;

const database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "jimmy123@gmail.com",
      password: "jimmy123!",
      reminders: [{id: 1, 
        title: "Jimmy", 
        description: "Look into Cayman account, non-extradition treaty", 
        completed: false,
        subtasks: ["Important", "El Plan"],
        tags: ["email", "work"],
        reminderDate: "2023-06-06"
      }],
      friends: []
    },
    {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "johnny123!",
      reminders: [
        {
          id: 2, 
          title: "I'm Johnny, Jimmy's friend",
          description: "Hello Jimmy",
          completed: true,
          subtasks: ["Buy life insurance", "Go skydiving"],
          tags: ["TheBoys", "YOLO"],
          reminderDate: "2023-01-01"
        }
      ],
      friends: []
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
      reminders: [],
      friends: []
    },
  ];
  
  const userModel = {
    findOne: (email) => {
      const user = database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
    },
    // make sure this is working
    findById: (id) => {
      const user = database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },
    searchUser: (query) => {
      return database.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
    },
    // need a searchUser function
  };
  
  module.exports = { database, userModel };
  