import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
import { CiSearch } from "react-icons/ci";
import logoofinsidecontainer from "./assets/logoofinsidecontainer.png";
import threestars from "./assets/threestars.png";
import dotpixel from "./assets/dotpixel.png";
import smalldot from "./assets/smalldot.png";

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
import { getDistance } from "geolib";
const Saloonsformen = () => {
  const [nearestPlaces, setNearestPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [Locationfrominput, setLocationfrominput] = useState(null);
  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState(""); // New state for the address input
  const [findfirstthree, setfindfirstthree] = useState("");
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // console.log("currentlocation", currentLocation);
    if (currentLocation) {
      getPlaceName(currentLocation.latitude, currentLocation.longitude);
    }
  }, [currentLocation]);

  const getPlaceName = async (latitude, longitude) => {
    const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=6604f48bb31ba040960444oky6154fc`;
    console.log("latand lon", latitude, longitude);
    try {
      const response = await axios.get(apiUrl);
      setPlaceName(response.data.display_name);
    } catch (error) {
      console.error("Error retrieving place name:", error);
    }
  };

  useEffect(() => {
    sortlocation();
  }, [placeName]);

  useEffect(() => {
    console.log("nearestPlaces", nearestPlaces);
  }, [nearestPlaces]);

  const sortlocation = () => {
    if (placeName !== "") {
      let currentLocation2;
      if (Locationfrominput) {
        // alert("Search results ");
        currentLocation2 = Locationfrominput;
        console.log("HEEELLLO", currentLocation2);
      } else {
        currentLocation2 = {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        };
      }
      console.log("current location2", currentLocation2);

      let places2 = [];
      if (data.length > 0) {
        places2 = [];
        const temparayplace = data.map((item, index) => {
          places2.push({
            _id: item._id,
            name: item.heading,
            coordinates: {
              latitude: item.latitude,
              longitude: item.longitude,
            },
          });
        });

        console.log("places 2", places2);
      }

      let places = [
        {
          name: "THuckalay",
          coordinates: {
            latitude: 8.24177372548943,
            longitude: 77.32212861593982,
          },
        },
        {
          name: "marthdandam",
          coordinates: {
            latitude: 8.307252473793303,
            longitude: 77.22318633308191,
          },
        },
        {
          name: "villukuri",
          coordinates: {
            latitude: 8.22430110460471,
            longitude: 77.35195427419718,
          },
        },
        {
          name: "trivandrum",
          coordinates: {
            latitude: 8.527179499848486,
            longitude: 76.93887546889944,
          },
        },
        {
          name: "palpannai",
          coordinates: {
            latitude: 8.18252527216889,
            longitude: 77.41402684846703,
          },
        },

        {
          name: "kanyakumari",
          coordinates: {
            latitude: 8.083350708802255,
            longitude: 77.5564834370575,
          },
        },
      ];

      if (data.length > 0) {
        const idIndexMap = {};
        places2.forEach((item, index) => {
          idIndexMap[item._id] = index;
        });
        const sortedData = data.sort((a, b) => {
          return idIndexMap[a._id] - idIndexMap[b._id];
        });
        console.log("tempsort", sortedData);
        setfilteredDatapro(sortedData);
      }
      if (places2.length > 0) {
        places = places2;
      }
      const sortedPlaces = places.sort((a, b) => {
        const distanceA = getDistance(currentLocation2, a.coordinates);
        const distanceB = getDistance(currentLocation2, b.coordinates);
        return distanceA - distanceB;
      });
      setNearestPlaces(sortedPlaces);

      //filterdataproooooooooooooooooooooo
      let indexMap = new Map();

      // Populate the index map with the indices of sortedPlaces array
      sortedPlaces.forEach((item, index) => {
        indexMap.set(item._id, index);
      });

      // Sort the data array based on the index order in sortedPlaces array
      let reorderedData = data.sort((item1, item2) => {
        let index1 = indexMap.get(item1._id);
        let index2 = indexMap.get(item2._id);
        return index1 - index2;
      });

      console.log("Reordered data:", reorderedData);
      setfilteredDatapro(reorderedData);
    }
  };

  const handleGeocode = async () => {
    alert("GEO CODE");
    try {
      console.log("ADDRESS ENTERED", address);
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${address}&api_key=6604f48bb31ba040960444oky6154fc`
      );
      console.log("RESponse from the geocode", response.data[0]);
      const { lat, lon } = response.data[0]; // Assuming the API returns latitude and longitude
      console.log("LATANDLONG", lat, lon);
      setLocationfrominput({ latitude: lat, longitude: lon });
      setPlaceName(address);
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

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

    //commented now
    navigate("/serviceformen");
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
      // console.log(
      //   "RES FROM BACKEND ................->  \n",
      //   response.data.saloonformen,
      //   " \n ...................................... "
      // );
      setData(response.data.saloonformen);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterImage = async () => {
    const x = data.filter(
      (item) => item.GENDER === "MALE" || item.GENDER === "UNISEX"
    );
    setfilteredDatapro(x);
    console.log("FiTLEred X", x);
  };

  useEffect(() => {
    fetchData();
    // Fetch data when component mounts
  }, []);

  useEffect(() => {
    console.log("DATA EXIST OR NOT", data);
    handleFilterImage(); // Filter data when 'data' state changes
  }, [data]);

  useEffect(() => {
    console.log("filteredDatapro filteredDatapro  \n", filteredDatapro);
  }, [filteredDatapro]);

  return (
    <Container fluid>
      <div style={{ position: "sticky", top: "0", zIndex: "100" }}>
        <Navbarofthesaloon backgroundcolor="black" color="white" />
      </div>

      <div>
        {/* <h1>Current Location:</h1>
        {currentLocation && (
          <div>
            <p>Latitude: {currentLocation.latitude}</p>
            <p>Longitude: {currentLocation.longitude}</p>
          </div>
        )}
        <h1>Current place Name:</h1>
        {placeName && <p>{placeName}</p>}
        <h1>Enter Address for Geocoding:</h1>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter address"
        />
        <button onClick={handleGeocode}>Geocode</button>

        <p>Geocode lat{Locationfrominput && Locationfrominput.latitude}</p>
        <p>Geocode long{Locationfrominput && Locationfrominput.longitude}</p>
        <h1>Nearest place order</h1>

        {nearestPlaces.map((place, index) => (
          <li key={index}>{place.name}</li>
        ))} */}
        {/* 
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="ENTER ADDRESS"
        />
        <button onClick={handleGeocode}>Geocode</button> */}
      </div>
      <input />
      <Container style={{ marginTop: "50px" }}>
        <Row>
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
                color: "black",
              }}
              onChange={handleAddressChange}
              value={address}
            />
            <InputGroup.Text
              style={{
                borderTopRightRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
              onClick={handleGeocode}
            >
              <CiSearch />
            </InputGroup.Text>
          </InputGroup>
        </Row>
        <Row style={{ marginBottom: "50px" }}>
          <Col>
            <h1
              style={{
                fontFamily: "Petrona, serif",
                color: "rgba(53, 53, 53, 1)",
                fontWeight: "700",
              }}
            >
              Salons for Men
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
                    placeholder="Search for salons"
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
              {/* {console.log("filterdataborrrrrr", filteredDatapro)} */}
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
                        // marginTop: "10px",
                        marginBottom: "20px",
                      }}
                      className="displayofthefiltereditems"
                      onClick={() => onclickonthedispfilter(item)}
                    >
                      <Row>
                        <Col className="col-12 col-lg-3  contitemdotthelogo">
                          <img
                            style={{
                              // paddingTop: "20px",
                              // paddingLeft: "20px",
                              marginTop: "10px",
                              marginLeft: "40px",
                              marginRight: "20px",
                              width: "95%",
                              height: "95%",
                              objectFit: "cover",
                              borderRadius: "10px",
                              // maxWidth: "100%",
                              // maxHeight: "100%",
                              // width: "auto",
                              // height: "auto",
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
                              fontSize: "10px",
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
                                  display: "flex",
                                  justifyContent: "center",
                                  padding: "0px",
                                }}
                              >
                                <h6
                                  style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                    marginTop: "5px",
                                    fontSize: "17px",
                                    color:
                                      item.status.toUpperCase() === "OPEN"
                                        ? "green"
                                        : "red",
                                  }}
                                >
                                  {item.status}
                                </h6>

                                <img
                                  style={{
                                    height: "5px",
                                    marginTop: "13px",
                                    marginLeft: "px",
                                  }}
                                  src={smalldot}
                                  alt=""
                                />
                              </Col>
                              <Col
                                className="col-6  sm-4  col-lg-4 col-xl-3"
                                style={{
                                  padding: "0px",
                                  borderRight:
                                    "1px solid rgba(204, 204, 204, 1)",
                                }}
                              >
                                <h6
                                  style={{
                                    marginTop: "5px",
                                    fontSize: "17px",
                                    textAlign: "center",
                                  }}
                                >
                                  {item.status.toUpperCase() === "OPEN"
                                    ? ` ${item.closingtime}`
                                    : `Opens at ${
                                        item.openingtime !== (null || undefined)
                                          ? item.openingtime
                                          : "no data"
                                      }`}
                                </h6>
                              </Col>
                              <Col
                                className="col-6  sm-4 col-lg-4 col-xl-3"
                                style={{
                                  padding: "0px",
                                  borderRight:
                                    "1px solid rgba(204, 204, 204, 1)",
                                }}
                              >
                                <h6
                                  style={{
                                    marginTop: "5px",
                                    textAlign: "center",
                                    fontSize: "17px",
                                  }}
                                >
                                  REVIEWS ({item.reviews})
                                </h6>
                              </Col>
                              <Col
                                className="col-6 sm-4 col-lg-5 col-xl-3"
                                style={{
                                  padding: "0px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  display: "flex",
                                  borderRight:
                                    "1px solid rgba(204, 204, 204, 1)",
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
                                  borderRight:
                                    "1px solid rgba(204, 204, 204, 1)",
                                }}
                              >
                                <img
                                  style={{
                                    marginTop: "2px",
                                    height: "30px",
                                    paddingBottom: "5px",
                                  }}
                                  src={image}
                                  alt=""
                                />
                              </Col>
                              <Col
                                className="col-6  sm-4 col-lg-4 col-xl-1"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                }}
                              >
                                <h6
                                  style={{
                                    marginTop: "5px",
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
                                  justifyContent: "start",
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
                                    // paddingLeft: "30px",
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

export default Saloonsformen;
