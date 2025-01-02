import React, { useEffect, useRef, useState } from "react";
import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
import Footer from "./ui-components/Footer";
import close from "./assets/close.png";
import "./styles/Myappointments.css";
import clock from "./assets/clock.png";
import noappointments from "./assets/noappointments.png";
import money from "./assets/moneyimage.png";
import onsestarpixelated from "./assets/onsestarpixelated.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import clockappointments from "./assets/clockappointments.png";
import DateofAppointment from "./assets/DateofAppointment.png";
import monetappointments from "./assets/monetappointments.png";
import SalonName from "./assets/SalonName.png";
import TimeofAppointment from "./assets/TimeofAppointment.png";
import YourStylist from "./assets/YourStylist.png";
import certifiedtick from "./assets/certifiedtick.png";
import closecertification from "./assets/closecertification.png";
import barbermen from "./assets/barbermen.png";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import reviewon from "./assets/reviewon.png";
import reviewoff from "./assets/reviewoff.png";
// var jwt = require("jsonwebtoken");
const Myappointments = () => {
  const [emptyappointstoggle, setemptyappointmentstoggle] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleConfirmAlert = () => {
    setShowAlert(false);
    localStorage.removeItem("isappointmentadded");

    // Add any additional logic here after the user confirms the alert
  };

  const CustomAlert = ({ message, onConfirm }) => {
    return (
      <div className="custom-alert-overlay d-flex">
        <Row
          style={{
            background: "rgba(182, 234, 205, 1)",
            borderBottom: "5px solid rgba(0, 158, 68, 1)",
            fontFamily: "poppins,sans-serif",
          }}
          className="custom-alert "
        >
          <Col className="col-2">
            <img
              style={{ height: "40px", marginTop: "7px" }}
              src={certifiedtick}
              alt=""
            />
          </Col>
          <Col className="col-9">
            <h4>Success</h4>
            <p>The appointment has completed successfully.</p>
          </Col>
          <Col style={{ justifyContent: "end" }} className="col-1 d-flex ">
            <img
              style={{ height: "30px", marginTop: "13px" }}
              onClick={onConfirm}
              src={closecertification}
              alt=""
            />

            {/* <button style={{ width: "50px" }} onClick={onConfirm}>
              OK
            </button> */}
          </Col>
        </Row>
      </div>
    );
  };

  const reviewref = useRef(null);
  const [isappointmentsempty, setisappointmentsempty] = useState(false);
  const [reviewtoggle, setreviewtoggle] = useState(false);
  const [isservicecompleted, setservicecompleted] = useState([]);

  const [reviewstarcolours, setreviewstarcount] = useState([
    { id: 1, star: false },
    { id: 2, star: false },
    { id: 3, star: false },
    { id: 4, star: false },
    { id: 5, star: false },
  ]);

  const [reviewstarcolours2, setreviewstarcount2] = useState([
    { id: 1, star: false },
    { id: 2, star: false },
    { id: 3, star: false },
    { id: 4, star: false },
    { id: 5, star: false },
  ]);

  useEffect(() => {
    console.log("reviewstarcolours", reviewstarcolours);
  }, [reviewstarcolours]);

  const [totalcolouredreview, settotalcolouredreview] = useState(0);

  const handlereviewclick = (index) => {
    console.log(index);
    // setreviewstarcount((reviewstarcolours[index + 1].star = true));'
    const updatedReviewStarColours = [...reviewstarcolours];

    for (let x = 0; x < 5; x++) {
      // updatedReviewStarColours[x].star

      if (index === x) {
        console.log("index", index);
        if (updatedReviewStarColours[x].star === true) {
          updatedReviewStarColours[x].star = false;
        } else {
          updatedReviewStarColours[x].star = true;
        }
      }
      if (index < x) {
        updatedReviewStarColours[x].star = false;
      }
      if (index > x) {
        updatedReviewStarColours[x].star = true;
      }
    }
    // Update the star property
    setreviewstarcount(updatedReviewStarColours); // Update the state with the modified array
    // alert(index);
  };

  const handlereviewclick2 = (index) => {
    console.log(index);
    // setreviewstarcount((reviewstarcolours[index + 1].star = true));'
    const updatedReviewStarColours = [...reviewstarcolours2];

    for (let x = 0; x < 5; x++) {
      // updatedReviewStarColours[x].star

      if (index === x) {
        console.log("index", index);
        if (updatedReviewStarColours[x].star === true) {
          updatedReviewStarColours[x].star = false;
        } else {
          updatedReviewStarColours[x].star = true;
        }
      }
      if (index < x) {
        updatedReviewStarColours[x].star = false;
      }
      if (index > x) {
        updatedReviewStarColours[x].star = true;
      }
    }
    // Update the star property
    setreviewstarcount2(updatedReviewStarColours); // Update the state with the modified array
    // alert(index);
  };

  const renderItems = () => {
    for (let i = 0; i < 5; i++) {
      <div key={i}>
        <img
          style={{ height: "30px" }}
          onClick={setreviewstarcount(i + 1)}
          src={reviewon}
          alt=""
        />
      </div>;
    }
  };

  const handlerateandreview = (ref) => {
    setreviewtoggle(!reviewtoggle);
  };

  useEffect(() => {
    window.scrollTo({ top: 200, behavior: "smooth" });
  }, [reviewtoggle]);

  // const [token, setToken] = useState("");
  const [responsefrombackend, setresponsefrombackend] = useState("");
  const [deletedite, setdeleteditem] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    responsefrombackend.length > 0 &&
      responsefrombackend.map((item, index) => {
        const isappointmentadded = localStorage.getItem("isappointmentadded");
        console.log("isappointmentadded is true", isappointmentadded);
        if (isappointmentadded === false || isappointmentadded === null) {
        } else {
          setShowAlert(true);
        } // console.log("ITEM +BEFORE YEARS", item);

        const inputDate = `${item.selectedbuttonsdetails.date.years}-${
          item.selectedbuttonsdetails.date.months + 1
        }-${item.selectedbuttonsdetails.date.days}`; // Format: YYYY-MM-DD
        function isDateInThePast(date) {
          const currentDate = new Date();
          const inputDate = new Date(date);
          // console.log("INPUTDATE", inputDate);
          // console.log("currentDate", currentDate);
          return inputDate < currentDate;
        }

        if (isDateInThePast(inputDate)) {
          // console.log("The date is in the Past::::::::::", inputDate);
          setservicecompleted((prev) => prev.concat(item._id));
        } else {
          // console.log("The date is in the future.", inputDate);
        }
      });
    console.log("esponsefrombackend", responsefrombackend);
  }, [responsefrombackend]);

  useEffect(() => {
    // console.log("deletedite", deletedite);
  }, [deletedite]);

  useEffect(() => {
    console.log("emptyappointstoggle", emptyappointstoggle);
  }, [emptyappointstoggle]);
  const sendTokentoverify = async (otp) => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      // alert("THERE IS no TOKEN ");
      navigate("/mobile");
    }
    if (storedToken) {
      console.log("ATLEAST REQUEST IS SEND");
      const response = await axios.post(
        "http://127.0.0.1:5000/confirmappointment/verifytoken",
        {
          token: storedToken,
        }
      );

      // console.log("RESPONSE FORM VEERIFY TOKEN", response);
      setresponsefrombackend(response.data.userdata);

      if (responsefrombackend && responsefrombackend.email !== null) {
        console.log("Data is present:", responsefrombackend);
        // alert("YES");
        setemptyappointmentstoggle(false);
      } else {
        // Handle case where data is empty or undefined;
        setemptyappointmentstoggle(true);
        // alert("NO");
        console.log("No data available.");
      }
    } else {
      alert("Login session expired");
    }
  };
  useEffect(() => {
    // console.log("Token", storedToken);
    // const isappointmentadded = localStorage.getItem("isappointmentadded");
    // console.log("isappointmentadded is true", isappointmentadded);
    // if (isappointmentadded === false || isappointmentadded === null) {
    // } else {
    //   setShowAlert(true);
    // }
    sendTokentoverify();
  }, []);

  const [cancelappointmenttoogle, setcancelappointmenttoggle] = useState(false);
  const [cancelappointmentdetails, setcancelappointmentdetails] = useState([]);

  useEffect(() => {
    // console.log("CANCEL APPOIONTMENTS", cancelappointmentdetails);
  }, [cancelappointmentdetails]);

  const handletoggleappointment = (item, index) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setcancelappointmenttoggle(!cancelappointmenttoogle);
    setcancelappointmentdetails([item]);
    // setcancelappointmentdetails(item);
  };
  const deletetheappointment = async (tobecanceled) => {
    const response = await axios.post(
      "http://127.0.0.1:5000/confirmappointment/delete",
      {
        email: tobecanceled[0].userdetails.email,
        phonenumber: tobecanceled[0].userdetails.phonenumber,
        selectedbuttons: tobecanceled[0].selectedbuttonsdetails.selectedbuttons,
        date: tobecanceled[0].selectedbuttonsdetails.date,
        idtobedeleted: tobecanceled[0]._id,
      }
    );
    setdeleteditem(response.data);
    // console.log("responsePROMAX", response.data);
  };
  const handlecanceltheappointasap = (tobecanceled) => {
    // console.log("TObe canceledd", tobecanceled);
    deletetheappointment(tobecanceled);
    sendTokentoverify();
  };
  useEffect(() => {
    // console.log("isservicecompleted", isservicecompleted);
  }, [isservicecompleted]);
  return (
    <Container className="containerpro" fluid>
      <Row>
        <Col>
          <Navbarofthesaloon backgroundcolor="black" color="white" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Row
              style={{
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              <Col>
                <h4
                  style={{
                    fontFamily: "petrona,serif",
                    fontWeight: "700",
                    fontSize: "25px",
                  }}
                >
                  My Appointments
                </h4>
              </Col>
            </Row>
            {responsefrombackend.length > 0 &&
              responsefrombackend.map((item, index) => {
                return (
                  <Row key={index}>
                    <Col>
                      <Container
                        style={{
                          border: "1px solid rgba(205, 205, 205, 1)",
                          marginBottom: "50px",
                          display: reviewtoggle === true ? "none" : "grid",
                        }}
                      >
                        <Row>
                          <Col
                            className="col-12 col-sm-8 col-lg-4"
                            style={{
                              border: "1px solid rgba(205, 205, 205, 1)",
                              paddingTop: "25px",
                            }}
                          >
                            <Container>
                              {item.selectedservice.map((serviceitem) => {
                                const blob = new Blob(
                                  [Int8Array.from(serviceitem.logo.data.data)],
                                  {
                                    type: item.contentType,
                                  }
                                );
                                const image = window.URL.createObjectURL(blob);

                                return (
                                  <Row style={{ marginBottom: "25px" }}>
                                    <Col>
                                      <Container>
                                        <Row>
                                          <Col className="col-3">
                                            {" "}
                                            <img
                                              src={image}
                                              style={{
                                                width: "50px",
                                                borderRadius: "10px",
                                              }}
                                              alt=""
                                            />
                                          </Col>
                                          <Col
                                            style={{ padding: "0px" }}
                                            className="col-9"
                                          >
                                            <Container>
                                              <Row>
                                                <Col>
                                                  <h6
                                                    style={{
                                                      fontFamily:
                                                        "petrona,serif",
                                                      fontWeight: "700",
                                                      fontSize: "20px",
                                                    }}
                                                  >
                                                    {serviceitem.heading}
                                                  </h6>
                                                </Col>
                                              </Row>
                                              <Row>
                                                <Col className="col-6 col-lg-2">
                                                  <img src={clock} alt="" />
                                                </Col>
                                                <Col
                                                  style={{ padding: "0px" }}
                                                  className="col-6 col-lg-3"
                                                >
                                                  <h6
                                                    style={{
                                                      paddingTop: "8px",
                                                    }}
                                                  >
                                                    {serviceitem.timevalue}mins
                                                  </h6>
                                                </Col>
                                                <Col
                                                  style={{ padding: "0px" }}
                                                  className="col-6 col-lg-1"
                                                >
                                                  <img src={clock} alt="" />
                                                </Col>
                                                <Col
                                                  style={{ padding: "0px" }}
                                                  className="col-6 col-lg-4"
                                                >
                                                  <h6
                                                    style={{
                                                      paddingTop: "8px",
                                                      paddingLeft: "5px",
                                                      fontFamily:
                                                        "poppins,sans-serif",
                                                      fontWeight: "700",
                                                    }}
                                                  >
                                                    Rs.{serviceitem.amount}
                                                  </h6>
                                                </Col>
                                              </Row>
                                            </Container>
                                          </Col>
                                        </Row>
                                      </Container>
                                    </Col>
                                  </Row>
                                );
                              })}
                            </Container>
                          </Col>
                          <Col
                            style={{
                              border: "1px solid rgba(205, 205, 205, 1)",
                              paddingTop: "25px",
                            }}
                            className="col-12 col-sm-8 col-lg-4"
                          >
                            <Container>
                              <Row style={{ marginBottom: "25px" }}>
                                <Col
                                  style={{ alignItems: "center" }}
                                  className="d-flex col-6"
                                >
                                  {" "}
                                  <img
                                    src={SalonName}
                                    style={{ height: "25px" }}
                                    alt=""
                                  />
                                  <div
                                    style={{ paddingLeft: "10px" }}
                                    className="d-flex flex-column "
                                  >
                                    <p
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "300",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Salon Name
                                    </p>
                                    <h4
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "700",
                                        fontSize: "17px",
                                      }}
                                    >
                                      {item.salonname}
                                    </h4>
                                  </div>
                                </Col>
                                <Col
                                  style={{ alignItems: "center" }}
                                  className="d-flex col-6 "
                                >
                                  {" "}
                                  <img
                                    src={YourStylist}
                                    style={{ height: "25px" }}
                                    alt=""
                                  />
                                  <div
                                    style={{ paddingLeft: "10px" }}
                                    className="d-flex flex-column "
                                  >
                                    <p
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "300",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Your Stylist{" "}
                                    </p>
                                    <h4
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "700",
                                        fontSize: "17px",
                                      }}
                                    >
                                      {item.stylishname}
                                    </h4>
                                  </div>
                                </Col>
                              </Row>
                              <Row style={{ marginBottom: "25px" }}>
                                <Col
                                  style={{ alignItems: "center" }}
                                  className="d-flex col-6"
                                >
                                  <img
                                    src={DateofAppointment}
                                    style={{ height: "25px" }}
                                    alt=""
                                  />
                                  <div
                                    style={{ paddingLeft: "10px" }}
                                    className="d-flex flex-column "
                                  >
                                    <p
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "300",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Date of Appointment{" "}
                                    </p>
                                    <h4
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "700",
                                        fontSize: "17px",
                                      }}
                                    >
                                      {item.dateofappointment}
                                    </h4>
                                  </div>
                                </Col>
                                <Col
                                  style={{ alignItems: "center" }}
                                  className="d-flex col-6 "
                                >
                                  {" "}
                                  <img
                                    src={TimeofAppointment}
                                    style={{ height: "25px" }}
                                    alt=""
                                  />
                                  <div
                                    style={{ paddingLeft: "10px" }}
                                    className="d-flex flex-column "
                                  >
                                    <p
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "300",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Time of Appointment{" "}
                                    </p>
                                    <h4
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "700",
                                        fontSize: "17px",
                                      }}
                                    >
                                      {item.timeofappointment}{" "}
                                    </h4>
                                  </div>
                                </Col>
                              </Row>

                              <Row style={{ marginBottom: "25px" }}>
                                <Col
                                  style={{ alignItems: "center" }}
                                  className="d-flex col-6"
                                >
                                  {" "}
                                  <img
                                    src={clockappointments}
                                    style={{ height: "25px" }}
                                    alt=""
                                  />
                                  <div
                                    style={{ paddingLeft: "10px" }}
                                    className="d-flex flex-column "
                                  >
                                    <p
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "300",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {item.numberofitems} items
                                    </p>
                                    <h4
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "700",
                                        fontSize: "17px",
                                      }}
                                    >
                                      {item.timevalue}mins
                                    </h4>
                                  </div>
                                </Col>
                                <Col
                                  style={{ alignItems: "center" }}
                                  className="d-flex col-6 "
                                >
                                  {" "}
                                  <img
                                    src={monetappointments}
                                    style={{ height: "25px" }}
                                    alt=""
                                  />
                                  <div
                                    style={{ paddingLeft: "10px" }}
                                    className="d-flex flex-column "
                                  >
                                    <p
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "300",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Total Amount{" "}
                                    </p>
                                    <h4
                                      style={{
                                        margin: "0px",
                                        fontFamily: "poppins,sans-serif",
                                        fontWeight: "700",
                                        fontSize: "17px",
                                      }}
                                    >
                                      Rs.{item.totalamount}
                                    </h4>
                                  </div>
                                </Col>
                              </Row>
                            </Container>
                          </Col>
                          <Col
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid rgba(205, 205, 205, 1)",
                            }}
                            className="col-12 col-sm-8 col-lg-4 d-flex"
                          >
                            {/* servicecompleted    */}
                            {/* {console.log(
                              "singleitem",
                              item.selectedbuttonsdetails.date
                            )} */}
                            {/* {console.log(
                              "isservicecompleted",
                              isservicecompleted
                            )} */}
                            {isservicecompleted.includes(item._id) ? (
                              <div>
                                <h4
                                  style={{
                                    color: "rgba(0, 158, 68, 1)",
                                    fontWeight: 600,
                                    fontFamily: "poppins,sans-serif",
                                  }}
                                >
                                  Service Completed
                                </h4>
                                <h5
                                  style={{
                                    color: "rgba(0, 24, 153, 1)",
                                    fontWeight: 500,
                                    fontFamily: "poppins,sans-serif",
                                    marginTop: "15px",
                                    textAlign: "center",
                                    textDecoration: "underline",
                                  }}
                                  onClick={() => handlerateandreview(reviewref)}
                                >
                                  Rate & Review{" "}
                                </h5>
                              </div>
                            ) : (
                              <Button
                                onClick={() =>
                                  handletoggleappointment(item, index)
                                }
                                className="buttonmyappointment"
                              >
                                Cancel Appiontment
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                );
              })}
            <Row
              className="d-flex "
              style={{
                justifyContent: "center",
                margin: "25px",
              }}
            >
              {/* SDfsdfsdfsdfsf++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
              <Col
                style={{ display: cancelappointmenttoogle ? "block" : "none" }}
                className={cancelappointmenttoogle ? "col-6 content  blur" : ""}
              >
                {cancelappointmentdetails.length > 0 &&
                  cancelappointmentdetails.map((cancelsingleitem) => {
                    return (
                      <Container
                        style={{
                          borderRadius: "25px",
                          border: "1px solid rgba(0, 0, 0, 0.5)",
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                          maxWidth: "700px",
                          padding: "20px",
                        }}
                      >
                        <Row style={{ marginBottom: "25px" }}>
                          <Col
                            style={{ alignItems: "center" }}
                            className="d-flex col-6"
                          >
                            {" "}
                            <img
                              src={close}
                              style={{ height: "25px" }}
                              alt=""
                            />
                            <div
                              style={{ paddingLeft: "10px" }}
                              className="d-flex flex-column "
                            >
                              <p
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "300",
                                  fontSize: "12px",
                                }}
                              >
                                Salon Name
                              </p>
                              <h4
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "700",
                                  fontSize: "17px",
                                }}
                              >
                                {cancelsingleitem.salonname}
                              </h4>
                            </div>
                          </Col>
                          <Col
                            style={{ alignItems: "center" }}
                            className="d-flex col-6 "
                          >
                            {" "}
                            <img
                              src={close}
                              style={{ height: "25px" }}
                              alt=""
                            />
                            <div
                              style={{ paddingLeft: "10px" }}
                              className="d-flex flex-column "
                            >
                              <p
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "300",
                                  fontSize: "12px",
                                }}
                              >
                                Your Stylist{" "}
                              </p>
                              <h4
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "700",
                                  fontSize: "17px",
                                }}
                              >
                                {cancelsingleitem.stylishname}
                              </h4>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: "25px" }}>
                          <Col
                            style={{ alignItems: "center" }}
                            className="d-flex col-6"
                          >
                            <img
                              src={close}
                              style={{ height: "25px" }}
                              alt=""
                            />
                            <div
                              style={{ paddingLeft: "10px" }}
                              className="d-flex flex-column "
                            >
                              <p
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "300",
                                  fontSize: "12px",
                                }}
                              >
                                Date of Appointment{" "}
                              </p>
                              <h4
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "700",
                                  fontSize: "17px",
                                }}
                              >
                                {cancelsingleitem.dateofappointment}
                              </h4>
                            </div>
                          </Col>
                          <Col
                            style={{ alignItems: "center" }}
                            className="d-flex col-6 "
                          >
                            {" "}
                            <img
                              src={close}
                              style={{ height: "25px" }}
                              alt=""
                            />
                            <div
                              style={{ paddingLeft: "10px" }}
                              className="d-flex flex-column "
                            >
                              <p
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "300",
                                  fontSize: "12px",
                                }}
                              >
                                Time of Appointment{" "}
                              </p>
                              <h4
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "700",
                                  fontSize: "17px",
                                }}
                              >
                                {cancelsingleitem.timeofappointment}
                              </h4>
                            </div>
                          </Col>
                        </Row>

                        <Row style={{ marginBottom: "25px" }}>
                          <Col
                            style={{ alignItems: "center" }}
                            className="d-flex col-6"
                          >
                            {" "}
                            <img
                              src={close}
                              style={{ height: "25px" }}
                              alt=""
                            />
                            <div
                              style={{ paddingLeft: "10px" }}
                              className="d-flex flex-column "
                            >
                              <p
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "300",
                                  fontSize: "12px",
                                }}
                              >
                                {cancelsingleitem.numberofitems}items
                              </p>
                              <h4
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "700",
                                  fontSize: "17px",
                                }}
                              >
                                {cancelsingleitem.timevalue} mins
                              </h4>
                            </div>
                          </Col>
                          <Col
                            style={{ alignItems: "center" }}
                            className="d-flex col-6 "
                          >
                            {" "}
                            <img
                              src={close}
                              style={{ height: "25px" }}
                              alt=""
                            />
                            <div
                              style={{ paddingLeft: "10px" }}
                              className="d-flex flex-column "
                            >
                              <p
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "300",
                                  fontSize: "12px",
                                }}
                              >
                                Total Amount{" "}
                              </p>
                              <h4
                                style={{
                                  margin: "0px",
                                  fontFamily: "poppins,sans-serif",
                                  fontWeight: "700",
                                  fontSize: "17px",
                                }}
                              >
                                Rs.{cancelsingleitem.totalamount}
                              </h4>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: "75px", marginLeft: "50px" }}>
                          <Col
                            onClick={() =>
                              handlecanceltheappointasap(
                                cancelappointmentdetails
                              )
                            }
                          >
                            <h4
                              style={{
                                margin: "0px",
                                fontFamily: "poppins,sans-serif",
                                fontWeight: "700",
                                fontSize: "20px",
                                color: "rgba(220, 0, 0, 1)",
                              }}
                            >
                              Cancel Appointment{" "}
                            </h4>
                          </Col>
                          <Col>
                            <h4
                              onClick={handletoggleappointment}
                              style={{
                                margin: "0px",
                                fontFamily: "poppins,sans-serif",
                                fontWeight: "700",
                                fontSize: "20px",
                                color: "rgba(78, 117, 251, 1)",
                              }}
                            >
                              Discard{" "}
                            </h4>
                          </Col>
                        </Row>
                      </Container>
                    );
                  })}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      {/* ifnoappointments */}

      <Row
        style={{
          marginBottom: "200px",
          display:
            emptyappointstoggle === false && responsefrombackend.length === 0
              ? "block"
              : "none",
        }}
      ></Row>
      <Row
        style={{
          display:
            emptyappointstoggle === true && responsefrombackend.length === 0
              ? "block"
              : "none",
        }}
      >
        <Container>
          <Row className="d-flex">
            <Col
              style={{ justifyContent: "center", marginBottom: "25px" }}
              className="d-flex"
            >
              <img
                style={{ paddingRight: "25px" }}
                src={noappointments}
                alt=""
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginBottom: "10px" }}>
              <h4
                style={{
                  textAlign: "center",
                  fontFamily: "poppins,sans-serif",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Your Appointment is empty{" "}
              </h4>{" "}
            </Col>
          </Row>
          <Row>
            <Col style={{ marginBottom: "25px" }}>
              <h6
                style={{
                  textAlign: "center",
                  fontFamily: "poppins,sans-serif",
                  fontWeight: "200",
                  fontSize: "13px",
                }}
              >
                Looks like you haven’t made your choice yet......
              </h6>{" "}
            </Col>
            <Row>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Button className="bookappointments">Book Appointments</Button>{" "}
              </Col>
            </Row>
          </Row>
        </Container>
      </Row>

      {/* reviews section  */}
      <Container
        style={{
          border: "1px solid black",
          fontFamily: "poppins,sans-serif",
          borderRadius: "20px",
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "50px",
          paddingBottom: "10px",
          display: reviewtoggle === true ? "grid" : "none",
          maxHeight: "1000px",
        }}
        className={reviewtoggle ? "" : "col-6 content1  blur1"}
      >
        <Row
          style={{
            marginTop: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <Col
            style={{
              fontSize: "20px",
              fontWeight: "700",
              padding: "0px",
              margin: "0px",
            }}
            className=" col-6"
          >
            Rate this Salon
          </Col>
          <Col style={{ justifyContent: "end" }} className="d-flex col-6 ">
            <img
              style={{ height: "30px", marginTop: "3px" }}
              src={SalonName}
              alt=""
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
                marginLeft: "10px",
              }}
            >
              <p
                style={{
                  margin: "0px",
                  textAlign: "start",
                  fontSize: "10px",
                  fontWeight: "300",
                }}
              >
                Salon Name
              </p>
              <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
                Lakme Salon
              </h6>
            </div>
          </Col>
        </Row>

        <Row
          style={{
            marginBottom: "10px",
            width: "250px",
            marginLeft: "1px",
          }}
        >
          {/* <Col style={{ padding: "0px", margin: "0px" }}>
            {reviewstarcolours.length > 0 &&
              reviewstarcolours.map((itemreviewcolor, indexreviewcolor) => {
                console.log("itemreviewcolor", itemreviewcolor);
                return <img style={{ height: "30px" }} src={reviewon} alt="" />;
              })}
          </Col> */}

          <Col
            style={{
              padding: "0px",
              margin: "0px",
            }}
          >
            {reviewstarcolours.length > 0 &&
              reviewstarcolours.map((itemreviewcolor, indexreviewcolor) => {
                // console.log("itemreviewcolor", itemreviewcolor.star);
                if (itemreviewcolor.star === false) {
                  console.log("TRUEEEEEEEEEEE");
                }
                return (
                  <img
                    key={indexreviewcolor} // Add a unique key prop
                    id={indexreviewcolor}
                    onClick={() => handlereviewclick(indexreviewcolor)}
                    className="starhover"
                    style={
                      {
                        // border: itemreviewcolor.star ? "1px solid black" : "",
                      }
                    }
                    src={itemreviewcolor.star ? reviewon : reviewoff}
                    alt=""
                  />
                );
              })}
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <p style={{ fontSize: "20px", fontWeight: "700" }}>
            Review this Salon
          </p>
        </Row>
        <Row style={{ margin: "1px", marginTop: "25px", marginBottom: "25px" }}>
          <Form.Control
            as="textarea"
            placeholder="Type something......"
            style={{ height: "150px", padding: "20px", borderRadius: "20px" }}
          />
        </Row>

        <Row style={{ marginTop: "100px" }}>
          <Col
            style={{ fontSize: "20px", fontWeight: "700" }}
            className=" col-6"
          >
            Rate this Stylist{" "}
          </Col>
          <Col style={{ justifyContent: "end" }} className="d-flex col-6 ">
            {/* <img
              style={{ height: "30px", marginTop: "3px" }}
              src={SalonName}
              alt=""
            /> */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
                marginLeft: "10px",
              }}
            >
              <p
                style={{
                  margin: "0px",
                  textAlign: "start",
                  fontSize: "10px",
                  fontWeight: "300",
                }}
              >
                Salon Name
              </p>
              <h6 style={{ fontSize: "15px", fontWeight: "700" }}>
                Lakme Salon
              </h6>
            </div>
          </Col>
        </Row>

        <Row style={{ marginBottom: "10px" }}>
          {/* <img style={{ width: "220px" }} src={onsestarpixelated} alt="" /> */}
          <Col>
            {reviewstarcolours2.length > 0 &&
              reviewstarcolours2.map((itemreviewcolor, indexreviewcolor) => {
                // console.log("itemreviewcolor", itemreviewcolor.star);
                if (itemreviewcolor.star === false) {
                  console.log("TRUEEEEEEEEEEE");
                }
                return (
                  <img
                    key={indexreviewcolor} // Add a unique key prop
                    id={indexreviewcolor}
                    onClick={() => handlereviewclick2(indexreviewcolor)}
                    className="starhover"
                    style={
                      {
                        // border: itemreviewcolor.star ? "1px solid black" : "",
                      }
                    }
                    src={itemreviewcolor.star ? reviewon : reviewoff}
                    alt=""
                  />
                );
              })}
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <p style={{ fontSize: "20px", fontWeight: "700" }}>
            Review this Stylist{" "}
          </p>
        </Row>
        <Row style={{ margin: "1px", marginTop: "25px", marginBottom: "25px" }}>
          <Form.Control
            as="textarea"
            placeholder="Type something......"
            style={{ height: "150px", padding: "20px", borderRadius: "20px" }}
          />
        </Row>

        <Row>
          <Col style={{ justifyContent: "end" }} className="d-flex ">
            <Button
              style={{ height: "50px", width: "300px" }}
              className="submitreview "
              onClick={handlerateandreview}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col>
          {showAlert && (
            <CustomAlert
              message="This is a custom alert message!"
              onConfirm={handleConfirmAlert}
            />
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "200px" }}>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Myappointments;
