import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import CarItem from "../components/UI/CarItem";
import Testimonial from "../components/UI/Testimonial";
import BlogList from "../components/UI/BlogList";

const Home = () => {
  const user = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/items/allitems`);
      setItems(res.data.items); // Update state with fetched items
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Helmet title="Home">
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "white",
          textAlign: "center",
          padding: "50px 0",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", fontFamily: "sans-serif" }}>
          It's so good to see you, {user.username}!
        </h1>
        <HeroSlider />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <section style={{ padding: "50px 0", backgroundColor: "#f9f9f9" }}>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6
                style={{
                  color: "#999",
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Explore More
              </h6>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                There Is More To Rent In
              </h2>
            </Col>
            <ServicesList />
          </Row>
        </Container>
      </section>

      {/* Best Sellers Section */}
      <section style={{ padding: "50px 0" }}>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6
                style={{
                  color: "#999",
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Come With
              </h6>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Best Sellers</h2>
            </Col>
            {items.slice(0, 20).map((item) => (
              <CarItem item={item} key={item._id} />
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section
        style={{
          padding: "50px 0",
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          color: "white",
        }}
      >
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6
                style={{
                  color: "#fefefe",
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Our Clients Say
              </h6>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Reviews</h2>
            </Col>
            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* Blog Section */}
      <section style={{ padding: "50px 0", backgroundColor: "#f9f9f9" }}>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6
                style={{
                  color: "#999",
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Explore Our Blogs
              </h6>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Latest Blogs</h2>
            </Col>
            <BlogList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
