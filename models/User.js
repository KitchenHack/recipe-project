const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const userSchema = new Schema({
  username: String,
  password: String, 
  shoppingList: [
    { 
      quantity: Number, 
      name: String, 
      measure: String, 
      }
    
  ], 
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }, 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
