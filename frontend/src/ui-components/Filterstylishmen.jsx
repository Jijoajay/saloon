import React, { useEffect, useState } from "react";
import { Row, Col, Button, Container, Form, InputGroup } from "react-bootstrap";
import "../styles/filtersofstylish.css";
import filtersLogo from "../assets/filtersLogo.png";
import Togglebutton from "../assets/Togglebutton.png";
import upsidetoggle from "../assets/upsidetoggle.png";

import onestar from "../assets/onestar.png";
import twostars from "../assets/twostars.png";
import threestars from "../assets/threestars.png";
import fourstars from "../assets/fourstars.png";
import fivestars from "../assets/fivestars.png";
const Filtersdisplaystylish = (props) => {
  const [onclickontogglegenders, setonclickontogglegenders] = useState(false);
  const [onclickontoggleRatings, setonclickontoggleRatings] = useState(false);
  const [onclickExprience, setonclickExprience] = useState(false);

  const [gender, setGender] = useState("MALE");
  const [ratingsvalue, setRatingsvalue] = useState("5");
  const [experienceDATA, setExperienceDATA] = useState("0");
  const setgendertoggle = () => {
    setonclickontogglegenders(!onclickontogglegenders);
  };
  const setExprience2 = () => {
    setonclickExprience(!onclickExprience);
  };

  const setRatings = () => {
    setonclickontoggleRatings(!onclickontoggleRatings);
  };

  const handleFilterGENDER = (newGender) => {
    setGender(newGender);
  };

  const handleFilterratingsvalue = (r) => {
    setRatingsvalue(r);
  };
  const setExprience = (newex) => {
    setExperienceDATA(newex);
  };

  useEffect(() => {
    const filteredData = props.data.filter((item, indexxx) => {
      console.log(
        "INDEX",
        indexxx,
        "Item:",
        item,
        "GENDER ",
        gender,
        ratingsvalue,
        experienceDATA
      );
      return (
        item.gender === gender &&
        item.review === ratingsvalue &&
        item.experience === experienceDATA
      );
    });
    props.setfilteredDatapro(filteredData);
    console.log("FILTERED DATA", filteredData);
  }, [props.data, gender, ratingsvalue, experienceDATA]);
  useEffect(() => {
    console.log("sdfsdfsd", props.filteredDatapro);
  }, [props.filteredDatapro]);

  return (
    <Container
      style={{
        fontFamily: "Poppins, sans-serif",
        border: "1px solid  rgba(205, 205, 205, 1)",
        borderRadius: "10px",
        color: "rgba(53, 53, 53, 1)",
      }}
      fluid
    >
      <Row
        className="Filter"
        style={{ borderBottom: "1px solid rgba(205, 205, 205, 1)" }}
      >
        <Col className=" col-3 ">
          <img src={filtersLogo} alt="" />
        </Col>
        <Col className=" col-9">
          <h4 className="h4offilters"> Filters</h4>
        </Col>
      </Row>

      <Row
        onClick={setgendertoggle}
        className="gendersection"
        style={{ borderBottom: "1px solid rgba(205, 205, 205, 1)" }}
      >
        <Col className=" subsection col-9">
          <h4 className="h4offilters"> Genders</h4>
        </Col>

        <Col className="col-3">
          <img
            onClick={setgendertoggle}
            src={onclickontogglegenders ? upsidetoggle : Togglebutton}
            alt=""
          />
        </Col>
      </Row>
      <Row>
        <Form
          className="formfothefilters"
          style={{
            display: onclickontogglegenders ? "grid" : "none",
            borderBottom: "1px solid rgba(205, 205, 205, 1)",
          }}
        >
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterGENDER("MALE")}
                    />
                    <Form.Label className="labeloftheradios">
                      <h5>Mens</h5>
                    </Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterGENDER("FEMALE")}
                    />
                    <Form.Label className="labeloftheradios">
                      <h5>Female</h5>
                    </Form.Label>
                  </InputGroup>
                </Col>
              </Row>
            </div>
          ))}
        </Form>
      </Row>

      <Row
        onClick={setExprience2}
        className="gendersection"
        style={{ borderBottom: "1px solid rgba(205, 205, 205, 1)" }}
      >
        <Col className=" subsection col-9">
          <h4 className="h4offilters"> Year of Experience</h4>
        </Col>

        <Col className="col-3">
          <img
            onClick={setExprience2}
            src={onclickExprience ? upsidetoggle : Togglebutton}
            alt=""
          />
        </Col>
      </Row>
      <Row>
        <Form
          className="formfothefilters"
          style={{
            display: onclickExprience ? "grid" : "none",
            borderBottom: "1px solid rgba(205, 205, 205, 1)",
          }}
        >
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => setExprience("5+")}
                    />
                    <Form.Label className="labeloftheradios">
                      <h5>5+ years</h5>
                    </Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => setExprience("5")}
                    />
                    <Form.Label className="labeloftheradios">
                      <h5>5 years</h5>
                    </Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => setExprience("4")}
                    />
                    <Form.Label className="labeloftheradios">
                      <h5>4 years</h5>
                    </Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => setExprience("3")}
                    />
                    <Form.Label className="labeloftheradios">
                      <h5>3 years</h5>
                    </Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => setExprience("2")}
                    />
                    <Form.Label className="labeloftheradios">
                      <h5>2 years</h5>
                    </Form.Label>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => setExprience("1")}
                    />
                    <Form.Label className="labeloftheradios">
                      <h5>1 year</h5>
                    </Form.Label>
                  </InputGroup>
                </Col>
              </Row>
            </div>
          ))}
        </Form>
      </Row>

      <Row
        onClick={setRatings}
        className="gendersection"
        style={{ borderBottom: "1px solid rgba(205, 205, 205, 1)" }}
      >
        <Col className=" subsection col-9">
          <h4 className="h4offilters"> Ratings</h4>
        </Col>

        <Col className="col-3">
          <img
            onClick={setRatings}
            src={onclickontoggleRatings ? upsidetoggle : Togglebutton}
            alt=""
          />
        </Col>
      </Row>
      <Row>
        <Form
          className="formfothefilters"
          style={{
            display: onclickontoggleRatings ? "grid" : "none",
            borderBottom: "1px solid rgba(205, 205, 205, 1)",
          }}
        >
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterratingsvalue("5")}
                    />
                    <img
                      src={onestar}
                      alt=""
                      style={{ width: "130px", height: "25px" }}
                    />
                    <p className="h6labeloftherad">(5.0)</p>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterratingsvalue("4")}
                    />
                    <img
                      src={onestar}
                      alt=""
                      style={{ width: "130px", height: "25px" }}
                    />
                    <p className="h6labeloftherad">(4.0)</p>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterratingsvalue("3")}
                    />
                    <img
                      src={onestar}
                      alt=""
                      style={{ width: "130px", height: "25px" }}
                    />
                    <p className="h6labeloftherad">(3.0)</p>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterratingsvalue("2")}
                    />
                    <img
                      src={onestar}
                      alt=""
                      style={{ width: "130px", height: "25px" }}
                    />
                    <p className="h6labeloftherad">(2.0)</p>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Form.Check
                      className="inputgroup"
                      inline
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => handleFilterratingsvalue("1")}
                    />

                    <img
                      src={onestar}
                      alt=""
                      style={{ width: "130px", height: "25px" }}
                    />
                    <p className="h6labeloftherad">(1.0)</p>
                  </InputGroup>
                </Col>
              </Row>
            </div>
          ))}
          {/* <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Accordion Item #1
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the first item's accordion body.</strong> It
                  is shown by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Accordion Item #2
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div> */}
        </Form>
      </Row>
    </Container>
  );
};

export default Filtersdisplaystylish;
