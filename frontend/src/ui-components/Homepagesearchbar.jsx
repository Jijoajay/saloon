import React, { useEffect, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import "../styles/Homepagesearchbar.css";
import { useNavigate } from "react-router-dom";

// Function to calculate Levenshtein distance
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // Initialize first row
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // Initialize first column
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substitution
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j] + 1 // Deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function Homepagesearchbar({ data }) {
  const navigate = useNavigate();
  const [idofthesearchthing, setidofthesearchthing] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [locationDetailsstate, setlocationDetailsstate] = useState();

  useEffect(() => {
    console.log("locationDetailsstate", locationDetailsstate);
  }, [locationDetailsstate]);
  useEffect(() => {
    console.log("searchQuery", searchQuery);
  }, [searchQuery]);
  function filterApproximateMatches(query, strings, threshold) {
    function extractLocationDetails(inputString) {
      // Regular expression to match location details (e.g., city, country)
      const regex = /\b(?:in|at) ([a-zA-Z]+)\b/;
      // Match location details in the input string
      const match = inputString.match(regex);

      // Extract the matched location details
      if (match && match.length > 1) {
        return match[1];
      } else {
        return null; // No location details found
      }
    }

    // Example usage:
    const inputString = query;
    const locationDetails = extractLocationDetails(inputString);
    setlocationDetailsstate(locationDetails);
    const filteredStrings = strings.filter((eachstring) => {
      if (eachstring.value[0].includes(query[0]) && query.length <= 1) {
        console.log("Each string mathes first letter", eachstring);
        return eachstring.value;
      } else {
        if (eachstring.value.toLowerCase().includes(query.toLowerCase())) {
          return eachstring.value.toLowerCase().includes(query.toLowerCase());
        } else {
        }
        return (
          levenshteinDistance(
            query.toLowerCase(),
            eachstring.value.toLowerCase()
          ) <= threshold
        );
      }
    });
    //   setSearchResults(filteredStrings);
    //   console.log("filteredStrings", filteredStrings);
    return filteredStrings;

    //   return strings.filter(
    //     (str) =>
    //       levenshteinDistance(query.toLowerCase(), str.toLowerCase()) <= threshold
    //   );
  }
  useEffect(() => {
    // console.log("searchResults", searchResults);
  }, [searchResults]);

  const handleSearchChange = (event) => {
    const query = event.target.value;

    setSearchQuery(query);
    const ex = query.trim();
    // console.log("ex", ex);

    if (query.trim() === "") {
      //   alert("Empty");
      setSearchResults([]);
    } else {
      // Set the threshold for similarity
      const threshold = 1; // Adjust as needed
      const hold = filterApproximateMatches(query, data, threshold);
      //   console.log("hold", query, data, threshold);
      setSearchResults(filterApproximateMatches(query, data, threshold));
    }
  };

  //   useEffect(() => {
  //     console.log("searchResults ", searchResults);
  //   }, [searchResults]);
  return (
    <InputGroup
      style={{
        height: "50px",
        minWidth: "200px",
        maxWidth: "480px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        marginBottom: "50px",
        marginTop: "50px",
        borderRadius: "25px",
      }}
    >
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderTopLeftRadius: "25px",
          borderBottomLeftRadius: "25px",
          color: "white",
        }}
        className="custom-placeholder-color"
      />
      <InputGroup.Text
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderTopRightRadius: "25px",
          borderBottomRightRadius: "25px",
        }}
        onClick={() => {
          if (searchQuery === "salons for women") {
            navigate("/saloonsformen");
          }
          if (searchQuery === "salons for men") {
          }
          // navigate("/saloonsformen");
        }}
      >
        <CiSearch style={{ color: "white" }} />
      </InputGroup.Text>
      <ul style={{ position: "absolute", top: "60px", left: "0", zIndex: "1" }}>
        {/* {console.log("searchResults", searchResults)} */}
        {/* {searchResults.length > 0 &&
          searchResults.map((result, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderBottomLeftRadius: "25px",
                borderBottomRightRadius: "25px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              {result}
            </li>
          ))} */}
        {searchResults !== undefined && searchResults.length > 0
          ? searchResults.map((result, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "white",
                  border: "1px solid black",
                  marginBottom: "2px",
                  borderRadius: "2px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSearchQuery(result.value);
                  setSearchResults([]);
                  setidofthesearchthing(result.value);
                }}
                // onClick={}
              >
                {result.value}
              </li>
            ))
          : ""}
      </ul>
    </InputGroup>
  );
}

export default Homepagesearchbar;
