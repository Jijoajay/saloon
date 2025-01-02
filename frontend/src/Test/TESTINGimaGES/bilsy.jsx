import React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";

export const Mobilenumber = () => {
  const navigate = useNavigate();
  const handleotp = () => {
    navigate("/otpverify");
  };

  const [phone, setPhone] = useState("");

  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleValue = (e) => {
    e.preventDefault();
    request
      .post("register-otp-generation/", formValue)
      .then((resp) => {
        console.log("res", formValue);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send message. Please try again.");
      });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValue({
  //     ...formValue,
  //     [name]: value,

  //   });
  // };

  const handleChange = (e) => {
    console.log("E", e);
    const { name, value } = e.target; // Destructure name and value

    // Update state based on the field name:
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  return (
    <div>
      <div className="container" style={{ marginTop: "150px" }}>
        <div className="text-center">
          <h3 className="mt-5 pt-5 mx-1 text-lg-start bigvalue underline">
            Enter your Mobile Number
          </h3>
        </div>
        <Form className="mx-5 my-5" onSubmit={handleValue}>
          <Row className="gx-3 mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label
                  className="small-label"
                  style={{ color: " #2D2D2D" }}
                  htmlFor="inputFirstName"
                >
                  Name
                </Form.Label>
                <Form.Control
                  id="inputFirstName"
                  style={{ border: "1px solid #D7242A" }}
                  type="text"
                  placeholder="Enter your first name"
                  name="username"
                  value={formValue.username}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="">
              <Form.Group className="mb-3 ms-4">
                <Form.Label
                  className="small-label"
                  style={{ color: " #2D2D2D" }}
                  htmlFor="inputLastName"
                >
                  Email
                </Form.Label>
                <Form.Control
                  id="inputLastName"
                  style={{ border: "1px solid #D7242A" }}
                  type="email"
                  placeholder="Enter your email "
                  name="email"
                  value={formValue.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="gx-3 mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label
                  className="small-label w-100"
                  style={{ color: " #2D2D2D" }}
                  htmlFor="inputOrgName"
                >
                  PhoneNumber
                </Form.Label>

                <PhoneInput
                  name="phone"
                  className="number"
                  value={`+91${phone}`}
                  onChange={handleChange}
                  defaultCountry="in"
                  inputStyle={{ borderColor: "#D7242A" }}
                />
              </Form.Group>
            </Col>
            <Col md={6}></Col>
          </Row>
          <div className="d-flex justify-content-center">
            <button type="button" className="buttonmobile" onClick={handleotp}>
              Get OTP
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Mobilenumber;
