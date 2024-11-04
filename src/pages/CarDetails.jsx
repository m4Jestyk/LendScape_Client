import React, { useEffect, useState } from "react";

import carData from "../assets/data/carData";
import { Container, Row, Col, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import axios from "axios";

const CarDetails = () => {
  const { itemid } = useParams();

  const handleRent = async () => {
  //   const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/items/rentitem/${itemid}`,
  //   { withCredentials: true }
  // );
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/v1/items/rentitem`,
    { itemid },  // Send itemid as part of the request body
    { withCredentials: true }
  );
  console.log(response.data);
  }


  const [item, setItem] = useState({});

  const fetchItem = async () => {
    console.log(itemid);
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/items/get/${itemid}`);
    await setItem(res.data.item);
  }

  useEffect(() => {
    fetchItem();
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("ITEM FOUND========================", item);
  }, [item]);

  return (
    <Helmet title={item.name}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={item.imgUrl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{item.name}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    Rs - {item.priceByTenure}.00 / Month
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({item.stars} stars)
                  </span>
                </div>

                <p className="section__description">
                  {item.description}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    Category : {" "}
                    {item.category}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    {item.availableToRent ? <>Item is available to rent!</> : <h5>Unfortunately this item is not available to rent right now :(</h5>}
                  </span>




                </div>

              </div>
            </Col>


            <Button onClick={handleRent}>RENT</Button>


            {/* <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
