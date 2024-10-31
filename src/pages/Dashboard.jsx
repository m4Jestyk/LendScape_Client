import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ItemCard from "../components/UI/ItemCard";
import axios from "axios";

const Dashboard = () => {

  const [itemsOnSale, setItemsOnSale] = useState({});
  const [itemsLended, setItemsLended] = useState({});
  const [itemsBorrowed, setItemsBorrowed] = useState({});
  const [userId, setUserId] = useState("672309194929d7cfd14c3dfd");

  const fetchSaleItems = async() => {
    const res = await axios.get(`http://localhost:8000/api/v1/items/getsaleitems/${userId}`);
    const data = res.data;
    await setItemsOnSale(data.itemsOnSale);
    console.log("Sale items = " + itemsOnSale.length)
  }

  const fetchLendedItems = async() => {
    const res = await axios.get(`http://localhost:8000/api/v1/items/getlendeditems/${userId}`);
    const data = res.data;
    await setItemsLended(data.itemsLended);
    console.log("Items lended = " + itemsLended.length);
  }

  const fetchBorrowedItems = async() => {
    const res = await axios.get(`http://localhost:8000/api/v1/items/getborroweditems/${userId}`);
    const data = res.data;
    await setItemsBorrowed(data.itemsBorrowed);
    console.log("Items borrowed = " + itemsBorrowed.length);
  }

  const fetchItemInfo = async(itemId) => {
    const res = await axios.get(`http://localhost:8000/api/v1/items/get/${itemId}`);
    console.log(res);
  }

  useEffect(()=>{

    fetchSaleItems();
    fetchLendedItems();
    fetchBorrowedItems();

  },[])

  useEffect(() => {

  }, [])

  const [loading] = useState(false);

  if (loading) return <p>Loading...</p>;

  return (
    <Helmet title="Dashboard">
      <CommonSection title="Dashboard" />
      <section>
        <Container>
          <Row className="gy-4">
            <Col md="4" xs="12" className="items-on-sale">
              <h3 style={{ color: "#FF6F61" }}>Items on Sale ({itemsOnSale.length})</h3>
              {itemsOnSale.length > 0 ? (
                itemsOnSale.map((item) => <ItemCard key={item.id} item={item} />)
              ) : (
                <p>No items currently on sale.</p>
              )}
            </Col>
            <Col md="4" xs="12" className="items-lended">
              <h3 style={{ color: "#6B8E23" }}>Items Lended Out ({itemsLended.length})</h3>
              {itemsLended.length > 0 ? (
                itemsLended.map((item) => <ItemCard key={item.id} item={item} />)
              ) : (
                <p>No items currently lended out.</p>
              )}
            </Col>
            <Col md="4" xs="12" className="items-borrowed">
              <h3 style={{ color: "#4682B4" }}>Items Borrowed ({itemsBorrowed.length})</h3>
              {itemsBorrowed.length > 0 ? (
                itemsBorrowed.map((item) => <ItemCard key={item.id} item={item} />)
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
