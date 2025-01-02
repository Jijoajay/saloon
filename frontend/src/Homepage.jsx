import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import "./styles/Homepage.css";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import sissorswhite from "./assets/sissorswhite.png";
import saloonbackground from "./assets/saloonbackground.png";
import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
import MensgirlsSection from "./MensgirlsSection";
import axios from "axios";
import ReactSearchBox from "react-search-box";
import Homepagesearchbar from "./ui-components/Homepagesearchbar";

const Homepage = () => {
  // const data2 = ["saloons for men", "saloons for women", "saloons for unisex"];
  const data2 = [
    {
      key: "1",
      value: "salons for women",
    },
    {
      key: "2",
      value: "salons for men",
    },
    {
      key: "3",
      value: "salons for unisex",
    },
  ];
  const [searchValue, setSearchValue] = useState("Doe");
  const data = [
    {
      key: "1",
      value: "salons for men",
    },
    {
      key: "2",
      value: "salons for women",
    },
    {
      key: "3",
      value: "unisex salons",
    },
  ];
  let response;
  const [dataimage, setDataImage] = useState([]);
  const [bookappiontments, setbookappiontments] = useState(false);

  const bookappiontmentsfunc = () => {
    setbookappiontments(true);
  };

  return (
    <div>
      <Container
        fluid
        style={{ height: "100vh", display: bookappiontments ? "none" : "" }}
        className="containeroftheHomepage"
      >
        {/* {dataimage.map(function (data) {
          //let username = data.username;
          console.log("here!!!");
          const name = data.name;

          const blob = new Blob([Int8Array.from(data.img.data.data)], {
            type: data.img.contentType,
          });
          const image = window.URL.createObjectURL(blob);
          return (
            <div className="col-3">
              <div className="adjust">
                <div className="image">
                  <img width="300" height="300" src={image}></img>
                </div>
                <div className="name">{name}</div>
              </div>
            </div>
          );
        })}  */}
        <div>
          <Navbarofthesaloon
            backgroundcolor="rgba(1, 11, 15, 0.2)"
            color="white"
          />
        </div>

        {/* orginal */}
        <Container>
          <Row>
            <Col>
              <Homepagesearchbar data={data2} />

              {/*             
              <InputGroup
                style={{
                  height: "50px",
                  minWidth: "200px",
                  maxWidth: "480px",
                  backgroundColor: " rgba(255, 255, 255, 0.1)",
                  // borderRadius: "25px",

                  marginBottom: "50px",
                  marginTop: "50px",
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                }}
              >
                <Form.Control
                  type="text"
                  style={{
                    backgroundColor: " rgba(255, 255, 255, 0.1)",
                    borderTopLeftRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    color: "white",
                  }}
                />
                <InputGroup.Text
                  style={{
                    borderTopRightRadius: "25px",
                    borderBottomRightRadius: "25px",
                  }}
                >
                  <CiSearch />
                </InputGroup.Text>
              </InputGroup> */}

              {/* <div>
                <div
                  className="col-6"
                  style={{
                    display: "flex",
                    marginTop: "50px",
                    borderTopRightRadius: "25px",
                    borderBottomRightRadius: "25px",
                    borderTopLeftRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    // boxShadow: "0px 4px 6px 4px rgba(0, 0, 0, 0.1) ",

                    position: "relative",
                  }}
                >
                  <div
                    className="col-10 "
                    style={{
                      marginTop: "5px",
                      paddingLeft: "10px",
                      paddingBottom: "10px",
                      boxShadow: "none",
                    }}
                  >
                    <ReactSearchBox
                      placeholder="Search for salons"
                      value={searchValue}
                      data={data}
                      onChange={(value) => handleSearch(value)}
                      onSelect={(record) => console.log(record)}
                      rightIcon={<>🎨</>}
                      inputFontColor="white"
                      inputHeight="40px"
                      inputBorderColor="white"
                      inputBackgroundColor="rgba(255,255,255, 0)"
                      className="searchbar"
                    />
                  </div>

                  <div
                    style={{
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      color: "black",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "40px",
                      marginTop: "5px",
                      position: "absolute",
                      left: "500px",
                    }}
                    className="col-2"
                  >
                    <CiSearch />
                  </div>
                </div>
              </div> */}
            </Col>
          </Row>
          <Row>
            <Col>
              <h1
                style={{
                  color: "white",
                  fontSize: "60px",
                  marginBottom: "50px",
                }}
              >
                Get Appointment for
              </h1>
              <h6 style={{ color: "white", fontSize: "20px" }}>
                Nearby Beauty Services
              </h6>
              <h6 style={{ color: "white", fontSize: "20px" }}>
                Trust the most caring hands and best expertise for it.
              </h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                style={{
                  color: "black",
                  borderRadius: "25px",
                  // background: "white",
                  padding: "18px",
                  width: "300px",
                  marginTop: "50px",
                  border: "1px solid black",
                }}
                className="buttonofthehoempage"
                onClick={bookappiontmentsfunc}
              >
                Book Appointments
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Container>
      <div
        style={{
          display: bookappiontments ? "grid" : "none",
          height: "700px",
        }}
      >
        <MensgirlsSection />
      </div>
    </div>
  );
};

export default Homepage;
