import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
// import Navbarofthesaloon from "../../../../../../Navbar/Navbarofthesaloon";
// import Footer from "../../../../../../Footer/Footer";
import "./styles/ValidateOtp.css";
import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
import Footer from "./ui-components/Footer";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { appointmentsdata } from "./Reducers/appointmentredusers";

const Validateotp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appointmentsData = useSelector((state) => state.appointments.value);
  console.log("console.log");

  // useEffect(() => {
  //   //before render
  //   navigate("/saloonsforwomen");
  //   console.log("console.log");
  // }, []);

  useEffect(() => {
    console.log(
      "appointmentsDataREDUX  \n ",
      appointmentsData.data.confirmappointmentdetails
    );

    // if (
    //   appointmentsData &&
    //   (Object.keys(appointmentsData.data.confirmappointmentdetails).length ===
    //     0 ||
    //     Object.keys(appointmentsData.data.userdetails).length === 0)
    // ) {
    //   console.log(
    //     "NO REDux vALue",
    //     appointmentsData.data.confirmappointmentdetails
    //   );
    //   console.log("NO REDux vALue", appointmentsData.data.userdetails);

    //   navigate("/saloonsforwomen");
    // } else {
    //   console.log(
    //     "REDux vALue for sure",
    //     appointmentsData.data.confirmappointmentdetails
    //   );
    //   console.log("REDux vALue for sure", appointmentsData.data.userdetails);
    //   // console.log(
    //   //   "appointmentsData.data.confirmappointmentdetails",
    //   //   appointmentsData.data.confirmappointmentdetails
    //   // );
    // }
  }, [appointmentsData]);
  const w = appointmentsData.data.confirmappointmentdetails;
  // console.log("appointmentsData.confirmappointmentdetails", w.length);

  const [isvalidate, setisvalidate] = useState(false);
  let datatemp;
  let datatobepassed;
  const location = useLocation();
  const totaldetails = appointmentsData.data;
  // console.log("totaldetails", totaldetails);
  useEffect(() => {
    // datatemp = totaldetails.confirmappointmentdetails.selectedbuttonsdetails;
  }, [totaldetails]);

  const [otp, setOtp] = useState("");
  const handleChange = (newValue) => {
    // setOtp(newValue);
    const filteredValue = newValue.replace(/\D/g, "");
    setOtp(filteredValue);
  };
  useEffect(() => {
    if (otp.length > 5) {
      console.log("otp", otp);
      const sendotptoverify = async (otp) => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/otp/verifyotp",
            {
              otp: parseInt(otp),
              email: totaldetails.userdetails.email,
              phoneNumber: totaldetails.userdetails.phonenumber,
            }
          );
          console.log("Response:", response.data.message);
          if (response.data.message === "success") {
            console.log("Consolelogging when sucessfully validated ");
            setisvalidate(true);
            PostbuttonDATA();
          }
        } catch (error) {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        }
      };
      sendotptoverify(otp);
    }
  }, [otp]);

  const PostbuttonDATA = async () => {
    if (Object.keys(totaldetails.confirmappointmentdetails).length === 0) {
      console.log("DIDNT POST ThE sELECteD ButTONS0");
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/selectedbuttons/data",
          {
            IDoftheitem:
              totaldetails.confirmappointmentdetails.selectedbuttonsdetails
                .IDoftheitem,
            date: totaldetails.confirmappointmentdetails.selectedbuttonsdetails
              .date,
            selectedbuttons:
              totaldetails.confirmappointmentdetails.selectedbuttonsdetails
                .selectedbuttons,
            email: totaldetails.userdetails.email,
            phonenumber: parseInt(totaldetails.userdetails.phonenumber),
          },
          {}
        );
        console.log("SUCESSFULLY POSTED DATA CONFIRM", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const Postappointments = async () => {
    if (Object.keys(totaldetails.confirmappointmentdetails).length === 0) {
      console.log("totaldetails", totaldetails);
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/confirmappointment/",
          {
            dateofappointment: null,
            numberofitems: null,
            salonname: null,
            selectedbuttonsdetails: null,
            selectedservice: null,
            stylishname: null,
            timeofappointment: null,
            timevalue: null,
            totalamount: null,
            totaltime: null,
            userdetails: {
              email: totaldetails.userdetails.email,
              gender: totaldetails.userdetails.gender,
              name: totaldetails.userdetails.name,
              phonenumber: totaldetails.userdetails.phonenumber,
            },
          },
          {}
        );
        // console.log("RES", response.data);
        if (response.data.token) {
          console.log("rESSSSSPONSE..DATAAAAAA", response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "isappointmentadded",
            response.data.isappointmentadded
          );

          navigate("/myappointments");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/confirmappointment/",
          {
            dateofappointment:
              totaldetails.confirmappointmentdetails.dateofappointment,
            numberofitems: totaldetails.confirmappointmentdetails.numberofitems,
            salonname: totaldetails.confirmappointmentdetails.salonname,
            selectedbuttonsdetails: {
              IDoftheitem:
                totaldetails.confirmappointmentdetails.selectedbuttonsdetails
                  .IDoftheitem,
              date: totaldetails.confirmappointmentdetails
                .selectedbuttonsdetails.date,
              selectedbuttons:
                totaldetails.confirmappointmentdetails.selectedbuttonsdetails
                  .selectedbuttons,
            },
            selectedservice:
              totaldetails.confirmappointmentdetails.selectedservice,
            stylishname: totaldetails.confirmappointmentdetails.stylishname,
            timeofappointment:
              totaldetails.confirmappointmentdetails.timeofappointment,
            timevalue: totaldetails.confirmappointmentdetails.timevalue,
            totalamount: totaldetails.confirmappointmentdetails.totalamount,
            totaltime: totaldetails.confirmappointmentdetails.totaltime,
            userdetails: {
              email: totaldetails.userdetails.email,
              gender: totaldetails.userdetails.gender,
              name: totaldetails.userdetails.name,
              phonenumber: totaldetails.userdetails.phonenumber,
            },
          },
          {}
        );
        // console.log("RES", response.data);
        if (response.data.token) {
          console.log("rESSSSSPONSE..DATAAAAAA", response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "isappointmentadded",
            response.data.isappointmentadded
          );

          navigate("/myappointments");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const samplephoneNumber = totaldetails.userdetails.phonenumber;

  // Extract last three digits
  const lastThreeDigits = samplephoneNumber.slice(-3);

  const handlevalidate = () => {
    // navigate("/myappointments");
    if (isvalidate === true) {
      alert("Otp successfully validated");
      Postappointments();
    } else {
      alert("Invalid Otp");
    }
  };
  // useEffect(()=>{

  // },[isvalidate])

  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbarofthesaloon backgroundcolor="black" color="white" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Container
            style={{
              borderRadius: "10px",
              border: "1px solid rgba(1, 11, 15, 1)",
              marginTop: "100px",
            }}
          >
            <Row>
              <Col style={{ marginBottom: "25px", marginTop: "50px" }}>
                <h4 className="h4mobile">
                  Please enter the one time password to verify
                </h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="h6mobile">
                  A code has been sent to *******{lastThreeDigits}
                </h6>
              </Col>
            </Row>
            <Row
              style={{
                maxWidth: "1000px",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              <MuiOtpInput
                className="MuiOtpInput-TextField"
                length={6}
                value={otp}
                onChange={handleChange}
              />
            </Row>
            <Row>
              <Col>
                <h6
                  style={{ fontWeight: "600", marginBottom: "50px" }}
                  className="h6mobile"
                >
                  Resend One-Time Password
                </h6>
              </Col>
            </Row>
            <Row>
              <Col className=" d-flex justify-content-center ">
                <Button className="validateotpbutton" onClick={handlevalidate}>
                  Validate
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Validateotp;
