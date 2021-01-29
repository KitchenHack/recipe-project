const express = require('express');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");


/* GET home page */



/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.user);
  if(req.user){
    res.redirect("/allRecipes");
  }
  else{
    res.render("auth/login");
  }
});

// router.get("/", (req, res, next) => {
//   console.log(req.user);
//   if(req.user){
//     res.redirect("/allRecipes");
//   }
//   else{
//     res.render("auth/login");
//   }
// });

// router.get('/', (req, res, next) => {
//   console.log("this is the user?", req.user)
//   const user = req.user;
//   Recipe.find().then(recipesFromDB => {
//     res.render('index', {recipeList: recipesFromDB, user: user});
//   })
//   console.log(user);
// });

//get to the all recipes dashboard
router.get("/allRecipes", ensureLogin.ensureLoggedIn(), (req, res) => {
  console.log(req.user); 
  const user = req.user;
  Recipe.find()
  .then(recipesFromDB => {
    res.render('allRecipes', {recipeList: recipesFromDB, user: user});
  })
  .catch((err)=> {
    console.log(err); 
    next(); 
  }); 
}); 





























router.get('/addRecipe', ensureLogin.ensureLoggedIn(), (req, res) => {
  const user=req.user; 
  User.find().then(usersFromDB => {
    res.render('addRecipe', {users: usersFromDB, user: user});
  }).catch(err => {
    console.log(err); 
  });
}); 

//needed: post route to create new recipe 
router.post('/addRecipe', (req, res) => {
  console.log(req.body); 
  const { user, title, description, quantity, name } = req.body; 
  Recipe.create({
    user: user, 
    title: title, 
    description: description, 
    quantity: quantity, 
    name: name, 
  }).then(recipe => {
    console.log(`Success,${title} was added to the database.`); 
    res.redirect('/allRecipes'); 
  }).catch(err => {
    console.log(err); 
  });
}); 

//see shopping list for chosen recipe, imported from Annas code
// router.get("/shopping-list", (req, res) => {
//   const user = req.user;
//   console.log(req.user)
//   if(req.user){res.render("shopping-list",{user});}
//   else{  res.redirect("/auth/login")}
// });

router.get('/allRecipes/:recipeId', (req, res, next) => {
  const recipeId = req.params.recipeId; 
  const user=req.user; 
  Recipe.findById(recipeId)
  .then(recipe => {
    // console.log(recipe); 
    res.render('recipeDetails', {recipe: recipe, user}); 
  }).catch(err => {
    console.log(err); 
  });
}); 




module.exports = router;
