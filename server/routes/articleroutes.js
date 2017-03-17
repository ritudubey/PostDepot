const express = require('express');


const router = new express.Router();

// router.get('/dashboard', (req, res) => {
//   res.status(200).json({
//     message: "Welcome to your dashboard."
//   });
// });

///////////////////////////////////////////////
//Get the saved articles by user
//router.get("/savedArticles/:id", function(req, res) {
router.get("/saved", function(req, res) {
  // Grab every doc in the Articles array
  // "userId": req.params.id
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
      res.json({"error": "No saved articles found"});
    }
    // Or send the doc to the browser as a json object
    else {
      //look up origArticle in the Article table
      //todo - use send here
      res.json(doc);
    }
  });
});



// Route to get all saved articles
// app.get("/article/saved", function(req, res) {

//   Article.find({})
//     .exec(function(err, doc) {

//       if (err) {
//         console.log(err);
//       }
//       else {
//         res.send(doc);
//       }
//     });
// });

/////////////////////////////////////////////////
// Create a new note or replace an existing note
// router.post("/saveArticle/:id", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   Article.findOneAndUpdate({
//     "_id": req.params.id
//   }, {"saved": true})
//   // Execute the above query
//     .exec(function (err, doc) {
//       // Log any errors
//       if (err) {
//         console.log(err);
//         res.json({"error": "Unable to save article"})
//       } else {
//         res.json(doc);
//       }
//     });
// });


// Save an article
router.post("/article/saved", function(req, res) {
  //req.body.userId =  req.params.id;
  var newArticle = new Article(req.body);

  console.log(req.body);

  newArticle.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});
/////////////////////////////////////////



// Grab an article by it's ObjectId
// router.get("/articles/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   Article.findOne({ "_id": req.params.id })
//   // ..and populate all of the notes associated with it
//   .populate("notes")
//   // now, execute our query
//   .exec(function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the doc to the browser as a json object
//     else {
//       res.json(doc);
//     }
//   });
// });

// Delete One from the DB
// router.post("/article/delete/:id", function(req, res) {
//   Article.update({"_id": req.params.id}, 
//   update={"saved" : false, "notes" : []},
//   options = {multi: false},
//   function(error, numeffected) {
//     // Log any errors from mongojs
//     if (error) {
//       console.log(error);
//       res.json({"error":error});
//     }
//     // Otherwise, send the mongojs response to the browser
//     // This will fire off the success function of the ajax request
//     else {
//       console.log(numeffected);
//       res.json({"result" : numeffected});
//     }
//   });
// });

// router.delete('/clearall', function (req, res) {
//   Article.remove(function (err) {
//     if (!err) {
//       console.log("removed Articles");
//       Note.remove(function (err) {
//         if (!err) {
//       console.log("removed Notes");
//       res.json("Delete successful");
//         }else {
//           console.log(err);
//         }
//       });
//     } else {
//       console.log(err);
//     }
//   });
// });



// Create a new note or replace an existing note
// router.post("/article/:id", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   var newNote = new Note(req.body);

//   // And save the new note the db
//   newNote.save(function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise
//     else {
//       // Use the article id to find and update it's note
//       Article.findOneAndUpdate({ "_id": mongojs.ObjectID(req.params.id) }, 
//       { $push: { "notes": doc._id } })
//       // Execute the above query
//       .exec(function(err, doc) {
//         // Log any errors
//         if (err) {
//           console.log(err);
//         }
//         else {
//           // Or send the document to the browser
//           res.json(doc);
//         }
//       });
//     }
//   });
// });
//////////////////////////REMOVE LATER////////////////////////////////



// Route to delete an article from saved list
// app.delete("/api/saved/", function(req, res) {

//   var url = req.param("url");

//   Article.find({ url: url }).remove().exec(function(err) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send("Deleted");
//     }
//   });
// });

//////////////////////////////////////////////////

module.exports = router;
