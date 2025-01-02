// import React, { useState } from "react";
// import { Row, Col, Container, Button } from "react-bootstrap";
// import barbermen from "./assets/barbermen.png";
// import barbergirl from "./assets/barbergirl.png";
// import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
// import { useNavigate } from "react-router-dom";
// import "./styles/MensgirlsSection.css";
// const Mensgirlstwo = () => {
//   const navigate = useNavigate();
//   const mensbuttonclick = () => {
//     navigate("/saloonsformen");
//   };
//   const girlsbuttonclick = () => {
//     navigate("/saloonsforwomen");
//   };
//   const [mentogglebutton, setmentogglebutton] = useState(false);
//   const [womentogglebutton, setwomentogglebutton] = useState(false);

//   return (
//     <Container
//       style={{
//         padding: "0px",
//         margin: "0px",
//         minWidth: "100%",
//         height: "auto",
//         position: "relative",
//       }}
//     >
//       <div style={{ position: "relative", zIndex: "1" }}>
//         <Navbarofthesaloon backgroundcolor="black" color="white" />
//       </div>
//       {/* <h1 className="h11">h11</h1> */}
//       <Row
//         style={{
//           padding: "0px",
//           margin: "0px",
//           width: "100%",
//           justifyContent: "center",
//         }}
//       >
//         <Col
//           className="col-6  "
//           style={{
//             maxWidth: "800px",
//             padding: "0px",
//             margin: "0px",

//             // position: "relative",
//           }}
//           onMouseOver={() => setmentogglebutton(true)}
//           onMouseOut={() => setmentogglebutton(false)}
//         >
//           <img
//             className="barbermenimage menssectionhover  "
//             // style={{ minWidth: "768px", padding: "0px", margin: "0px" }}
//             src={barbermen}
//             alt=""
//           />
//           <button
//             onClick={mensbuttonclick}
//             style={{
//               width: "100%",
//               height: "75px",
//               background: mentogglebutton
//                 ? "rgba(1, 11, 15, 0.6)"
//                 : "rgba(1, 11, 15, 0.3)",
//               transition: "500ms",
//               color: "White",
//               fontWeight: "700",
//               fontSize: "40px",
//               position: "sticky",
//               left: "0px",
//               bottom: "0px",
//               border: "1px solid black",
//             }}
//           >
//             Men
//           </button>
//         </Col>
//         <Col
//           className="col-6"
//           style={{
//             maxWidth: "800px",
//             padding: "0px",
//             margin: "0px",
//             position: "relative",
//           }}
//           onMouseOver={() => setwomentogglebutton(true)}
//           onMouseOut={() => setwomentogglebutton(false)}
//         >
//           <img
//             style={{
//               minWidth: "768px",
//               padding: "0px",
//               margin: "0px",
//             }}
//             className=" menssectionhover"
//             src={barbergirl}
//             alt=""
//           />
//           <button
//             style={{
//               width: "100%",
//               height: "75px",
//               background: womentogglebutton
//                 ? "rgba(1, 11, 15, 0.6)"
//                 : "rgba(1, 11, 15, 0.3)",
//               transition: "500ms",
//               color: "White",
//               fontWeight: "700",
//               fontSize: "40px",
//               position: "sticky",
//               right: "0px",
//               bottom: "0px",
//               border: "1px solid black",
//             }}
//             className={womentogglebutton ? "buttonhoverandimage" : ""}
//             onClick={girlsbuttonclick}
//           >
//             Women
//           </button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Mensgirlstwo;

import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import barbermen from "./assets/barbermen.png";
import barbergirl from "./assets/barbergirl.png";
import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
import { useNavigate } from "react-router-dom";
import "./styles/MensgirlsSection.css";
import Footer from "./ui-components/Footer";

const Mensgirlstwo = () => {
  const navigate = useNavigate();
  const mensbuttonclick = () => {
    navigate("/saloonsformen");
  };
  const girlsbuttonclick = () => {
    navigate("/saloonsforwomen");
  };
  const [mentogglebutton, setmentogglebutton] = useState(false);
  const [womentogglebutton, setwomentogglebutton] = useState(false);

  const menImageRef = useRef(null);
  const womenImageRef = useRef(null);
  const menButtonRef = useRef(null);
  const womenButtonRef = useRef(null);

  useEffect(() => {
    if (menImageRef.current && womenImageRef.current) {
      const menImageHeight = menImageRef.current.offsetHeight;
      const womenImageHeight = womenImageRef.current.offsetHeight;
      const maxHeight = Math.max(menImageHeight, womenImageHeight);
      menButtonRef.current.style.height = `${maxHeight}px`;
      womenButtonRef.current.style.height = `${maxHeight}px`;
    }
  }, []);
  return (
    <Container
      style={{
        padding: "0px",
        margin: "0px",
        minWidth: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: "1" }}>
        <Navbarofthesaloon backgroundcolor="black" color="white" />
      </div>
      {/* <h1 className="h11">h11</h1> */}
      <Row
        style={{
          padding: "0px",
          margin: "0px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Col
          onClick={mensbuttonclick}
          className="col-6  "
          style={{
            maxWidth: "800px",
            padding: "0px",
            margin: "0px",

            // position: "relative",
          }}
          onMouseOver={() => setmentogglebutton(true)}
          onMouseOut={() => setmentogglebutton(false)}
        >
          <img
            className="barbermenimage menssectionhover  "
            // style={{ minWidth: "768px", padding: "0px", margin: "0px" }}
            src={barbermen}
            alt=""
          />
          <button
            style={{
              width: "100%",
              height: "75px",
              background: mentogglebutton
                ? "rgba(1, 11, 15, 0.6)"
                : "rgba(1, 11, 15, 0.3)",
              transition: "500ms",
              color: "White",
              fontWeight: "700",
              fontSize: "40px",
              position: "sticky",
              left: "0px",
              bottom: "0px",
              border: "1px solid black",
            }}
          >
            Men
          </button>
        </Col>
        <Col
          onClick={girlsbuttonclick}
          className="col-6"
          style={{
            maxWidth: "800px",
            padding: "0px",
            margin: "0px",
            position: "relative",
          }}
          onMouseOver={() => setwomentogglebutton(true)}
          onMouseOut={() => setwomentogglebutton(false)}
        >
          <img
            style={{
              minWidth: "768px",
              padding: "0px",
              margin: "0px",
            }}
            className=" menssectionhover"
            src={barbergirl}
            alt=""
          />
          <button
            style={{
              width: "100%",
              height: "75px",
              background: womentogglebutton
                ? "rgba(1, 11, 15, 0.6)"
                : "rgba(1, 11, 15, 0.3)",
              transition: "500ms",
              color: "White",
              fontWeight: "700",
              fontSize: "40px",
              position: "sticky",
              right: "0px",
              bottom: "0px",
              border: "1px solid black",
            }}
            className={womentogglebutton ? "buttonhoverandimage" : ""}
          >
            Women
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Mensgirlstwo;
