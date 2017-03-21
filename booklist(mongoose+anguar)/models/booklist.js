var mongoose = require ('mongoose');

var contentSchema = require ('../schemas/booklist');

var booklist = mongoose.model('booklist',contentSchema)

module.exports = booklist ;

