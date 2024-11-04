import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
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

  const fetchPublishUser = async() => {
    try {
        console.log("CALLED ================================")
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/users/${item.sellerID}`);
        console.log("publish response: ",res.data);
        setPublishUser(res.data);
    } catch (error) {
      console.log("Error while fetching user")
    }
  }

  const handleRent = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/v1/items/rentitem`,
        { itemid },
        { withCredentials: true }
      );
      console.log(response.data);

      if (response.data.success) {
        setShowSuccess(true); // Show success message modal
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
    fetchPublishUser();
  }, [item])

  const closeSuccessModal = () => {
    setShowSuccess(false);
    navigate("/"); // Redirect to homepage
  };

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
                    {item.priceByTenure} Rs / Month
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    {item.stars} Star(s)
                  </span>
                </div>

                <p className="section__description">
                  {item.description}
                </p>

                <p className="section__description">
                  Published By : {publishUser.username}
                </p>

                <p className="section__description">
                  Contact the Lender here : {publishUser.contactNumber}
                </p>

                <p className="section__description">
                  {item.age} Year(s) old
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
                    Category : {item.category}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    Times Rented : {item.timesRented}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                     {item.availableToRent ? "Item is available to rent!" : "Item is currently unavailable to rent."}
                   </span>

                  
                  
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  
                </div>
              </div>
            </Col>

            <Button onClick={handleRent} disabled={!item.availableToRent}>
   {item.availableToRent ? "Rent" : "Not available at the moment"}
 </Button>


          {/* Success Message Modal */}
           <Modal isOpen={showSuccess} toggle={closeSuccessModal}>
             <ModalBody>
               <h4>Success!</h4>
               <p>The item has been successfully rented. Would you like to browse more items?</p>
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

            
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
