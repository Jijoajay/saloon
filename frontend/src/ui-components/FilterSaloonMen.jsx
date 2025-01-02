import React, { useEffect, useState } from "react";
import { Row, Col, Button, Container, Form, InputGroup } from "react-bootstrap";
import filtersLogo from "../assets/filtersLogo.png";
import Togglebutton from "../assets/Togglebutton.png";
import "../styles/Saloonsformen.css";
import onestar from "../assets/onestar.png";
import twostars from "../assets/twostars.png";
import threestars from "../assets/threestars.png";
import fourstars from "../assets/fourstars.png";
import fivestars from "../assets/fivestars.png";
import upsidetoggle from "../assets/upsidetoggle.png";
const FilterSaloonMen = (props) => {
  const [onclickontogglegenders, setonclickontogglegenders] = useState(false);
  const [onclickontoggleLocation, setonclickontoggleLocation] = useState(false);
  const [onclickontoggleRatings, setonclickontoggleRatings] = useState(false);
  const [onclickontoggleHours, setonclickontoggleHours] = useState(false);

  // const [gender, setGender] = useState("MALE");
  // const [location, setLocation] = useState("NAGERCOIL");
  // const [ratingsvalue, setRatingsvalue] = useState("FIVE");
  // const [hours, setHours] = useState("ANYTIME");

  const [gender, setGender] = useState(null);
  const [location, setLocation] = useState(null);
  const [ratingsvalue, setRatingsvalue] = useState(null);
  const [hours, setHours] = useState(null);

  useEffect(() => {
    console.log("CUREENT RATING VALue", ratingsvalue);
  }, [ratingsvalue]);
  const handleFilterGENDER = (newGender) => {
    setGender(newGender);
  };
  const handleFilterlocation = (newlocation) => {
    setLocation(newlocation);
  };
  const handleFilterratingsvalue = (ratingsvalue) => {
    setRatingsvalue(ratingsvalue);
  };
  const handleFilterhours = (hours) => {
    setHours(hours);
  };

  // const handlemensFilter = () => {
  //   setwholestate((prevState) => ({
  //     ...prevState,
  //     GENDER: "MALE",
  //   }));

  //   const cringe = props.data.filter(
  //     (item) =>
  //       item.GENDER === wholestate.GENDER &&
  //       item.LOCATION === wholestate.LOCATION &&
  //       item.RATINGS === wholestate.RATINGS &&
  //       item.HOURS === wholestate.HOURS
  //   );

  //   // console.log(cringe, "cringe");
  //   props.setfilteredDatapro(cringe);
  //   console.log("crisnge", props.filteredDatapro, "cringe");
  //   console.log("bastard", props.filteredDatapro, "filtersdata");
  // };
  // const handleGirlsFilter = () => {
  //   setwholestate((prevState) => ({
  //     ...prevState,
  //     GENDER: "FEMALE",
  //   }));

  //   const cringe = props.data.filter(
  //     (item) =>
  //       item.GENDER === wholestate.GENDER &&
  //       item.LOCATION === wholestate.LOCATION &&
  //       item.RATINGS === wholestate.RATINGS &&
  //       item.HOURS === wholestate.HOURS
  //   );
  //   props.setfilteredDatapro(cringe);
  //   console.log("cringe", props.filteredDatapro, "cringe");
  //   console.log("bastard", props.filteredDatapro, "filtersdata");
  // };
  // const handleUNISEXFILTER = () => {
  //   setwholestate((prevState) => ({
  //     ...prevState,
  //     GENDER: "UNISEX",
  //   }));

  //   const cringe = props.data.filter(
  //     (item) =>
  //       item.GENDER === wholestate.GENDER &&
  //       item.LOCATION === wholestate.LOCATION &&
  //       item.RATINGS === wholestate.RATINGS &&
  //       item.HOURS === wholestate.HOURS
  //   );
  //   // console.log(cringe, "cringe");

  //   props.setfilteredDatapro(cringe);
  //   console.log("cringe", props.filteredDatapro, "cringe");

  //   console.log("bastard", props.filteredDatapro, "filtersdata");
  // };

  const setgendertoggle = () => {
    // console.log("data", props.data, 'data,"datadasdsdf');
    setonclickontogglegenders(!onclickontogglegenders);
  };

  const setgenderLocation = () => {
    setonclickontoggleLocation(!onclickontoggleLocation);
  };
  const setRatings = () => {
    setonclickontoggleRatings(!onclickontoggleRatings);
  };
  const setgenderHours = () => {
    setonclickontoggleHours(!onclickontoggleHours);
  };

  useEffect(() => {
    let filteredData;

    if (gender === null) {
      filteredData = props.data.filter(
        (item) =>
          // item.GENDER === gender &&
          (item.LOCATION === location || location === null) &&
          (item.RATINGS === ratingsvalue || ratingsvalue === null) &&
          (item.HOURS === hours || hours === null)
      );
    }

    if (location === null) {
      filteredData = props.data.filter(
        (item) =>
          (item.GENDER === gender || gender === null) &&
          // item.LOCATION === location &&
          (item.RATINGS === ratingsvalue || ratingsvalue === null) &&
          (item.HOURS === hours || hours === null)
      );
    }

    if (ratingsvalue === null) {
      filteredData = props.data.filter(
        (item) =>
          (item.GENDER === gender || gender === null) &&
          (item.LOCATION === location || location === null) &&
          // item.RATINGS === ratingsvalue &&
          (item.HOURS === hours || hours === null)
      );
    }
    if (hours === null) {
      // alert(" NOT else");

      filteredData = props.data.filter(
        (item) =>
          (item.GENDER === gender || gender === null) &&
          (item.LOCATION === location || location === null) &&
          (item.RATINGS === ratingsvalue || ratingsvalue === null)
      );
    }

    if (
      gender === null &&
      location === null &&
      ratingsvalue === null &&
      hours === null
    ) {
      filteredData = props.data.filter(
        (item) =>
          item.GENDER === gender &&
          item.LOCATION === location &&
          item.RATINGS === ratingsvalue &&
          item.HOURS === hours
      );
    }

    console.log("FILTER DATA TO BE SET", filteredData);
    props.setfilteredDatapro(filteredData);
    console.log("filterdatatestbor >>> \n", props.filteredDatapro, " \n >>> ");
    console.log("props.data >>> \n", props.data, " \n >>> ");
  }, [props.data, gender, location, ratingsvalue, hours]);

  // useEffect(() => {
  //   const filteredData = props.data.filter(
  //     (item) =>
  //       item.GENDER === gender &&
  //       item.LOCATION === location &&
  //       item.RATINGS === ratingsvalue &&
  //       item.HOURS === hours
  //   );
  //   props.setfilteredDatapro(filteredData);
  // }, [props.data, gender, location, ratingsvalue, hours]);
  return (
    <div>
      <Container
        style={{
          fontFamily: "Poppins, sans-serif",
          border: "1px solid  rgba(205, 205, 205, 1)",
          color: "rgba(53, 53, 53, 1)",
        }}
      >
        <Row style={{ height: "50px" }}>
          <Col style={{ alignItems: "center" }} className="d-flex  ">
            <img
              src={filtersLogo}
              style={{
                height: "30px",
                alignItems: "center",
              }}
              alt=""
            />
            <h4
              style={{
                color: "rgba(53, 53, 53, 1)",
                fontSize: "17px",
                fontWeight: "600",
                textAlign: "center",
                paddingLeft: "20px",
                paddingTop: "7px",
              }}
            >
              {" "}
              Filters
            </h4>
          </Col>
        </Row>

        <Row
          onClick={setgendertoggle}
          style={{
            height: "50px",
            borderTop: "1px solid  rgba(205, 205, 205, 1)",
          }}
        >
          <Col style={{ alignItems: "center" }} className="d-flex  ">
            <h4
              style={{
                fontSize: "17px",
                textAlign: "center",
                paddingLeft: "20px",
                color: "rgba(53, 53, 53, 1)",
                paddingTop: "7px",
                fontWeight: "600",
              }}
            >
              {" "}
              Genders
            </h4>
          </Col>

          <Col
            style={{
              alignItems: "center",
              justifyContent: "end",
              paddingRight: "30px",
            }}
            className="d-flex  "
          >
            <img
              onClick={setgendertoggle}
              src={onclickontogglegenders ? upsidetoggle : Togglebutton}
              alt=""
            />
          </Col>
        </Row>

        <Form style={{ display: onclickontogglegenders ? "grid" : "none" }}>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      onClick={() => handleFilterGENDER("MALE")}
                      className="custom-radio"
                      style={{ color: "black" }}
                      id={`inline-${type}-1`}
                    />
                    <Form.Label>Mens</Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      onClick={() => handleFilterGENDER("FEMALE")}
                      type={type}
                      className="custom-radio"
                      id={`inline-${type}-1`}
                    />
                    <Form.Label>Girls</Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      className="custom-radio"
                      onClick={() => handleFilterGENDER("UNISEX")}
                      id={`inline-${type}-1`}
                    />
                    <Form.Label>unisex</Form.Label>
                  </InputGroup>
                </Col>
              </Row>
            </div>
          ))}
        </Form>

        <Row
          onClick={setgenderLocation}
          style={{
            height: "50px",
            borderTop: "1px solid  rgba(205, 205, 205, 1)",
          }}
        >
          <Col style={{ alignItems: "center" }} className="d-flex  ">
            <h4
              style={{
                fontSize: "17px",
                textAlign: "center",
                paddingLeft: "20px",
                paddingTop: "7px",
                fontWeight: "600",
                color: "rgba(53, 53, 53, 1)",
              }}
            >
              {" "}
              Location
            </h4>
          </Col>
          <Col
            style={{
              alignItems: "center",
              justifyContent: "end",
              paddingRight: "30px",
            }}
            className="d-flex  "
          >
            <img
              onClick={setgenderLocation}
              src={onclickontoggleLocation ? upsidetoggle : Togglebutton}
              alt=""
            />
          </Col>
        </Row>
        <Form style={{ display: onclickontoggleLocation ? "grid" : "none" }}>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      className="custom-radio"
                      onClick={() => handleFilterlocation("NAGERCOIL")}
                      id={`inline-${type}-1`}
                    />
                    <Form.Label>Nagercoil</Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      className="custom-radio"
                      onClick={() => handleFilterlocation("MARTHANDAM")}
                      id={`inline-${type}-1`}
                    />
                    <Form.Label>Marthandam</Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      className="custom-radio"
                      onClick={() => handleFilterlocation("KALIYAKKAVILAI")}
                      id={`inline-${type}-1`}
                    />
                    <Form.Label>kaliyakkavilai</Form.Label>
                  </InputGroup>
                </Col>
              </Row>
            </div>
          ))}
        </Form>

        <Row
          onClick={setRatings}
          style={{
            height: "50px",
            borderTop: "1px solid  rgba(205, 205, 205, 1)",
          }}
        >
          <Col style={{ alignItems: "center" }} className="d-flex  ">
            <h4
              style={{
                fontSize: "17px",
                textAlign: "center",
                paddingLeft: "20px",
                paddingTop: "7px",
                fontWeight: "600",
                color: "rgba(53, 53, 53, 1)",
              }}
            >
              {" "}
              Ratings
            </h4>
          </Col>
          <Col
            style={{
              alignItems: "center",
              justifyContent: "end",
              paddingRight: "30px",
            }}
            className="d-flex  "
          >
            <img
              onClick={setRatings}
              src={onclickontoggleRatings ? upsidetoggle : Togglebutton}
              alt=""
            />
          </Col>
        </Row>

        <Form style={{ display: onclickontoggleRatings ? "grid" : "none" }}>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      style={{ paddingTop: "5px" }}
                      className="custom-radio"
                      onClick={() => handleFilterratingsvalue("FIVE")}
                    />
                    {/* <Form.Label>Nagercoil</Form.Label> */}
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                        marginBottom: "10px",
                      }}
                    >
                      <img src={fivestars} alt="" />
                    </InputGroup.Text>
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                      }}
                    >
                      (5.0)
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      onClick={() => handleFilterratingsvalue("FOUR")}
                      className="custom-radio"
                      id={`inline-${type}-1`}
                      style={{ paddingTop: "5px" }}
                    />
                    {/* <Form.Label>Nagercoil</Form.Label> */}
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                        marginBottom: "10px",
                      }}
                    >
                      <img src={fourstars} alt="" />
                    </InputGroup.Text>
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                      }}
                    >
                      (4.0)
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      onClick={() => handleFilterratingsvalue("THREE")}
                      className="custom-radio"
                      id={`inline-${type}-1`}
                      style={{ paddingTop: "5px" }}
                    />
                    {/* <Form.Label>Nagercoil</Form.Label> */}
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                        marginBottom: "10px",
                      }}
                    >
                      <img src={threestars} alt="" />
                    </InputGroup.Text>
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                      }}
                    >
                      (3.0)
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      onClick={() => handleFilterratingsvalue("TWO")}
                      className="custom-radio"
                      id={`inline-${type}-1`}
                      style={{ paddingTop: "5px" }}
                    />
                    {/* <Form.Label>Nagercoil</Form.Label> */}
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                        marginBottom: "10px",
                      }}
                    >
                      <img src={twostars} alt="" />
                    </InputGroup.Text>
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                      }}
                    >
                      (2.0)
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterratingsvalue("ONE")}
                      className="custom-radio"
                      style={{ paddingTop: "5px" }}
                    />
                    {/* <Form.Label>Nagercoil</Form.Label> */}
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                        marginBottom: "10px",
                      }}
                    >
                      <img src={onestar} alt="" />
                    </InputGroup.Text>
                    <InputGroup.Text
                      style={{
                        border: "1px solid white",
                      }}
                    >
                      (1.0)
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
            </div>
          ))}
        </Form>

        <Row
          onClick={setgenderHours}
          style={{
            height: "50px",
            borderTop: "1px solid  rgba(205, 205, 205, 1)",
          }}
        >
          <Col style={{ alignItems: "center" }} className="d-flex  ">
            <h4
              style={{
                fontSize: "17px",
                textAlign: "center",
                paddingLeft: "20px",
                paddingTop: "7px",
                fontWeight: "600",
                color: "rgba(53, 53, 53, 1)",
              }}
            >
              {" "}
              Hours
            </h4>
          </Col>
          <Col
            style={{
              alignItems: "center",
              justifyContent: "end",
              paddingRight: "30px",
            }}
            className="d-flex  "
          >
            <img
              onClick={setgenderHours}
              src={onclickontoggleHours ? upsidetoggle : Togglebutton}
              alt=""
            />
          </Col>
        </Row>

        <Form
          style={{
            display: onclickontoggleHours ? "grid" : "none",

            // Set visibility based on toggle state
            transition: "display  0.5s ease,", // Add transition effec
          }}
        >
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterhours("ANYTIME")}
                      className="custom-radio"
                    />
                    <Form.Label>Anytime</Form.Label>
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      onClick={() => handleFilterhours("OPENNOW")}
                      className="custom-radio"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Label>Open Now</Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      onClick={() => handleFilterhours("OPEN24HOURS")}
                      className="custom-radio"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Label>Open 24 hours</Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterhours("SUNDAY")}
                      className="custom-radio"
                    />
                    <Form.Label>Sunday</Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup style={{ paddingLeft: "20px" }}>
                    <Form.Check
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterhours("MONDAY")}
                      className="custom-radio"
                    />
                    <Form.Label>Monday</Form.Label>
                  </InputGroup>
                </Col>
                <Row>
                  <Col>
                    <InputGroup style={{ paddingLeft: "20px" }}>
                      <Form.Check
                        inline
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                        onClick={() => handleFilterhours("TUESDAY")}
                        className="custom-radio"
                      />
                      <Form.Label>Tuesday</Form.Label>
                    </InputGroup>
                  </Col>
                  <Row>
                    <Col>
                      <InputGroup style={{ paddingLeft: "20px" }}>
                        <Form.Check
                          inline
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          onClick={() => handleFilterhours("WEDNESDAY")}
                          className="custom-radio"
                        />
                        <Form.Label>Wednesday</Form.Label>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputGroup style={{ paddingLeft: "20px" }}>
                        <Form.Check
                          inline
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          onClick={() => handleFilterhours("THURSDAY")}
                          className="custom-radio"
                        />
                        <Form.Label>Thursday</Form.Label>
                      </InputGroup>
                    </Col>
                    <Row>
                      <Col>
                        <InputGroup style={{ paddingLeft: "20px" }}>
                          <Form.Check
                            inline
                            name="group1"
                            type={type}
                            onClick={() => handleFilterhours("FRIDAY")}
                            className="custom-radio"
                            id={`inline-${type}-1`}
                          />
                          <Form.Label>Friday</Form.Label>
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <InputGroup style={{ paddingLeft: "20px" }}>
                          <Form.Check
                            inline
                            name="group1"
                            type={type}
                            onClick={() => handleFilterhours("SATURDAY")}
                            className="custom-radio"
                            id={`inline-${type}-1`}
                          />
                          <Form.Label>Saturday</Form.Label>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Row>
                </Row>
              </Row>
            </div>
          ))}
        </Form>
      </Container>
    </div>
  );
};

export default FilterSaloonMen;
