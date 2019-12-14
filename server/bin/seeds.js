// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/server", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "Alice Kovacek",
    password: bcrypt.hashSync("Alice", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Bob Purdy",
    password: bcrypt.hashSync("Bob", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Oma Grady",
    password: bcrypt.hashSync("Oma", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Annie Schamberger",
    password: bcrypt.hashSync("Annie", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Jazmin Kovacek",
    password: bcrypt.hashSync("Jazmin", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Thomas O'Conner",
    password: bcrypt.hashSync("Thomas", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Jordi Jaskolski II",
    password: bcrypt.hashSync("Jordi", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Willy Beahan",
    password: bcrypt.hashSync("Willy", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Alessandra Nader",
    password: bcrypt.hashSync("Alessandra", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Leora Heller",
    password: bcrypt.hashSync("Leora", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Crystel Satterfield",
    password: bcrypt.hashSync("Crystel", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Neal Nitzsche",
    password: bcrypt.hashSync("Neal", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Ramona Lubowitz",
    password: bcrypt.hashSync("Ramona", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Brock Macejkovic",
    password: bcrypt.hashSync("Brock", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Keyon Bergnaum",
    password: bcrypt.hashSync("Keyon", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "Renee Hand",
    password: bcrypt.hashSync("Renee", bcrypt.genSaltSync(bcryptSalt))
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
