const express = require('express');
const Recipe = require('../models/Recipe');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  const user = req.user;
  Recipe.find().then(recipesFromDB => {
    res.render('index', {recipeList: recipesFromDB});
  })
  console.log(user);
});

router.get('/addRecipe', (req, res) => {
  res.render('addRecipe')
}); 
//needed: post route to create new recipe 


//see shopping list for chosen recipe
//router.get('/-list', (req, res) => {
 // res.render('shopping-list')
//}); 

// router.use((req, res, next) => {
//   console.log(req.user)
//   if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
//     next(); // ==> go to the next route ---
//   } else {                          //    |
//     res.redirect("/login");         //    |
//   }                                 //    |
// }); // ------------------------------------                                
// //     | 
// //     V
router.get("/shopping-list", (req, res) => {
  console.log(req.user)
  if(req.user){res.render("shopping-list");}
  else{  res.redirect("/auth/login")}
});

router.get('/:recipeId', (req, res, next) => {
  const recipeId = req.params.recipeId; 
  Recipe.findById(recipeId).then(recipesFromDB => {
    console.log(recipesFromDB); 
    res.render('recipeDetails', {recipe: recipesFromDB}); 
  }).catch(err => {
    console.log(err); 
  })
})

// router.use((req, res, next) => {
//   console.log("tim is handsome")
//   if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
//     next(); // ==> go to the next route ---
//   } else {                          //    |
//     res.redirect("/login");         //    |
//   }                                 //    |
// }); // ------------------------------------                                
// //     | 
// //     V
// router.get("/shopping-list", (req, res) => {
//   res.render("shopping-list");
// });





module.exports = router;
