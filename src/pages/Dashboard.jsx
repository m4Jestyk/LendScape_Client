import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Card, CardBody, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ItemCard from "../components/UI/ItemCard";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [itemsOnSale, setItemsOnSale] = useState([]);
  const [itemsLended, setItemsLended] = useState([]);
  const [itemsBorrowed, setItemsBorrowed] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchSaleItems = async () => {
    const res = await axios.get(`http://localhost:8000/api/v1/items/getsaleitems/${userId}`);
    setItemsOnSale(res.data.itemsOnSale);
  };

  const fetchLendedItems = async () => {
    const res = await axios.get(`http://localhost:8000/api/v1/items/getlendeditems/${userId}`);
    setItemsLended(res.data.itemsLended);
  };

  const fetchBorrowedItems = async () => {
    const res = await axios.get(`http://localhost:8000/api/v1/items/getborroweditems/${userId}`);
    setItemsBorrowed(res.data.itemsBorrowed);
  };

  const handleReturnItem = async (itemId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/items/return`,
        { itemid: itemId },
        { withCredentials: true }
      );
      if (res.data.success) {
        setItemsBorrowed(itemsBorrowed.filter((item) => item._id !== itemId));
        setSuccessMessage("Item returned successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error("Error returning item:", res.data.message);
      }
    } catch (error) {
      console.error("Failed to return item:", error);
    }
  };

  useEffect(() => {
    fetchSaleItems();
    fetchLendedItems();
    fetchBorrowedItems();
  }, []);

  return (
    <Helmet title="Dashboard">
      <CommonSection title="Dashboard" />
      <section style={{ background: "#f8f9fa", padding: "20px 0" }}>
        <Container>
          {successMessage && (
            <Alert color="success" className="text-center">
              {successMessage}
            </Alert>
          )}
          <Row className="gy-4">
            <Col md="4" xs="12">
              <Card className="shadow-sm border-0">
                <CardBody>
                  <h3 style={{ color: "#FF6F61" }}>Items on Sale</h3>
                  <p>Total: {itemsOnSale.length}</p>
                  {itemsOnSale.length > 0 ? (
                    itemsOnSale.map((item) => <ItemCard key={item._id} item={item} />)
                  ) : (
                    <p className="text-muted">No items currently on sale.</p>
                  )}
                </CardBody>
              </Card>
            </Col>

            <Col md="4" xs="12">
              <Card className="shadow-sm border-0">
                <CardBody>
                  <h3 style={{ color: "#6B8E23" }}>Items Lended Out</h3>
                  <p>Total: {itemsLended.length}</p>
                  {itemsLended.length > 0 ? (
                    itemsLended.map((item) => <ItemCard key={item._id} item={item} />)
                  ) : (
                    <p className="text-muted">No items currently lended out.</p>
                  )}
                </CardBody>
              </Card>
            </Col>

            <Col md="4" xs="12">
              <Card className="shadow-sm border-0">
                <CardBody>
                  <h3 style={{ color: "#4682B4" }}>Items Borrowed</h3>
                  <p>Total: {itemsBorrowed.length}</p>
                  {itemsBorrowed.length > 0 ? (
                    itemsBorrowed.map((item) => (
                      <div key={item._id} className="d-flex align-items-center mb-3">
                        <ItemCard item={item} />
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleReturnItem(item.itemId)}
                          className="ms-3"
                        >
                          Return
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No items currently borrowed.</p>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Dashboard;
