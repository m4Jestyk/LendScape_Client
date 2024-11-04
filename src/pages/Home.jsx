import React, { useEffect, useState } from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";

import BlogList from "../components/UI/BlogList";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const user = useSelector((state) => state.auth);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/items/allitems`);
      setItems(res.data.items);  // Update state with fetched items
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <h1 className="text-dark mb-4">It's so good to see you ! {user.username}</h1>
        <HeroSlider />

          {/* <div className="hero__form">
            <Container>
              <Row className="form__row">
                <Col lg="4" md="4">
                  <div className="find__cars-left">
                  <h2>Find Your Best Product Here</h2>                
                  </div>
                </Col>

                <Col lg="8" md="8" sm="12">
                  <FindCarForm />
                </Col>
              </Row>
            </Container>
          </div> */}
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
            <h6 className="section__subtitle"></h6>
            <h2 className="section__title">There Is More To Rent In</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Best Sellers</h2>
            </Col>

            {items.slice(0, 6).map((item) => (
                <CarItem item={item} key={item._id} />

            ))}
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============ */}
      {/* <BecomeDriverSection /> */}

      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Reviews</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* =============== blog section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
