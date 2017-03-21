var mongoose = require('mongoose');

var booklistSchema = mongoose.Schema({
  	name:String,
  	author:String,
  	price:String
})

module.exports = booklistSchema 
