"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
    });
    const user = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(()=>{
       if(user.username !== "")
       {
            navigate(`/home`);
       }
    }, [])

    

    const handleFormChange = async () => {
        console.log(inputs);
        console.log("Pressed signup");
        console.log(process.env.REACT_APP_SERVER);
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/users/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            console.log(data);

            if (data.success === true) {
                console.log("Redirecting");
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: "relative", padding: "20px" }}>
            <div style={{
                display: "flex",
                maxWidth: "1200px",
                margin: "0 auto",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h1 style={{ fontSize: "3rem", lineHeight: "1.2" }}>Rent or Borrow things on <span style={{
                        background: "linear-gradient(to right, red, pink)",
                        WebkitBackgroundClip: "text",
                        color: "transparent"
                    }}> LendScape</span> seamlessly!</h1>
                </div>

                <div style={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "15px",
                    padding: "30px",
                    maxWidth: "500px",
                    width: "100%",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <h2 style={{ fontSize: "2rem", color: "#333" }}>Become a part <span style={{
                            background: "linear-gradient(to right, red, pink)",
                            WebkitBackgroundClip: "text",
                            color: "transparent"
                        }}>!</span></h2>
                        <p style={{ color: "#666" }}>You can be anonymous, all we want is your email and a strong password &gt;:)</p>
                        <p onClick={() => navigate("/login")} style={{ color: "green", cursor: "pointer" }}>Already a member? Click me!!</p>
                    </div>

                    <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <input
                            onChange={(e) => setInputs(inputs => ({ ...inputs, name: e.target.value }))}
                            placeholder="Your name"
                            style={{
                                padding: "10px",
                                backgroundColor: "#f3f3f3",
                                border: "1px solid #ddd",
                                borderRadius: "5px"
                            }}
                        />
                        <input
                            onChange={(e) => setInputs(inputs => ({ ...inputs, username: e.target.value }))}
                            placeholder="a nice username"
                            style={{
                                padding: "10px",
                                backgroundColor: "#f3f3f3",
                                border: "1px solid #ddd",
                                borderRadius: "5px"
                            }}
                        />
                        <input
                            onChange={(e) => setInputs(inputs => ({ ...inputs, email: e.target.value }))}
                            placeholder="email@something.whatever"
                            style={{
                                padding: "10px",
                                backgroundColor: "#f3f3f3",
                                border: "1px solid #ddd",
                                borderRadius: "5px"
                            }}
                        />
                        <input
                            onChange={(e) => setInputs(inputs => ({ ...inputs, password: e.target.value }))}
                            placeholder="password (sshhh...)"
                            type="password"
                            style={{
                                padding: "10px",
                                backgroundColor: "#f3f3f3",
                                border: "1px solid #ddd",
                                borderRadius: "5px"
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleFormChange}
                            style={{
                                marginTop: "20px",
                                padding: "10px",
                                background: "linear-gradient(to right, red, pink)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "1rem",
                                cursor: "pointer"
                            }}
                        >
                            {loading ? "Loading..." : "Lesgo!"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
