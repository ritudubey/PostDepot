import React from "react";
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';

import Query from "./Search/QueryPage";
import Results from "./Search/ResultsPage";
import Saved from "./SavedArticlesPage";

// Axios routes
import helpers  from "../../utils/helpers";

{/*const jumbotronStyle = {
  color: 'white',
  backgroundColor: '#20315A'
};
*/}

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          results: {},
          savedArticles: {}
        };

        this.setQuery = this.setQuery.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
  
  setQuery(newQuery, newStart, newEnd) {
    //Q1
    
    helpers.runNYTimesQuery(newQuery, newStart, newEnd).then(function(data) {
      this.setState({ results: { docs: data.docs } });
    }.bind(this));
  
   
    
    //Done

  }

  // When this component mounts, get all saved articles from our db
  componentDidMount() {
    helpers.getSaved().then(function(articleData) {
      this.setState({ savedArticles: articleData.data });
      console.log("saved results", articleData.data);
    }.bind(this));
  }

// This code handles the deleting saved articles from our database
  handleClick(item) {
    console.log(item);

    // todo Delete the list!
    //helpers.deleteSaved(item.title, item.date, item.url, item.source).then(function() {

      // Get the revised list!
      helpers.getSaved().then(function(articleData) {
        this.setState({ savedArticles: articleData.data });
        console.log("saved results", articleData.data);
      }.bind(this));

    //}.bind(this));
  }

  // Here we render the function
  render() {
    return (
      <div className="container">
         <br/>
         {/* todo -- add a nav bar
        <Card className="container">
    <CardTitle
      title="Explore Articles"
      subtitle="Save your favourite articles"
    />
  </Card>
  */}

        {/*<div className="jumbotron" style={jumbotronStyle}>
          <h1 className="text-center">
            <strong>
              <i className="fa fa-newspaper-o"></i> Explore Articles</strong>
          </h1>
          <p className="text-center">
            <em>Search and save articles of interest!</em>
          </p>
        </div>
        */}

       <div className="row">
          <div className="col-md-12">
            <Saved savedArticlesProps={this.state.savedArticles} deleteArticle={this.handleClick}/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Query updateSearch={this.setQuery}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Results results={this.state.results}/>
          </div>
        </div>
 
      </div>
    );
  }
};