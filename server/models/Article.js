// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;


// Create article schema
var ArticleSchema = new Schema({
  title: {
    type: String
    // ,
    // required: true
  },
  url: {
    type: String
    // ,
    // required: true
  },
  source: {
    type: String
  },
  date: {
    type: Date
  },
  user : {
    type : String
    //todo -make user reqd
    //,
    //required: true
  }
  // ,
  //  saved: {
  //   type: Boolean,
  //   required: true
  // }
});


// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;