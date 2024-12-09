import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePreviewImg from "../hooks/usePreviewImg";
import {PacmanLoader} from "react-spinners";

const AddItem = () => {
    const user = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user.username === "") {
            navigate('/login');
        }
    }, [user]);

    const [itemData, setItemData] = useState({
        name: "",
        category: "",
        priceByTenure: 0,
        age: 0,
        description: "",
        condition: 5,
        availableToRent: false,
        imgUrl: ""
    });

    const [showConfirmation, setShowConfirmation] = useState(false);
    const { handleImageChange, imgUrl } = usePreviewImg();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Update itemData with the latest imgUrl whenever it changes
        setItemData(prevData => ({ ...prevData, imgUrl }));
        console.log(imgUrl);
    }, [imgUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({ ...itemData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER}/api/v1/items/add`,
                itemData, // imgUrl is now included here
                { withCredentials: true }
            );
            console.log("Item created:", response.data);
            setShowConfirmation(true);
            // console.log(itemData);
        } catch (error) {
            console.error("Error creating item:", error);
            alert("Failed to create item. Please try again.");
        }
        finally{
            setLoading(false);
        }
    };

    const handleAddAnother = () => {
        setItemData({
            name: "",
            category: "",
            priceByTenure: 0,
            age: 0,
            description: "",
            condition: 5,
            availableToRent: false,
            imgUrl: ""
        });
        setShowConfirmation(false);
    };

    return (
        <Helmet title="Create New Item">
            <div style={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
                <Container style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {loading ? (
                        <Container
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                height: "100%",
                                marginTop: "230px",
                                flexDirection: "column",

                            }}
                        >
                            <p>Posting your item... this may take a while :)</p>
                            <PacmanLoader color="#438ab0" size={90} speedMultiplier={1} />
                        </Container>
                    ) : (
                        <>
                            {showConfirmation ? (
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: "40px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flex: 1,
                                    }}
                                >
                                    <h2 style={{ fontSize: "2rem", color: "#38a169" }}>
                                        🎉 Item Added Successfully! 🎉
                                    </h2>
                                    <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
                                        Your item has been listed for rental.
                                    </p>
                                    <Button
                                        color="primary"
                                        onClick={handleAddAnother}
                                        style={{ marginTop: "20px" }}
                                    >
                                        Add Another Item
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <h2>Create a New Item</h2>
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={itemData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="category">Category</Label>
                                            <Input
                                                type="text"
                                                name="category"
                                                id="category"
                                                value={itemData.category}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="priceByTenure">
                                                Price per month
                                            </Label>
                                            <Input
                                                type="number"
                                                name="priceByTenure"
                                                id="priceByTenure"
                                                value={itemData.priceByTenure}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="age">How old is the product? (years)</Label>
                                            <Input
                                                type="number"
                                                name="age"
                                                id="age"
                                                value={itemData.age}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            <Input
                                                type="textarea"
                                                name="description"
                                                id="description"
                                                value={itemData.description}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                type="checkbox"
                                                name="availableToRent"
                                                id="availableToRent"
                                                checked={itemData.availableToRent}
                                                onChange={(e) =>
                                                    setItemData({
                                                        ...itemData,
                                                        availableToRent: e.target.checked,
                                                    })
                                                }
                                            />
                                            <Label for="availableToRent">Make it available to rent</Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="condition">
                                                Product Condition (1-10)
                                            </Label>
                                            <Input
                                                type="number"
                                                name="condition"
                                                id="condition"
                                                min="1"
                                                max="10"
                                                value={itemData.condition}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="productImg">Primary product image</Label>
                                            <Input
                                                type="file"
                                                name="productImg"
                                                id="productImg"
                                                onChange={handleImageChange}
                                            />
                                        </FormGroup>
                                        <Button type="submit" color="primary">
                                            Add Item
                                        </Button>
                                    </Form>
                                </>
                            )}
                        </>
                    )}
                </Container>
            </div>
        </Helmet>
    );
    
};

export default AddItem;
