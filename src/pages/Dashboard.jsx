import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ItemCard from "../components/UI/ItemCard";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [itemsOnSale, setItemsOnSale] = useState([]);
  const [itemsLended, setItemsLended] = useState([]);
  const [itemsBorrowed, setItemsBorrowed] = useState([]);
  const userId = useSelector(state => state.auth.id);
  const [successMessage, setSuccessMessage] = useState('');

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
        // Update itemsBorrowed to remove the returned item
        setItemsBorrowed(itemsBorrowed.filter(item => item._id !== itemId));
        setSuccessMessage("Item returned successfully!");
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Clear message after 3 seconds
      } else {
        console.log("Error returning item:", res.data.message);
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
      <section>
        <Container>
          {successMessage && (
            <div style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #c3e6cb"
            }}>
              {successMessage}
            </div>
          )}
          <Row className="gy-4">
            <Col md="4" xs="12" className="items-on-sale">
              <h3 style={{ color: "#FF6F61" }}>Items on Sale ({itemsOnSale.length})</h3>
              {itemsOnSale.length > 0 ? (
                itemsOnSale.map((item) => <ItemCard key={item._id} item={item} />)
              ) : (
                <p>No items currently on sale.</p>
              )}
            </Col>
            <Col md="4" xs="12" className="items-lended">
              <h3 style={{ color: "#6B8E23" }}>Items Lended Out ({itemsLended.length})</h3>
              {itemsLended.length > 0 ? (
                itemsLended.map((item) => <ItemCard key={item._id} item={item} />)
              ) : (
                <p>No items currently lended out.</p>
              )}
            </Col>
            <Col md="4" xs="12" className="items-borrowed">
              <h3 style={{ color: "#4682B4" }}>Items Borrowed ({itemsBorrowed.length})</h3>
              {itemsBorrowed.length > 0 ? (
                itemsBorrowed.map((item) => (
                  <ItemCard 
                    key={item._id} 
                    item={item} 
                    showReturnButton={true} 
                    onReturn={() => handleReturnItem(item.itemId)} // Ensure you're using the correct ID
                  />
                ))
              ) : (
                <p>No items currently borrowed.</p>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Dashboard;
