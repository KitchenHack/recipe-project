// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Recipe = require('../models/Recipe'); 

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/recipe-project', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})

const recipes=[
  {
    title: "Meatless meatballs with tomato sauce", 
    ingredients:[
      {name: "Red bell pepper", quantity: 1},
      {name: "Cauliflower", quantity: 550},
      {name: "Eggplants", quantity: 550},
      {name: "Red onions", quantity: 2},
      {name: "Gloves garlic", quantity: 4},
      {name: "Spelt", quantity: 50},
      {name: "Canned crushed tomatos", quantity: 800},
      {name: "Panko breadcrumbs", quantity: 200},
      {name: "Basil", quantity: 10},
      {name: "Salt", quantity: 1},
      {name: "Pepper", quantity: 1},
      {name: "Olive Oil", quantity: 1},
    ], 
    duration: 40,
    image: "put image later", 
    description: "put cooking description",
    dishType: "main_course", 
  }, 
  {
    title: "Sweet Potato Curry", 
    ingredients: [
      {name: "Red onions", quantity: 100},
      {name: "Gloves garlic", quantity: 1},
      {name: "Ginger", quantity: 1},
      {name: "Hokkaido", quantity: 200},
      {name: "Cherry tomatos", quantity: 80},
      {name: "Sweet potatos", quantity: 300},
      {name: "Olive oil", quantity: 1},
      {name: "Tomato paste", quantity: 1},
      {name: "Curry powder", quantity: 1},
      {name: "Coconut milk", quantity: 500},
      {name: "Cashews", quantity: 80},
      {name: "Salt", quantity: 1},
      {name: "Pepper", quantity: 1},
    ], 
    duration: 40, 
    image: "put image later", 
    description: "put description later", 
    dishType: "main_course",
  } 
]; 

 Recipe.create(recipes)
 .then(recipes => {
   console.log(`Success! Added ${recipes.length} recipes to the database`); 
   mongoose.connect.close(); 
 }).catch(err => {
   console.log(err); 
 }); 


