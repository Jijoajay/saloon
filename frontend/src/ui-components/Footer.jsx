import React from "react";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import "../styles/Footer.css";
const Footer = () => {
  return (
    <Container fluid className="containerofthefooter">
      <Row>
        <Col className="col-12  col-xs-6  col-sm-6  col-md-6 col-lg-4 columnsofthefooter">
          <h6>© Copyright 2024 spangles.com , All rights reserved.</h6>
        </Col>
        <Col className="col-12 col-xs-6   col-sm-6 col-md-6 col-lg-4 columnsofthefooter">
          <h6>Designed by spangles</h6>
        </Col>

        <Col className="col-12  col-xs-12  col-sm-6 col-md-6 col-lg-1 columnsofthefooter">
          <h6>Privacy Policy</h6>
        </Col>
        <Col className="col-12  col-xs-12   col-sm-6 col-md-6 col-lg-1 columnsofthefooter">
          <h6>Terms of Use</h6>
        </Col>

        <Col className="col-12  col-xs-12    col-sm-6 col-md-6 col-lg-1 columnsofthefooter">
          <h6>Conduct Us</h6>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
