import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button, Form, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
import Footer from "./ui-components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsdata } from "./Reducers/appointmentredusers";
const Mobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appointmentsData = useSelector((state) => state.appointments.value);
  useEffect(() => {
    console.log("APPOIntments", appointmentsData);
    //commented now
    // if (
    //   appointmentsData &&
    //   Object.keys(appointmentsData.data.confirmappointmentdetails).length === 0
    // ) {
    //   alert("Select an appoointmentfirst");
    //   console.log("Appointmentssssssss", appointmentsData);
    //   navigate("/saloonsforwomen");
    // } else {
    //   // alert(" REDux vALue for sure");
    //   console.log(
    //     "appointmentsData.data.confirmappointmentdetails",
    //     appointmentsData.data.confirmappointmentdetails
    //   );
    // }
    if (
      appointmentsData &&
      Object.keys(appointmentsData.data.confirmappointmentdetails).length === 0
    ) {
      alert("Select an appoointmentfirst");
    } else {
      // alert(" REDux vALue for sure");
    }
  }, [appointmentsData]);

  const location = useLocation();
  const confirmappointmentdetails = appointmentsData.confirmappointmentdetails;
  // useEffect(() => {
  //   console.log("location.state", confirmappointmentdetails);
  // }, []);s

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState("FEMALE");
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setnameValue] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [userdetails, setuserdetails] = useState({
    name: "",
    gender: "",
    email: "",
    phonenumber: "",
  });
  const handleInputChange = (event) => {
    let newValue = event.target.value.replace(/\D/g, "");
    setInputValue(newValue);
    setMobileError("");
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    setEmailError("");
  };

  const handlenamechange = (event) => {
    setnameValue(event.target.value);
    setNameError("");
  };

  const handleotpsuccess = () => {
    const sometriger = async () => {
      let isValid = true;
      if (!nameValue.trim()) {
        setNameError("Name is required");
        isValid = false;
      }

      if (!inputValue.trim()) {
        setMobileError("Please enter your mobile number");
        isValid = false;
      }

      if (!validateEmail(emailValue)) {
        setEmailError("Please enter a valid email address");
        isValid = false;
      }

      if (isValid) {
        const response = await axios.post(
          "http://127.0.0.1:5000/otp/generateotp",
          {
            phoneNumber: parseInt(inputValue),
            email: emailValue,
          }
        );
        console.log("response", response);

        if (response.data.message.length > 0) {
          dispatch(
            appointmentsdata({
              data: {
                saloondetails: {},
                confirmappointmentdetails:
                  appointmentsData.data.confirmappointmentdetails,
                userdetails: {
                  name: nameValue,
                  gender: selectedValue,
                  email: emailValue,
                  phonenumber: inputValue,
                },
              },
            })
          );
          console.log("NAVIAGTION Line before");
          navigate("/validateotp");
          console.log("NAVIAGTION Line after");

          // alert("afternavigatingline");

          // if (location.state !== null) {
          //   // Do something with location.state

          //   // navigate("/validateotp", {
          //   //   state: {
          //   //     confirmappointmentdetails: confirmappointmentdetails,
          //   //     userdetails: {
          //   //       name: nameValue,
          //   //       gender: selectedValue,
          //   //       email: emailValue,
          //   //       phonenumber: inputValue,
          //   //     },
          //   //   },
          //   // });
          //   dispatch(
          //     appointmentsdata({
          //       data: {
          //         saloondetails: {},
          //         confirmappointmentdetails: alldetailstoappoint,
          //         userdetails: {
          //           name: nameValue,
          //           gender: selectedValue,
          //           email: emailValue,
          //           phonenumber: inputValue,
          //         },
          //       },
          //     })
          //   );
          //   navigate("/validateotp");
          // } else {
          //   // Handle the case where location.state is null
          //   alert("location.state is null");
          // }
        } else {
          console.log("Error occurred:", response.data.message);
        }
      }
    };
    sometriger();
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const [vaidateclick, setvaidateclick] = useState(false);
  useEffect(() => {
    console.log("vaidateclick", vaidateclick);
    // if (vaidateclick) {
    //   navigate("/validateotp", {
    //     state: {
    //       confirmappointmentdetails: confirmappointmentdetails,
    //       userdetails: userdetails,
    //     },
    //   });
    // }
  }, [vaidateclick]);
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Navbarofthesaloon backgroundcolor="black" color="white" />
          </Col>
        </Row>
        <Form>
          <Row style={{ marginTop: "100px" }}>
            <Col>
              <h4 className="h4mobile">Enter your Mobile Number</h4>
            </Col>
          </Row>
          <Row style={{ marginTop: "25px" }}>
            <Col>
              <div
                style={{
                  width: "300px",
                  borderTop: "10px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  margintop: "0px",
                  borderRadius: "10px",
                  transition: "500ms",
                }}
              ></div>
            </Col>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col>
                      <div
                        style={{ marginTop: "25px" }}
                        className="d-flex flex-column "
                      >
                        <h6
                          style={{ marginBottom: "25px" }}
                          className="h6mobile"
                        >
                          Name
                        </h6>
                        <input
                          type="text"
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid rgba(1, 11, 15, 1)",
                          }}
                          onChange={handlenamechange}
                          required // Add the required attribute here
                        />
                        {nameError && (
                          <Alert variant="danger">{nameError}</Alert>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div
                        style={{ marginTop: "25px" }}
                        className="d-flex flex-column "
                      >
                        <h6
                          style={{ marginBottom: "25px" }}
                          className="h6mobile"
                        >
                          Gender
                        </h6>
                        <select
                          style={{
                            padding: "11px",
                            borderRadius: "10px",
                            border: "1px solid rgba(1, 11, 15, 1)",
                            background: "white",
                          }}
                          // value={selectedValue}
                          onChange={handleChange}
                        >
                          <option value="FEMALE">Female</option>
                          <option value="MALE">Male</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div
                        style={{ marginTop: "25px" }}
                        className="d-flex flex-column "
                      >
                        <h6
                          style={{ marginBottom: "25px" }}
                          className="h6mobile"
                        >
                          Email
                        </h6>
                        <input
                          onChange={handleEmailChange}
                          type="email"
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid rgba(1, 11, 15, 1)",
                          }}
                        />
                        {emailError && (
                          <Alert variant="danger">{emailError}</Alert>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div
                        style={{ marginTop: "25px" }}
                        className="d-flex flex-column "
                      >
                        <h6
                          style={{ marginBottom: "25px" }}
                          className="h6mobile"
                        >
                          Mobile Number{" "}
                        </h6>
                        <input
                          value={inputValue}
                          onChange={handleInputChange}
                          type="text"
                          id="numericInput"
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid rgba(1, 11, 15, 1)",
                          }}
                        />
                        {mobileError && (
                          <Alert variant="danger">{mobileError}</Alert>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Row>
                <Col className="d-flex col-12">
                  <Button
                    type="button"
                    style={{
                      justifyContent: "center",
                      border: "1px solid black",
                    }}
                    className="buttonofthemobile"
                    onClick={handleotpsuccess} // Move onClick to the button
                  >
                    Get OTP
                  </Button>
                </Col>
              </Row>
            </Row>
          </Row>
        </Form>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Mobile;
