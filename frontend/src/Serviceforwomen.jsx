import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import "./styles/Serviceformen.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
import Footer from "./ui-components/Footer";
import { AVAILABLESERVICES, TYPES } from "./Resources/ServiceformenDummy";
import { Addedtobebooked } from "./Resources/Addedtobebooked";
import { STYLISHMENDETAILS } from "./Resources/SelectStylishMenDummy";
import clock from "./assets/clockpixeled.png";
import moneyimage from "./assets/moneypixeleted.png";
import close from "./assets/closepixelated.png";
import ReactSearchBox from "react-search-box";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { wholedatacredentials } from "./Reducers/wholedata";

const Serviceformen = () => {
  const dispatch = useDispatch();
  const wholeDataREDUX = useSelector((state) => state.wholedata.value);

  useEffect(() => {
    console.log("whole data ...............", wholeDataREDUX);
    if (Object.keys(wholeDataREDUX.data.saloondetails).length === 0) {
      navigate("/saloonsforwomen");
    }
  }, []);

  let location = useLocation();

  // const headingpassedfromsaloon = location.state.saloonname;
  // const IDpassedfromsaloon = location.state.saloonnameID;

  const headingpassedfromsaloon = wholeDataREDUX.data.saloondetails.saloonname;
  const IDpassedfromsaloon = wholeDataREDUX.data.saloondetails.saloonnameID;

  // console.log("IDpassedfromsaloon", IDpassedfromsaloon);
  const [filteredSearchData, setFilteredSearchData] = useState("");
  const [searchValue, setSearchValue] = useState("Doe");
  const data2 = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];
  const handleSearch = (value) => {
    setSearchValue(value);
    // console.log("filteredIMGDATA IN the searCH", filteredIMGDATA);

    const filteredservice = filteredSearchData.filter((item) =>
      item.heading.toLowerCase().includes(value.toString().toLowerCase())
    );
    setFiltereImgDat(filteredservice);
  };

  const [selectedService, setselectedservice] = useState([]);
  const [serviceTypes, setserviceTypes] = useState("");
  const [serIMGandDATAS, SetservIMGandDATAS] = useState("");
  const [filteredIMGDATA, setFiltereImgDat] = useState("");
  const [closedID, setClosedID] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [totalTime, setTotaltime] = useState(0);
  const [convertedTime, setConvertedTime] = useState("0hours");
  const [totalAmount, setTotalAmount] = useState(0);
  const [wholeData, setwholedata] = useState({
    HAIRCUT: false,
    HAIRCOLOUR: false,
    BEARD: false,
    FACIAL: false,
    GROOMPACKAGES: false,
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/serviceformenimageroute/data",
        {
          params: {
            IDpassedfromsaloon: IDpassedfromsaloon,
          },
        }
      );

      const response2 = await axios.get(
        "http://127.0.0.1:5000/serviceformenimageroute/images",
        {
          params: {
            IDpassedfromsaloon: IDpassedfromsaloon,
          },
        }
      );

      setserviceTypes(response.data.saloonformen);
      SetservIMGandDATAS(response2.data.saloonformen);
      setFiltereImgDat(response2.data.saloonformen);
      setFilteredSearchData(response2.data.saloonformen);
      // console.log("response from the backend", response);

      // console.log("response from the backend", response.data.saloonformen);
      // console.log("FILTERRRRRRRRR", response2.data);
      // console.log("setservice", serIMGandDATAS);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleclosebuttonclick = (itempromax, index) => {
    const updatedFilteredIMGDATA = filteredIMGDATA.map((item, i) => {
      if (item._id === itempromax._id) {
        // console.log("index and i", i, index);

        item.isadded = item.isadded === "add" ? "Added" : "add";
        setTotalItems(selectedService.length - 1);
        setTotalAmount((prevamount) => prevamount - itempromax.amount);

        // console.log("ITEM", item);
        // console.log("ITEM PRO MAX", itempromax);
      }
      if (addedItems.index === false) {
        console.log("FSDFSDFSDFSDFSD");
      }

      return item;
    });
    setFiltereImgDat(updatedFilteredIMGDATA);

    const x = selectedService.filter((item) => {
      return item._id !== itempromax._id;
    });

    setClosedID(x);
    setselectedservice(x);
    setTotaltime((prevtime) => prevtime - itempromax.timevalue);
    // console.log("xxxxxxxxxx", x);
  };
  useEffect(() => {
    // console.log("TOTALITEMSSSSS", totalItems);
  }, [totalItems]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    typesmapfuncwrapper();
  }, [serviceTypes, serIMGandDATAS]);
  useEffect(() => {
    // console.log("Closed", closedID);
  }, [closedID]);
  useEffect(() => {
    // console.log("totalTime", totalTime);
    let minutesValue = parseInt(totalTime);
    let hoursValue = Math.floor(minutesValue / 60);
    let remainingMinutesValue = minutesValue % 60;
    if (hoursValue < 1) {
      setConvertedTime(`   ${remainingMinutesValue} mins `);
    }
    if (hoursValue >= 1) {
      setConvertedTime(`${hoursValue} hours   ${remainingMinutesValue} mins `);
    }
  }, [totalTime]);
  useEffect(() => {
    // console.log("CONVERTED TiME", convertedTime);
  }, [convertedTime]);

  const typesmapfuncwrapper = () => {
    if (serviceTypes) {
      const c = serviceTypes.map((item) => {});
    }
  };
  const handleTypesclick = (item) => {
    setwholedata((prevState) => ({
      ...prevState,
      [item]: true,
    }));
    const x = serIMGandDATAS.map((mapsingle) => {});
    const y = serIMGandDATAS.filter((filteredPARAM) => {
      return filteredPARAM.style === item;
    });

    setFiltereImgDat(y);
  };

  const [addedItems, setAddedItems] = useState({});
  const navigate = useNavigate();

  const handleAdd = (itempromax, index) => {
    // console.log("ADDED ITMEM chheck", itempromax);
    const updatedFilteredIMGDATA = filteredIMGDATA.map((item, i) => {
      if (i === index) {
        item.isadded = item.isadded === "add" ? "Added" : "add";
      }
      return item;
    });

    setAddedItems((prevState) => ({
      ...prevState,
      [index]: prevState[index],
    }));

    if (addedItems[index] == true) {
      // console.log("TRUTHY");
      const x = selectedService.filter((v) => {
        return itempromax._id !== v._id;
      });
      setselectedservice(x);
      // console.log("SS", selectedService);
    } else {
      setTotalItems(selectedService.length + 1);
      setTotaltime((prevtime) => prevtime + itempromax.timevalue);
      setTotalAmount((prevamount) => prevamount + itempromax.amount);
      const y = selectedService.filter((yitem) => {
        return yitem._id !== itempromax._id;
      });

      y.push(itempromax);

      // console.log(itempromax.isadded);
      if (itempromax.isadded === "add") {
        // console.log("CRINGE");
        setTotaltime((prevtime) => prevtime - itempromax.timevalue);
        setTotalItems(selectedService.length);
        setTotalAmount((prevamount) => prevamount - itempromax.amount);
        // console.log(totalItems);
      }
      if ((itempromax.isadded = "Added")) {
        console.log("SDFSDFS");
      }

      setselectedservice(y);

      // console.log(" yitem._id===itempromax._id", y);
    }
    setFiltereImgDat(updatedFilteredIMGDATA);
  };

  const handleselectstylish = () => {
    const someTempvar = wholeDataREDUX;
    // console.log("wholeDataREDUX", wholeDataREDUX);

    dispatch(
      wholedatacredentials({
        data: {
          saloondetails: someTempvar.data.saloondetails,
          servicedetails: {
            headingpassedfromsaloon: headingpassedfromsaloon,
            selectedService: selectedService,
          },
          stylishdetails: someTempvar.data.stylishdetails,
        },
      })
    );

    // navigate("/selectstylishwomen", {
    //   state: {
    //     headingpassedfromsaloon: headingpassedfromsaloon,
    //     selectedService: selectedService,
    //   },
    // });

    //comented now
    navigate("/selectstylishwomen");
  };
  return (
    <Container fluid style={{ position: "relative" }}>
      <Row>
        <Col>
          <Navbarofthesaloon backgroundcolor="black" color="white" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Container style={{ marginTop: "50px" }}>
            <Row>
              <Col className=" col-12 col-md-8 col-lg-6">
                <h1
                  style={{
                    fontFamily: "Petrona, serif",
                    color: "rgba(53, 53, 53, 1)",
                    fontWeight: "700",
                  }}
                >
                  Services for Women @ {headingpassedfromsaloon}
                </h1>
              </Col>
              <Col className=" col-12 col-md-8 col-lg-6 searchbar">
                <div>
                  <div
                    className="col-11"
                    style={{
                      display: "flex",

                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      borderTopLeftRadius: "25px",
                      borderBottomLeftRadius: "25px",
                      boxShadow: "0px 4px 6px 4px rgba(0, 0, 0, 0.1) ",
                    }}
                  >
                    <div
                      className="col-10 "
                      style={{
                        marginTop: "5px",
                        paddingLeft: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <ReactSearchBox
                        style={{ paddingTop: "10px" }}
                        placeholder="Search for saloons"
                        value={searchValue}
                        data={filteredIMGDATA}
                        onChange={(value) => handleSearch(value)}
                        // onSelect={(record) => console.log(record)}
                        rightIcon={<>🎨</>}
                        inputHeight="20px"
                        inputBorderColor="white"
                      />
                    </div>

                    <div
                      style={{
                        borderTopRightRadius: "25px",
                        borderBottomRightRadius: "25px",
                        color: "white",
                        background: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="col-2"
                    >
                      <CiSearch />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="rowofthemain">
        <Col md={10} lg={3}>
          <Container
            style={{
              border: "1px solid rgba(205, 205, 205, 1)  ",
              borderRadius: "10px",
            }}
          >
            {serviceTypes.length > 0 &&
              serviceTypes.map((item, index) => (
                <Row
                  onClick={() => handleTypesclick(item.types)}
                  style={{ height: "64px" }}
                >
                  <Col
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "grid",
                      borderBottom: " 1px solid rgba(205, 205, 205, 1) ",
                    }}
                    className="catorgoriescolumn"
                  >
                    <h4 style={{ fontSize: "20px" }}>{item.types}</h4>
                  </Col>
                </Row>
              ))}
          </Container>
        </Col>
        <Col md={10} lg={5}>
          <Container fluid>
            {filteredIMGDATA.length > 0 &&
              filteredIMGDATA.map(function (itempromax, index) {
                //let username = data.username;
                // console.log("here!!!", itempromax);

                const blob = new Blob(
                  [Int8Array.from(itempromax.logo.data.data)],
                  {
                    type: itempromax.contentType,
                  }
                );

                const image = window.URL.createObjectURL(blob);

                return (
                  <Container
                    fluid
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "30px",
                      paddingBottom: "15px",
                      border: "1px solid rgba(205, 205, 205, 1)",
                      borderRadius: "10px",

                      marginBottom: "25px",
                    }}
                  >
                    <Row>
                      <Col
                        style={{
                          display: "grid",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={2}
                      >
                        <img
                          style={{
                            marginTop: "10px",
                            maxWidth: "70px",
                            borderRadius: "10px",
                          }}
                          src={image}
                          alt=""
                        />
                      </Col>
                      <Col
                        style={{
                          display: "grid",
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                        md={9}
                      >
                        <Container fluid>
                          <Row>
                            <Col className="columnmiddlesecondcont">
                              <h6
                                classname="itemdotheheadingmiddle"
                                style={{
                                  fontFamily: "petrona,serif",
                                  fontWeight: "700",
                                  paddingTop: "10px",
                                  fontSize: "20px",
                                }}
                              >
                                {itempromax.heading}
                              </h6>
                              <div className="d-flex  dflexcontmiddle">
                                <img
                                  src={clock}
                                  style={{ height: "30px", marginTop: "10px" }}
                                  alt=""
                                />
                                <p
                                  style={{
                                    fontFamily: "poppins,sans-serif",
                                    paddingLeft: "10px",
                                    paddingTop: "15px",
                                    fontWeight: "300",
                                    color: "rgba(53, 53, 53, 1)",
                                    fontSize: "15px",
                                  }}
                                >
                                  {itempromax.timevalue}
                                  mins
                                </p>
                                <img
                                  src={moneyimage}
                                  style={{
                                    height: "30px",
                                    marginTop: "10px",
                                    paddingLeft: "20px",
                                  }}
                                  alt=""
                                />
                                <h6
                                  style={{
                                    fontFamily: "poppins,sans-serif",
                                    paddingTop: "17px",
                                    paddingLeft: "10px",

                                    fontWeight: "700",
                                    color: "rgba(53, 53, 53, 1)",
                                    fontSize: "18px",
                                  }}
                                >
                                  <span>{itempromax.currency}</span>
                                  {itempromax.amount}
                                </h6>
                              </div>
                            </Col>
                            <Col
                              style={{
                                display: "grid",
                                justifyContent: "center",
                                alignContent: "center",
                              }}
                              md={1}
                            >
                              <Button
                                className="buttonofthesecondcontainer"
                                style={{
                                  width: "70px",
                                  background:
                                    itempromax.isadded === "add"
                                      ? "black"
                                      : "white",
                                  color:
                                    itempromax.isadded === "add"
                                      ? "white"
                                      : "black",
                                  padding:
                                    itempromax.isadded === "add"
                                      ? "5px 10px"
                                      : "5px 12px",

                                  border: "1px solid black",
                                }}
                                onClick={() => handleAdd(itempromax, index)}
                              >
                                {itempromax.isadded}
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                );
              })}
          </Container>
        </Col>
        <Col md={10} lg={4}>
          <Container
            style={{
              minHeight: "100px",
              marginTop: "0px",
              border: "1px solid #CDCDCD",
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
            className="ternarycontainer"
            fluid
          >
            <Container
              className="ternarycsinglecontainer"
              fluid
              style={{ marginBottom: "10px", minHeight: "100px" }}
            >
              <Row>
                <Col>
                  {selectedService.length > 0 &&
                    selectedService.map(function (itempromax, index) {
                      //let username = data.username;
                      // console.log("here!!!", itempromax);
                      const blob = new Blob(
                        [Int8Array.from(itempromax.logo.data.data)],
                        {
                          type: itempromax.contentType,
                        }
                      );
                      // console.log(
                      //   "YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
                      // );
                      const image = window.URL.createObjectURL(blob);

                      return (
                        <Container className="singleternarycont">
                          <Row>
                            <Col
                              style={{ padding: "0px" }}
                              className="col-lg-2 col-2 col-md-2   col-xl-2 itemdotlogocol"
                            >
                              <img
                                style={{ maxHeight: "50px" }}
                                src={image}
                                alt=""
                              />
                            </Col>
                            <Col className="col-lg-8 col8 col-sm-8 col-md-8 col-xl-9">
                              <Container fluid>
                                <Row>
                                  <Col>
                                    <h6
                                      style={{
                                        textAlign: "start",
                                        fontFamily: "petrona,serif",
                                        fontWeight: "700",
                                        fontSize: "19px",
                                      }}
                                    >
                                      {itempromax.heading}
                                    </h6>
                                  </Col>
                                </Row>
                                <Row style={{ padding: "0px", margin: "0px" }}>
                                  <Col
                                    className="col-6"
                                    style={{
                                      display: "flex",
                                      paddingLeft: "20px",
                                      padding: "0px",
                                      margin: "0px",
                                    }}
                                  >
                                    <img
                                      src={clock}
                                      style={{
                                        height: "25px",
                                      }}
                                      alt=""
                                    />{" "}
                                    <p
                                      style={{
                                        color: "rgba(121, 121, 121, 1)",
                                        fontFamily: "poppins,sans-serif",
                                        paddingTop: "2px",
                                        fontSize: "16px",
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      {itempromax.timevalue}
                                      mins
                                    </p>
                                  </Col>
                                  <Col
                                    className="col-6"
                                    style={{
                                      display: "flex",
                                      paddingLeft: "20px",
                                      padding: "0px",
                                      margin: "0px",
                                    }}
                                  >
                                    <img
                                      src={moneyimage}
                                      style={{
                                        height: "25px",
                                      }}
                                      alt=""
                                    />{" "}
                                    <p
                                      style={{
                                        fontFamily: "poppins,sans-serif",
                                        paddingTop: "2px",
                                        fontSize: "16px",
                                        paddingLeft: "10px",
                                        fontWeight: "700",
                                        color: "rgba(53, 53, 53, 1)",
                                      }}
                                    >
                                      {itempromax.currency}
                                      {itempromax.amount}
                                    </p>
                                  </Col>
                                </Row>
                              </Container>
                            </Col>
                            <Col className="  col-lg-1 col-2  col-sm-2 col-md-2  col-xl-1">
                              <img
                                style={{
                                  marginRight: "10px",
                                  marginTop: "14px",
                                  maxHeight: "30px",
                                  cursor: "pointer",
                                }}
                                src={close}
                                alt=""
                                onClick={() =>
                                  handleclosebuttonclick(itempromax, index)
                                }
                              />
                            </Col>
                          </Row>
                        </Container>
                      );
                    })}
                </Col>
              </Row>
            </Container>
            <Container>
              <Row
                style={{
                  marginBottom: "30px",
                  marginTop: "20px",
                  borderTop: "1px solid rgba(205, 205, 205, 1)",
                  paddingTop: "25px",
                }}
              >
                <Col
                  style={{ paddingRight: "0px", marginLeft: "10px" }}
                  className="col-2 "
                >
                  <div className="d-flex flex-column">
                    <p
                      style={{
                        fontFamily: "poppins,sans-serif",
                        fontWeight: "300",
                        fontSize: "10px",

                        margin: "0px",
                      }}
                    >
                      {/* 02 Items */}
                      {totalItems} Items
                    </p>
                    <h6
                      style={{
                        fontFamily: "poppins,sans-serif",
                        fontWeight: "600",
                        fontSize: "15px",

                        margin: "0px",
                      }}
                    >
                      {convertedTime.length > 0 && convertedTime}
                    </h6>
                  </div>
                </Col>
                <Col
                  style={{
                    paddingLeft: "10px",
                    borderLeft: "2px solid rgba(205, 205, 205, 1)",
                  }}
                  className="col-3"
                >
                  <h6
                    style={{
                      fontFamily: "poppins,sans-serif",
                      fontWeight: "600",
                      fontSize: "15px",
                      paddingTop: "15px",
                      margin: "0px",
                    }}
                  >
                    Rs.{totalAmount}
                  </h6>
                </Col>
                <Col className="col-6">
                  <Button
                    style={{ border: "1px solid black" }}
                    className="buttonofsecondary "
                    onClick={handleselectstylish}
                  >
                    <h6
                      style={{
                        fontFamily: "poppins,sans-serif",
                        fontWeight: "600",
                        fontSize: "13px",
                        padding: "5px",
                        margin: "0px",
                      }}
                    >
                      Select Stylish
                    </h6>
                  </Button>
                </Col>
              </Row>
            </Container>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: "300px" }}>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Serviceformen;
