import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { wholedatacredentials } from "./Reducers/wholedata"; // Adjust the path accordingly
import { useNavigate } from "react-router-dom";

const ReduxTestingontherpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Accessing state from Redux store
  const wholeData = useSelector((state) => state.wholedata.value);
  const handleAddData = () => {
    // Dispatching action to add 100 to the data array
    dispatch(wholedatacredentials({ data: [...wholeData.data, 100] }));
  };
  const handlenavigate = () => {
    navigate("/reduxtest");
  };

  return (
    <div>
      <h1>Reduxtest</h1>
      {/* Displaying data from Redux state */}
      <ul>
        {wholeData.data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {/* Button to trigger adding 100 to the data array */}
      <button onClick={handleAddData}>Add 100</button>
      <button onClick={handlenavigate}>Navigate</button>
    </div>
  );
};

export default ReduxTestingontherpage;
