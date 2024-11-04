import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

const ItemCard = ({ item, showReturnButton, onReturn }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{item.name}</CardTitle>
        <CardText>{item.description}</CardText>
        <CardText>Category: {item.category}</CardText>
        <CardText>Condition: {item.condition} / 10</CardText>
        {showReturnButton && (
          <Button color="danger" onClick={onReturn}>
            Return item
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default ItemCard;
