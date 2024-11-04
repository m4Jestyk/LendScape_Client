import React, { useRef } from "react";

import { Container, Row, Col, Button } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import axios from "axios";
import logoImage from "../../assets/all-images/logols.jpg.png";


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/products",
    display: "Products",
  },

  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/users/logout`,
      {},
      { withCredentials: true }
    );

    if (res.data.success) {
      localStorage.setItem("auth", JSON.stringify({
        id: null,
        email: "",
        username: "",
      }));

      dispatch(setUser({
        id: null,
        email: "",
        username: "",
      }));
      navigate("/");
      // window.location.reload();
    }
    console.log(res.data);
  }

  const user = useSelector(state => state.auth);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                LendScape Beta
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {user.email === "" ? (
                  <Button className="d-flex align-items-center gap-1" onClick={() => navigate("/login")}>
                    <i className="ri-login-circle-line"></i> Login
                  </Button>
                ) : (
                  <Button className="d-flex align-items-center gap-1" onClick={handleLogout}>
                    <i className="ri-login-circle-line"></i> Logout
                  </Button>
                )}

                {user.email !== "" ? <Button onClick={()=> navigate("/additem")} className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Put an item on Sale
                </Button> : <></>}

                {user.email !== "" ? <Button onClick={()=> navigate("/dashboard")} className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Dashboard
                </Button> : <></>}


                {user.email === "" ? <Button onClick={()=> navigate("/signup")} className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Register
                </Button> : <></>}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                  <img
    src={logoImage}
    alt="LEND-SCAPE"
    style={{ width: "200px", height: "auto" }}
/>

                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                <h4>INDORE</h4>
                <h6>IET-DAVV</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                <h4>AVAILABLE</h4>
                <h6>24/7</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;