// Include the Axios library for HTTP requests
var axios = require("axios");
//scraping tools
//var request = require("request");
//var cheerio = require("cheerio");
import Auth from '../modules/Auth';

// NYT API Key (Replace with your own API Key)
var APIKey = "1f83f297e31b4a5fbe22d4dbf702ced1";

// Helper Functions
var helpers = {

  // This will run our query.
  runNYTimesQuery: function(term, start, end) {

    // Adjust to get search terms in proper format
    var formattedTerm = term.trim();
    var formattedStart = start.trim() + "0101";
    var formattedEnd = end.trim() + "1231";


    console.log("Query Run");
    // Run a query using Axios. Then return the results as an object with an array.
    // See the Axios documentation for details on how we structured this with the params.
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      params: {
        "api-key": APIKey,
        "q": formattedTerm,
        "begin_date": formattedStart,
        "end_date": formattedEnd
      }
    })
    .then(function(results) {
      console.log("runQuery axios output", results.data.response);
      return results.data.response;
    });
  },

  
  // This will return any saved articles from our database
  getSaved: function() {
    return axios.get("/api/saved")
      .then(function(results) {
        console.log("get saved axios results", results);
        return results;
      });
  },
  // This will save new articles to our database
  postSaved: function(title, date, url, source, user) {
  //var user = localStorage.getItem('user');
  var newArticle = { title: title, date: date, url: url, source:source, user: localStorage.getItem('user') };

//  const xhr = new XMLHttpRequest();
//     xhr.open('post', '/api/saved');
//     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     // set the authorization HTTP header
//     xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
//     xhr.responseType = 'json';
//     xhr.addEventListener('load', () => {
//       if (xhr.status === 200) {
//         this.setState({
//           secretData: xhr.response.message
//         });
//       }
//     });
//     xhr.send("{ title: title, date: date, url: url, source:source, user: user }");

    return axios.post("/api/saved", newArticle)
      .then(function(response) {
        console.log("save article axios results", response.data._id);
        return response.data._id;
      });
  },
  // This will remove saved articles from our database
  deleteSaved: function(title, data, url) {
    return axios.delete("/articles/saved", {
      params: {
        "title": title,
        "data": data,
        "url": url
      }
    })
    .then(function(results) {
      console.log("delete saved axios results", results);
      return results;
    });
  }
};


// We export the helpers function
module.exports = helpers;