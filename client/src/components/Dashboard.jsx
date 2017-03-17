import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import MainPage from "./MyDepot/MainPage";

const Dashboard = ({ secretData }) => (
  <div>
    <Card className="container ritudashboard">
      <CardTitle
        title="Explore and save your favourite articles..."
        />
          <CardMedia>
      <img src="images/horizontalbookmark.jpg" />
    </CardMedia>


      {secretData && <CardText style={{ fontSize: '16px', color: 'blue' }}>{secretData}</CardText>}
    </Card>
    <MainPage />
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
