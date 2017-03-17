import React from 'react';
import { Card, CardTitle, CardMedia  } from 'material-ui/Card';


const HomePage = () => (
  <Card className="container">
    <CardTitle title="PostDepot" subtitle="Our moto...save now read later. Get news about topics that interest you" />
     <CardMedia>
      <img src="images/logo2.jpg" />
    </CardMedia>
  </Card>
);

export default HomePage;
