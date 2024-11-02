// Login.js

"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/authSlice";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  

useEffect(()=>{
    console.log(user);
    if(user.username !== "")
    {
        navigate(`/home`);
    }
}, [])


  const dispatch = useDispatch();

  const handleFormChange = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === true) {
        localStorage.setItem("auth", JSON.stringify({
          id: data._id,
          email: data.email,
          username: data.username,
        }));

        dispatch(setUser({
          id: data._id,
          email: data.email,
          username: data.username,
        }));
        navigate("/");
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "48px", lineHeight: "1.1", fontWeight: "bold" }}>
          Visit the
          <span style={{ background: "linear-gradient(to right, #F56565, #ED64A6)", WebkitBackgroundClip: "text", color: "transparent" }}> Lend </span>
          Scape!
        </h1>
      </div>

      <div style={{ backgroundColor: "#f0f0f0", borderRadius: "12px", padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "32px", color: "#333" }}>Welcome back <span style={{ background: "linear-gradient(to right, #F56565, #ED64A6)", WebkitBackgroundClip: "text", color: "transparent" }}>!</span></h2>
          <p style={{ color: "#555" }}>Ready to leap?</p>
          <p onClick={() => navigate("/signup")} style={{ color: "#555", cursor: "pointer" }}>New here? Click me!!</p>
        </div>

        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Your username"
            style={{ padding: "12px", backgroundColor: "#f2f2f2", border: "none", borderRadius: "8px", color: "#555" }}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                username: e.target.value,
              }))
            }
          />
          <input
            type="password"
            placeholder="Password (sshhh...)"
            style={{ padding: "12px", backgroundColor: "#f2f2f2", border: "none", borderRadius: "8px", color: "#555" }}
            onChange={(e) =>
              setInputs((inputs) => ({
                ...inputs,
                password: e.target.value,
              }))
            }
          />
          <button
            type="button"
            onClick={handleFormChange}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              background: "linear-gradient(to right, #F56565, #ED64A6)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {loading ? <span>Loading...</span> : "Take me in!"}
          </button>
        </form>
      </div>

      {/* Blurred circles (similar to Chakra Blur component) */}
      <div style={{
        position: "absolute",
        top: "-50px",
        left: "-50px",
        width: "300px",
        height: "300px",
        backgroundColor: "#F56565",
        borderRadius: "50%",
        filter: "blur(70px)",
        zIndex: -1,
      }}></div>
    </div>
  );
}
