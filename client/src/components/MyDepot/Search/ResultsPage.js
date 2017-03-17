// Include React
import React from "react";
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import axios from 'axios';

// Include our helpers for API calls
var helpers = require("../../../utils/helpers");

// Creating the Results component
export default class ResultsPage extends React.Component {
   constructor(props) {
        super(props);

        this.state = {
            title: "",
            url: "",
            pubdate: "",
            source:""
        };
        
        this.renderArticles = this.renderArticles.bind(this);
    }

  // This code handles the sending of the search terms to the parent Search component
  handleClick(item) {
    console.log("In handleClick");
    console.log(item);
    //todo- helpers.postSaved(item.headline.main, item.pub_date, item.web_url, item.source)
    // .then(function() {
    //    console.log(item.web_url);
    // });

//  var title = item.headline.main;
//  var date=  item.pub_date;
//  var url =  item.web_url;
//  var source =  item.source;
//  var newArticle = new Article({title: title, date: date, url: url, source:source});

    	axios.post("/api/saved", {item}).then(function(results){

			console.log("Saved users articles");
			console.log(results.data);

			// this.setState({
			// 	articles: results.data
			// });

		}.bind(this));

  }

  // A helper method for mapping through our articles and outputting some HTML
  renderArticles() {
    return this.props.results.docs.map(function(article, index) {

      // Each article thus reperesents a list group item with a known index
      return (
        <div key={index}>
   {/*   
           <li className="list-group-item">
            <h3>
              <span>
                <em>{article.headline.main}</em>
              </span>
              <span className="btn-group pull-right">
                <a href={article.web_url} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default ">View Article</button>
                </a>
                <button className="btn btn-primary" onClick={() => this.handleClick(article)}>Save</button>
              </span>
            </h3>
            <p>Date Published: {article.pub_date}</p>

          </li>
    */}

      <Card className="container ritucards">
            <CardHeader
            title = {article.headline.main}
            subtitle={article.pub_date}
            />
            <CardText>{article.source}
             </CardText>

            {/*} <CardActions>
      <RaisedButton label="View Article" href={article.web_url} />
      <RaisedButton label="Save" />
    </CardActions>*/}

              <span className="btn-group pull-right">
                <a href={article.web_url} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default ">View Article</button>
                </a>
                {/*<button className="btn btn-primary artBtn" >Save</button>
                 */}
                <button className="btn btn-primary artBtn" onClick={() => this.handleClick(article)}>Save</button>
                
        
              </span>
           

          </Card>
          <br/>

        </div>
      );

    }.bind(this));

  }

  // A helper method for rendering a container to hold all of our articles
  renderContainer() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
        </div>
        <div className="panel-body">
            <ul className="list-group">
                {this.renderArticles()}
            </ul>
        </div>
      </div>
    );
  }


  render() {
    // If we have no articles, render this HTML
    if (!this.props.results.docs) {
      return (
        <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
        </div>
        <div className="panel-body">
            <ul className="list-group">
                Enter Search to see Articles
            </ul>
        </div>
      </div>
      );
    }
    // If we have articles, return this.renderContainer() which in turn, returns all the articles
    return this.renderContainer();
  }
};