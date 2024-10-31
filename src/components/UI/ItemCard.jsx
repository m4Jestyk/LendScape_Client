import React from "react";
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button } from "reactstrap";

const ItemCard = ({ item }) => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h5">{item.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted">Price: Rs.{item.priceByTenure}</CardSubtitle>
        <CardSubtitle className="mb-2 text-muted">Category: {item.category}</CardSubtitle>
        <CardText>{item.description}</CardText>
        <Button color="primary">View Details</Button>
      </CardBody>
    </Card>
  );
};

export default ItemCard;
