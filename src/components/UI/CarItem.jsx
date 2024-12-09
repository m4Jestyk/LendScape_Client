import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import axios from "axios";

const CarItem = (props) => {
  const { imgUrl, category, name, age, stars, priceByTenure, _id, availableToRent, sellerID } = props.item;

  const [seller, setSeller] = useState("");

  const fetchSellerName = async() => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/users/getuser`,
        {
          itemId: sellerID
        }
      )
      await console.log(res);
    } catch (error) {
      console.log("Error in fetching Seller Name ::", error);
    }
  }

  useEffect(() => {
    fetchSellerName();
  }, [])

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div
        className="car__item"
        style={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          overflow: "hidden",
          transition: "transform 0.3s ease",
        }}
      >
        <div className="car__img">
          <img
            src={imgUrl}
            alt={name}
            className="w-100"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </div>

        <div className="car__item-content mt-4 p-3">
          <h4
            className="section__title text-center"
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2a4365" }}
          >
            {name}
          </h4>
          <h6
            className="section__title text-center"
            style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2a4365" }}
          >
            By : {seller}
          </h6>
          <h6
            className="rent__priceByTenure text-center mt-2"
            style={{ fontSize: "1.2rem", color: "#2d3748" }}
          >
            Lending Price: <span style={{ color: "#38a169" }}>{priceByTenure} Rs</span> <span>/ Month</span>
          </h6>

          <div
            className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4"
            style={{ fontSize: "0.9rem", color: "#4a5568" }}
          >
            <span className="d-flex align-items-center gap-1">
              <i className="ri-car-line" style={{ color: "#4299e1" }}></i> {category}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-star-line" style={{ color: "#ecc94b" }}></i> {stars} stars
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line" style={{ color: "#ed8936" }}></i> {age} year(s)
            </span>
          </div>

          <div
            style={{
              textAlign: "center",
              marginBottom: "15px",
              fontWeight: "500",
              color: availableToRent ? "#38a169" : "#e53e3e",
            }}
          >
            {availableToRent ? "Available to Rent" : "Not Available to Rent"}
          </div>

          <div className="d-flex justify-content-between">
            <button
              className="car__item-btn car__btn-rent"
              style={{
                flex: "1",
                margin: "0 5px",
                backgroundColor: "#4299e1",
                border: "none",
                color: "#fff",
                borderRadius: "5px",
                padding: "8px 0",
                transition: "background-color 0.3s ease",
              }}
            >
              <Link to={`/products/${_id}`} style={{ color: "#fff", textDecoration: "none" }}>
                Rent
              </Link>
            </button>

            <button
              className="car__item-btn car__btn-details"
              style={{
                flex: "1",
                margin: "0 5px",
                backgroundColor: "#2d3748",
                border: "none",
                color: "#fff",
                borderRadius: "5px",
                padding: "8px 0",
                transition: "background-color 0.3s ease",
              }}
            >
              <Link to={`/products/${_id}`} style={{ color: "#fff", textDecoration: "none" }}>
                Details
              </Link>
            </button>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
