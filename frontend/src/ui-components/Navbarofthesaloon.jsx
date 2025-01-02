import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
// import sissorswhite from "../assets/sissorswhite.png";

import searchblacknavbar from "../assets/searchblacknavbar.png";
// import sissorspixelated from "../assets/sissorspixelated.png";
import logo from "../assets/logo.png";
import locationpixelated from "../assets/locationpixelated.png";
import { CiSearch } from "react-icons/ci";
import targesearch from "../assets/targesearch.png";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { InputGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Router } from "react-router-dom";
import axios from "axios";

const Navbarofthesaloon = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const handlecurrentlocclick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const [navbarsearchvalue, setnavbarsearchbar] = useState();
  const [resultofauto, setresultofauto] = useState();
  useEffect(() => {
    console.log("resultofauto", resultofauto);
  }, [resultofauto]);
  const handlelocationclick = () => {
    setnavbarsearchtoggle(!navbarsearchtoggle);
  };

  const fetchAutocomplete = async () => {
    // alert("fetcing");
    const apiUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${navbarsearchvalue}&lang=en&type=street&format=json&apiKey=b354cc830ade4a06975096680ca28c2f`;
    // console.log("latand lon", latitude, longitude);
    try {
      const response = await axios.get(apiUrl);
      console.log("RES", response.data);
      setresultofauto(response.data.results);
    } catch (error) {
      console.error("Error retrieving place name:", error);
    }
  };
  const handleAddressChange = (e) => {
    setnavbarsearchbar(e.target.value);
    fetchAutocomplete();
  };

  const navbarsearch = () => {
    // fetchAutocomplete();
  };
  const [navbarsearchtoggle, setnavbarsearchtoggle] = useState();
  const [hovered, sethovered] = useState(false);
  const [hoveredtwo, sethoveredtwo] = useState(false);
  const [hoveredthree, sethoveredthree] = useState(false);
  const [roleson, setroleson] = useState("Sdfsd");
  const [hoveredfour, sethoveredfour] = useState(false);

  const changeHoverfunc = () => {
    sethovered(!hovered);
  };
  const changeHoverfunctwo = () => {
    sethoveredtwo(!hoveredtwo);
  };
  const changeHoverfuncthree = () => {
    sethoveredthree(!hoveredthree);
  };
  const changeHoverfuncfour = () => {
    sethoveredfour(!hoveredfour);
  };
  return (
    <div>
      <Navbar
        expand="lg"
        className=""
        style={{
          minHeight: "100px",

          // backgroundColor: "rgba(1, 11, 15, 0.2)",
          backgroundColor: props.backgroundcolor,
        }}
      >
        <Container fluid>
          <Navbar.Brand href="#" style={{ paddingLeft: "100px" }}>
            {/* <img src={sissorspixelated} style={{ height: "40px" }} alt="" /> */}
            <img src={logo} style={{ height: "100%", width:"200px", objectFit:"contain" }} alt="" />
          </Navbar.Brand>
          <Navbar.Brand
            href="#"
            className="d-none d-md-grid"
            style={{ paddingLeft: "50px" }}
          >
            <img src={Location} alt="" />
          </Navbar.Brand>
          <Navbar.Brand
            href="#"
            className="d-none d-md-flex"
            style={{
              paddingLeft: "20px",
              color: "white",
              zIndex: "100",
              paddingRight: "20px",
            }}
          >
            <img
              onClick={handlelocationclick}
              style={{
                height: "25px",
                marginTop: "4px",
                marginRight: "10px",
                display: navbarsearchtoggle === true ? "none" : "grid",
              }}
              src={locationpixelated}
              alt=""
            />

            <p
              style={{ display: navbarsearchtoggle === true ? "none" : "grid" }}
              onClick={handlelocationclick}
            >
              INDIA
            </p>
            <div>
              <div
                style={{
                  display: navbarsearchtoggle === true ? "grid" : "none",
                  marginLeft: "42px",
                }}
              >
                <InputGroup
                  style={{
                    height: "40px",
                    minWidth: "350px",
                    maxWidth: "480px",
                    backgroundColor: " rgba(255, 255, 255, 0.1)",

                    // borderRadius: "25px",
                  }}
                >
                  <Form.Control
                    type="text"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      color: "black",
                    }}
                    placeholder="Search city, area or locality"
                    onChange={handleAddressChange}
                    // value={address}
                  />
                  <InputGroup.Text
                    style={{
                      position: "absolute",
                      left: "-40px",
                      border: "none",
                      // left: "400px",
                      color: "black",
                      height: "40px",
                      borderRadius: "5px",
                    }}
                    onClick={navbarsearch}
                  >
                    <img
                      src={searchblacknavbar}
                      style={{ height: "25px" }}
                      alt=""
                      srcset=""
                    />
                    {/* <CiSearch /> */}
                  </InputGroup.Text>
                </InputGroup>
              </div>

              <div
                style={{
                  display: navbarsearchtoggle === true ? "grid" : "none",
                }}
              >
                <li
                  style={{
                    backgroundColor: "white",
                    border: "1px solid black",
                    marginBottom: "2px",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    color: "black",
                    listStyle: "none",
                  }}
                  onClick={() => {}}
                  // onClick={}
                >
                  <div
                    style={{ display: "grid" }}
                    onClick={handlecurrentlocclick}
                  >
                    <Row>
                      <Col className="col-2">
                        <img
                          src={targesearch}
                          style={{ height: "25px" }}
                          alt=""
                          srcset=""
                        />
                      </Col>
                      <Col className="col-10">
                        <p
                          style={{
                            color: "rgba(80, 80, 80, 1)",
                            width: "100px",
                          }}
                        >
                          Use Current Location
                        </p>
                      </Col>
                    </Row>
                  </div>
                </li>
                {resultofauto !== undefined && resultofauto.length > 0
                  ? resultofauto.map((result, index) => (
                      <li
                        key={index}
                        style={{
                          backgroundColor: "white",
                          border: "1px solid black",
                          marginBottom: "2px",
                          borderRadius: "2px",
                          padding: "5px 10px",
                          cursor: "pointer",
                          color: "black",
                          textDecoration: "none",
                          listStyle: "none",
                        }}
                        onClick={() => {}}
                        // onClick={}
                      >
                        {result.street}
                      </li>
                    ))
                  : ""}
              </div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            style={{ background: props.color }}
            aria-controls="navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* <Nav.Link href="#action1">Home</Nav.Link> */}

              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {/* <Form className="d-flex">c
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <Navbar.Text onClick={changeHoverfunc} style={{ padding: "20px" }}>
              <a
                style={{
                  textDecoration: "none",
                  color: hovered ? "white" : "white",
                  borderBottom: hovered ? "1px solid white" : "",
                  paddingBottom: "10px",
                }}
                href="/"
              >
                Home
              </a>
            </Navbar.Text>
            <Navbar.Text style={{ padding: "20px" }}>
              <a
                onClick={changeHoverfunctwo}
                style={{
                  textDecoration: "none",
                  color: hoveredtwo ? "white" : "white",
                  borderBottom: hoveredtwo ? "1px solid white" : "",
                  paddingBottom: "10px",
                }}
                href="/myappointments"
              >
                My Appointments
              </a>
            </Navbar.Text>
            <Navbar.Text style={{ padding: "20px", paddingRight: "150px" }}>
              <a
                onClick={changeHoverfuncthree}
                style={{
                  textDecoration: "none",
                  color: hoveredthree ? "white" : "white",
                  borderBottom: hoveredthree ? "1px solid white" : "",
                  paddingBottom: "10px",
                }}
                href="/mobile"
              >
                Login{" "}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbarofthesaloon;
