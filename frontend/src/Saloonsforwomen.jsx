import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
import { CiSearch } from "react-icons/ci";
import logoofinsidecontainer from "./assets/logoofinsidecontainer.png";
import threestars from "./assets/threestars.png";
import MEN from "./assets/MEN.png";
import Locationpromax from "./assets/Locationpromax.png";
import "./styles/Saloonsformen.css";
import { useNavigate } from "react-router-dom";
import Footer from "./ui-components/Footer";
import FilterSaloonMen from "./ui-components/FilterSaloonMen";
import { DATA } from "./Resources/SaloonsformenDummy";
import axios from "axios";
import ReactSearchBox from "react-search-box";
import DisplayData from "./DisplayData";
import { useDispatch, useSelector } from "react-redux";
import { wholedatacredentials } from "./Reducers/wholedata";
const Saloonsforwomen = () => {
  const [currentlocationstate, setcurrentLocationstate] = useState("");
  const [placenamestate, setplacenamestate] = useState("");

  if ("geolocation" in navigator) {
    // Geolocation is supported
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract latitude and longitude from the position object
        console.log("Current position:", position);
        const { latitude, longitude } = position.coords;
        setcurrentLocationstate({ latitude: latitude, longitude: longitude });
        console.log("Current Location:", { latitude, longitude });
      },
      (error) => {
        // Handle error
        console.error("Error getting current location:", error);
      }
    );
  } else {
    // Geolocation is not supported
    console.error("Geolocation is not supported by this browser.");
  }

  const getPlaceName = async (latitude, longitude) => {
    const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=6604f48bb31ba040960444oky6154fc`;

    try {
      const response = await axios.get(apiUrl);
      setplacenamestate(response.data.display_name);
    } catch (error) {
      //   console.error("Error retrieving place name:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("currentlocationstate", currentlocationstate);
    getPlaceName(currentlocationstate.latitude, currentlocationstate.longitude);
    console.log(placenamestate);
  }, [currentlocationstate]);

  const dispatch = useDispatch();
  const wholeDataREDUX = useSelector((state) => state.wholedata.value);

  const [saloonnametobepassed, setsaloonnametobepassed] = useState("");

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
  const [filteredSearchData, setFilteredSearchData] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    const filtered = data2.filter((item) =>
      item.value.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSearchData(filtered);

    const filteredsaloon = data.filter((item) =>
      item.heading.toLowerCase().includes(value.toLowerCase())
    );
    setfilteredDatapro(filteredsaloon);
  };

  // useEffect(() => {
  //   console.log("SALOONNAME TO BE pASSED", saloonnametobepassed);
  // }, [saloonnametobepassed]);
  const onclickonthedispfilter = (item) => {
    console.log("AFTER CLICK SHOW ITEM", item);
    // setsaloonnametobepassed(item.heading);

    const someTempvar = wholeDataREDUX;
    console.log("wholeDataREDUX", wholeDataREDUX);

    // // console.log("wholeDataREDUX", wholeDataREDUX.data[0].saloondetails);

    dispatch(
      wholedatacredentials({
        data: {
          saloondetails: {
            saloonname: item.heading,
            saloonnameID: item._id,
          },
          servicedetails: someTempvar.data.servicedetails,
          stylishdetails: someTempvar.data.stylishdetails,
        },
      })
    );
    // console.log("wholeDataREDUX", wholeDataREDUX.data.stylishdetails);
    // someTempvar.data[0].saloondetails = {
    //   saloonname: item.heading,
    //   saloonnameID: item._id,
    // };

    // console.log("wholeDataREDUX", wholeDataREDUX);
    // navigate("/serviceforwomen", {
    //   state: {
    //     saloonname: item.heading,
    //     saloonnameID: item._id,
    //   },
    // });

    //commented now
    navigate("/serviceforwomen");
  };

  const [filteredDatapro, setfilteredDatapro] = useState([]);
  const [dataImagearray, setDataImagearray] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filtereddata, setfilteredData] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/saloonsformen/images"
      );
      console.log("RES FROM BACKEND", response.data.saloonformen);
      setData(response.data.saloonformen);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterImage = async () => {
    // console.log("Data from the Backend", data);
    // console.log("DAAATTAAAAAA", data);

    const x = data.filter((item) => item.GENDER !== "MALE");
    setfilteredDatapro(x);
    console.log("FiTLEred X", x);
  };

  useEffect(() => {
    fetchData();
    // Fetch data when component mounts
  }, []);

  useEffect(() => {
    console.log("DATAAA in the sallon bro", data);
    handleFilterImage(); // Filter data when 'data' state changes
  }, [data]);

  return (
    <Container fluid>
      <div style={{ position: "sticky", top: "0", zIndex: "100" }}>
        <Navbarofthesaloon backgroundcolor="black" color="white" />
      </div>

      <Container style={{ marginTop: "50px" }}>
        <Row style={{ marginBottom: "50px" }}>
          <Col>
            <h1
              style={{
                fontFamily: "Petrona, serif",
                color: "rgba(53, 53, 53, 1)",
                fontWeight: "700",
              }}
            >
              Saloons for Women
            </h1>
          </Col>
          <Col>
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
                    data={data}
                    onChange={(value) => handleSearch(value)}
                    onSelect={(record) => console.log(record)}
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
        {/* <Row>
          <Col>{filteredsearchdata}</Col>
        </Row> */}
      </Container>

      <Container>
        <Row>
          <Col className="col-12 col-lg-3">
            <Container style={{ position: "sticky", top: "150px" }}>
              <Row>
                <Col>
                  <FilterSaloonMen
                    setfilteredDatapro={setfilteredDatapro}
                    filteredDatapro={filteredDatapro}
                    data={data}
                    setData={setData}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col className="col-12 col-lg-9">
            <Container>
              {filteredDatapro.length > 0 &&
                filteredDatapro.map(function (item) {
                  //let username = data.username;
                  // console.log("here!!!", item);
                  const name = data.name;

                  const blob = new Blob(
                    [Int8Array.from(item.genderimage.data.data)],
                    {
                      type: item.contentType,
                    }
                  );
                  const blob2 = new Blob(
                    [Int8Array.from(item.locationimage.data.data)],
                    {
                      type: item.contentType,
                    }
                  );
                  const blob3 = new Blob(
                    [Int8Array.from(item.logo.data.data)],
                    {
                      type: item.contentType,
                    }
                  );
                  const blob4 = new Blob(
                    [Int8Array.from(item.stars.data.data)],
                    {
                      type: item.contentType,
                    }
                  );
                  const image = window.URL.createObjectURL(blob);
                  const image2 = window.URL.createObjectURL(blob2);
                  const image3 = window.URL.createObjectURL(blob3);
                  const image4 = window.URL.createObjectURL(blob4);

                  return (
                    <Container
                      style={{
                        // height: "210px",
                        margin: "0px",
                        padding: "0px",
                        paddingTop: "10px",
                        paddingBottom: "30px",
                        border: "1px solid rgba(205, 205, 205, 1)",
                        borderRadius: "15px",
                        marginTop: "10px",
                        marginBottom: "20px",
                      }}
                      className="displayofthefiltereditems"
                      onClick={() => onclickonthedispfilter(item)}
                    >
                      <Row>
                        <Col className="col-12 col-lg-3  contitemdotthelogo">
                          <img
                            style={{
                              paddingTop: "20px",
                              paddingLeft: "20px",

                              maxWidth: "100%",
                              maxHeight: "100%",
                              width: "auto",
                              height: "auto",
                            }}
                            src={image3}
                            alt=""
                            className="itemdotthelogo"
                          />
                        </Col>
                        <Col
                          style={{ paddingLeft: "10px" }}
                          className="col-12 col-lg-9 colcontaineroftheinnerdisp "
                        >
                          {" "}
                          <h4
                            style={{
                              fontFamily: "Petrona, serif",
                              fontWeight: "700",
                              fontSize: "30px",
                              marginBottom: "30px",
                              paddingTop: "18px",
                            }}
                            className="itemdotheheading"
                          >
                            {item.heading}
                          </h4>
                          <Container
                            style={{
                              // border: "1px solid  rgba(205, 205, 205, 1)",
                              minHeight: "40px",
                              maxHeight: "100px",
                              justifyContent: "space-evenly",
                              alignItems: "end",

                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "400",
                              color: "rgba(108, 108, 108, 1)",
                              // wordWrap: "break-word",
                              margin: "0px",
                              padding: "0px",
                              paddingLeft: "15px",
                            }}
                            className="smallcontainerwrap "
                          >
                            <Row>
                              <Col
                                className="col-6   sm-4 col-lg-4 col-xl-1"
                                style={{
                                  display: "grid",
                                  justifyContent: "center",
                                  padding: "0px",
                                }}
                              >
                                <h6 style={{ fontSize: "17px" }}>
                                  {item.status}
                                </h6>
                              </Col>
                              <Col
                                className="col-6  sm-4  col-lg-4 col-xl-3"
                                style={{ padding: "0px" }}
                              >
                                <h6
                                  style={{
                                    fontSize: "17px",
                                    textAlign: "center",
                                  }}
                                >
                                  {item.closingtime}
                                </h6>
                              </Col>
                              <Col
                                className="col-6  sm-4 col-lg-4 col-xl-3"
                                style={{ padding: "0px" }}
                              >
                                <h6
                                  style={{
                                    textAlign: "center",
                                    fontSize: "17px",
                                  }}
                                >
                                  {item.reviews}
                                </h6>
                              </Col>
                              <Col
                                className="col-6 sm-4 col-lg-5 col-xl-3"
                                style={{
                                  padding: "0px",
                                  justifyContent: "center",
                                  display: "flex",
                                }}
                              >
                                <img
                                  style={{
                                    height: "20px",
                                    // paddingBottom: "15px",
                                  }}
                                  src={image4}
                                  alt=""
                                />
                              </Col>
                              <Col
                                className="col-6   sm-4 col-lg-3 col-xl-1"
                                style={{
                                  display: "grid",
                                  justifyContent: "center",
                                  padding: "0px",
                                }}
                              >
                                <img
                                  style={{
                                    height: "30px",
                                    paddingBottom: "10px",
                                  }}
                                  src={image}
                                  alt=""
                                />
                              </Col>
                              <Col
                                className="col-6  sm-4 col-lg-4 col-xl-1"
                                style={{ padding: "0px" }}
                              >
                                <h6
                                  style={{
                                    textAlign: "center",
                                    fontSize: "17px",
                                  }}
                                >
                                  {item.gender}
                                </h6>
                              </Col>
                            </Row>
                          </Container>
                          <Container>
                            <Row
                              style={{
                                maxWidth: "650px",
                                justifyContent: "start",
                                alignItems: "center",
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "400",
                                color: "rgba(108, 108, 108, 1)",
                                marginTop: "25px",
                              }}
                              className="d-flex"
                            >
                              <Col
                                className="col-3 col-md-3  col-lg-1 d-flex "
                                style={{
                                  padding: "0px",
                                  justifyContent: "end",
                                }}
                              >
                                <img
                                  style={{
                                    paddingBottom: "10px",
                                  }}
                                  src={Locationpromax}
                                  alt=""
                                />
                              </Col>
                              <Col className="colitemdotlocation  col-9  col-md-9  col-lg-11">
                                <h6
                                  style={{
                                    paddingLeft: "30px",
                                    textAlign: "start",
                                    fontSize: "13px",
                                  }}
                                >
                                  {item.locationdetails}
                                </h6>
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
        </Row>
      </Container>
      <div style={{ marginTop: "170px" }}>
        <Footer />
      </div>
    </Container>
  );
};

export default Saloonsforwomen;
