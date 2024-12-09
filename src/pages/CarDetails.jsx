import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Helmet from "../components/Helmet/Helmet";

const CarDetails = () => {
  const { itemid } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const [showSuccess, setShowSuccess] = useState(false); // To show success message modal
  const [publishUser, setPublishUser] = useState({});

  const fetchItem = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/items/get/${itemid}`);
      setItem(res.data.item);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const fetchPublishUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/users/${item.sellerID}`);
      setPublishUser(res.data);
    } catch (error) {
      console.log("Error while fetching user");
    }
  };

  const handleRent = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/v1/items/rentitem`,
        { itemid },
        { withCredentials: true }
      );

      if (response.data.success) {
        setShowSuccess(true);
      } else {
        alert(response.data.message || "Failed to rent item. Please try again.");
      }
    } catch (error) {
      console.error("Error renting item:", error);
      alert("An error occurred while renting the item.");
    }
  };

  useEffect(() => {
    fetchItem();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (item.sellerID) {
      fetchPublishUser();
    }
  }, [item]);

  const closeSuccessModal = () => {
    setShowSuccess(false);
    navigate("/");
  };

  return (
    <Helmet title={item.name}>
      <section className="car-details-section">
        <Container>
          <Row>
            <Col lg="6" className="mb-4">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-100 rounded shadow"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </Col>

            <Col lg="6">
              <div className="car__info p-3 rounded shadow-sm">
                <h2 className="section__title mb-3">{item.name}</h2>

                <div className="d-flex align-items-center gap-4 mb-4">
                  <h6 className="rent__price text-primary fw-bold fs-4">
                    {item.priceByTenure} Rs / Month
                  </h6>
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-star-s-fill text-warning"></i>
                    {item.stars} Star(s)
                  </span>
                </div>

                <p className="text-muted mb-2">
                  <strong>Description:</strong> {item.description}
                </p>
                <p className="text-muted mb-2">
                  <strong>Published By:</strong> {publishUser.username || "N/A"}
                </p>
                <p className="text-muted mb-2">
                  <strong>Contact:</strong> {publishUser.contactNumber || "N/A"}
                </p>
                <p className="text-muted mb-2">
                  <strong>Age:</strong> {item.age} Year(s) old
                </p>

                <div className="d-flex flex-column gap-2 mt-4">
                  <span>
                    <i className="ri-list-check"></i> <strong>Category:</strong>{" "}
                    {item.category}
                  </span>
                  <span>
                    <i className="ri-repeat-line"></i> <strong>Times Rented:</strong>{" "}
                    {item.timesRented}
                  </span>
                  <span>
                    {item.availableToRent ? (
                      <span className="text-success fw-bold">
                        <i className="ri-checkbox-circle-line"></i> Available to Rent
                      </span>
                    ) : (
                      <span className="text-danger fw-bold">
                        <i className="ri-close-circle-line"></i> Currently Unavailable
                      </span>
                    )}
                  </span>
                </div>

                <Button
                  color={item.availableToRent ? "primary" : "secondary"}
                  className="mt-4"
                  disabled={!item.availableToRent}
                  onClick={handleRent}
                >
                  {item.availableToRent ? "Rent" : "Not Available"}
                </Button>
              </div>
            </Col>
          </Row>

          {/* Success Message Modal */}
          <Modal isOpen={showSuccess} toggle={closeSuccessModal}>
            <ModalBody>
              <h4 className="text-success">Success!</h4>
              <p>The item has been successfully rented.</p>
              <p>Would you like to browse more items?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={closeSuccessModal}>
                Go to Homepage
              </Button>
              <Button color="secondary" onClick={() => setShowSuccess(false)}>
                Continue Browsing
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
