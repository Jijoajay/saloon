import React, { useEffect, useState } from "react";
import axios from "axios";
const Test = () => {
  const [data, setdata] = useState("");
  let response;
  const fetchData = async () => {
    try {
      response = await axios.get("http://127.0.0.1:5000/uploadpro");
      console.log("response", response.data);
      setdata(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    setdata(data);
    console.log("data of the Backend", data);

    fetchData();
  }, []);
  return (
    <div>
      Testsdfsdfsdfsdf
      {data.length > 0 &&
        data.map((item, index) => {
          return (
            <div>
              sddfsd
              <img src={item.path} alt="" />;
            </div>
          );
        })}
    </div>
  );
};

export default Test;
