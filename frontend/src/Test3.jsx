import React, { useEffect, useState } from "react";
import axios from "axios";
// import jwt_decode from "jwt-decode";
const Test3 = () => {
  const [token, setToken] = useState("");

  const theTestFunctionPost = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/test/data", {
        email: "rolesonjg96@gmail.com",
        phonenumber: 8585858585,
      });
      // Extract token from response data
      const receivedToken = response.data.token;
      // Store token in localStorage
      // localStorage.setItem("token", receivedToken);
      // Update token state
      setToken(receivedToken);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("Testing jwt");
    // theTestFunctionPost();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const decodedToken = jwt_decode(storedToken);
    console.log("decodedToken", decodedToken);
  }, [token]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>JWT TOKEN</h1>
    </div>
  );
};

export default Test3;
