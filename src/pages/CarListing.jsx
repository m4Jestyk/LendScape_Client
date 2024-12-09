import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import axios from "axios";

const CarListing = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [label, setLabel] = useState("");

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/items/allitems`);
      setItems(res.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleChangeLabel = (e) => {
    setLabel(e.target.value);
  }

  const handleGo = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/items/getbycategory`, {
        category,
      });
      setItems(res.data.items);
    } catch (error) {
      console.log("Error while fetching in category ::", error);
    }
  };

  const handleLabelSearch = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/items/getbylabel`, {
        label,
      });
      setItems(res.data.items);
    } catch (error) {
      console.log("Error while fetching in Label ::", error);
    }
  };


  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Helmet title="Car Listing">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div
                className="search-bar d-flex align-items-center gap-4 flex-wrap justify-content-center"
                style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <div className="d-flex flex-column align-items-center gap-2">
                  <label htmlFor="category" style={{ fontWeight: "600", fontSize: "14px" }}>
                    Search by Category
                  </label>
                  <input
                    id="category"
                    onChange={handleCategoryChange}
                    type="text"
                    placeholder="Enter category"
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      minWidth: "200px",
                    }}
                  />
                </div>

                <button
                  onClick={handleGo}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Go
                </button>

                <button
                  onClick={fetchItems}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </Col>

            <Col lg="12" className="mb-5">
              <div
                className="search-bar d-flex align-items-center gap-4 flex-wrap justify-content-center"
                style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <div className="d-flex flex-column align-items-center gap-2">
                  <label htmlFor="category" style={{ fontWeight: "600", fontSize: "14px" }}>
                    Search by Label
                  </label>
                  <input
                    id="label"
                    onChange={handleChangeLabel}
                    type="text"
                    placeholder="Enter Label"
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      minWidth: "200px",
                    }}
                  />
                </div>

                <button
                  onClick={handleLabelSearch}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Go
                </button>

                <button
                  onClick={fetchItems}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </Col>

            {items.length === 0 ? (
              <Col lg="12" className="text-center">
                <h4 style={{ color: "#888", marginTop: "20px" }}>No items found!</h4>
              </Col>
            ) : (
              items.map((item) => (
                <CarItem item={item} />
              ))
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
