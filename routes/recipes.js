// global.window = {document: {createElementNS: () => {return {};} }};

// const domino = require('domino');
// import { readFileSync } from 'fs';
// const DIST_FOLDER = join(process.cwd(), 'dist');
// const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
// const winObj = domino.createWindow(template);
// global['window'] = winObj;
// global['document'] = winObj.document;

const express = require('express'); 
const passport = require('passport'); 
const router = express.Router(); 
const User = require('../models/User'); 
const Recipe = require('../models/Recipe'); 
const mongoose = require('mongoose'); 
const ensureLogin = require("connect-ensure-login");


// const swiped = require('swiped'); 

//when I want to render the page from the nav bar
router.get("/shoppingList", ensureLogin.ensureLoggedIn(), (req, res) => {
  const list = req.user.shoppingList; 
  const user=req.user; 
  // console.log(list)
   res.render('shopping-list' , {list, user: user})
}); 

//when I click the button (add to list)
router.post("/shoppingList", ensureLogin.ensureLoggedIn(), (req, res) => {
  // console.log(Object.values(ing)); 
  const user=req.user._id; 
  let ing= req.body.ingredient; 

  // console.log(user); 
  // console.log("SHOW ME THE"+ing)

  const list = ing.map(elem => {
    let part=elem.split(" ")
    return {quantity:part[0], measure:part[1], name:part.slice(2).join(" ")}
  })

  User.findByIdAndUpdate(
    user, 
 { $push:{shoppingList: list}}
).then(list => {   
    res.redirect('/shoppingList')
    // res.render('shopping-list',{ list, user: user})
  }).catch(err => {
    console.log(err)
  })
}); 


router.get('/ingredients/remove/:ingredient', (req, res) => {
  const ingr=req.params.ingredient; 
  const user=req.user._id; 

  console.log(`${ingr} removed for user ${user}.`); 

  User.findByIdAndUpdate(
    user, 
    { $pull: {"shoppingList": {name:ingr}}}
  ).then(() => {
    res.redirect('/shoppingList')
  }).catch(err => {
    console.log(err)
  })
}); 



router.post('/shoppingList/update', (req, res) => {
  console.log(req.body.name);
  console.log(req.body.quantity); 
  console.log(req.body.measure)
  const user=req.user._id; 
  const list = req.body.name.map((nameOfIng, index) => {
    return {name:nameOfIng, measure: req.body.measure[index], quantity: req.body.quantity[index]}
  }); 
  // const list ={name:req.body.name, measure: req.body.measure[index], quantity: req.body.quantity[index]}
  console.log(list)
  User.findByIdAndUpdate(
    user, 
    {"shoppingList": list}
    ).then(()=> {res.redirect('/shoppingList')
  })
}); 


router.post('/shoppingList/updateWithAdditionalItem', (req, res) => {
  console.log(req.body.name);
  console.log(req.body.quantity); 
  console.log(req.body.measure)
  const user=req.user._id; 
  console.log(user)
  const {quantity, measure, name} = req.body; 
  console.log(req.body)
  const list ={name:req.body.name, measure: req.body.measure, quantity: req.body.quantity}

  // const list = req.body.name.map((nameOfIng, index) => {
  //   return {name:nameOfIng, measure: req.body.measure[index], quantity: req.body.quantity[index]}
  // }); 
  // console.log(list)
  User.findByIdAndUpdate(
    user, 
    { $push: {shoppingList: list}}, { new: true}
    ).then((findedUser)=> {
      console.log('this was added', findedUser)
      res.redirect('/shoppingList')
  })
}); 



module.exports = router;




