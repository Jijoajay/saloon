import React, { useState, useEffect } from "react";
import { getDistance } from "geolib";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

const Test6 = () => {
  const [nearestPlaces, setNearestPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [Locationfrominput, setLocationfrominput] = useState(null);

  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState(""); // New state for the address input

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentLocation) {
      console.log("currentlocation", currentLocation);

      getPlaceName(currentLocation.latitude, currentLocation.longitude);
    }
  }, [currentLocation]);

  const getPlaceName = async (latitude, longitude) => {
    const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=6604f48bb31ba040960444oky6154fc`;
    console.log("latand lon", latitude, longitude);
    try {
      const response = await axios.get(apiUrl);
      setPlaceName(response.data.display_name);
    } catch (error) {
      console.error("Error retrieving place name:", error);
    }
  };

  useEffect(() => {
    if (placeName !== "") {
      let currentLocation2;
      if (Locationfrominput) {
        alert("Hello");
        currentLocation2 = Locationfrominput;
        console.log("HEEELLLO", currentLocation2);
      } else {
        currentLocation2 = {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        };
      }
      console.log("current location2", currentLocation2);
      const places = [
        {
          name: "THuckalay",
          coordinates: {
            latitude: 8.24177372548943,
            longitude: 77.32212861593982,
          },
        },
        {
          name: "marthdandam",
          coordinates: {
            latitude: 8.307252473793303,
            longitude: 77.22318633308191,
          },
        },
        {
          name: "villukuri",
          coordinates: {
            latitude: 8.22430110460471,
            longitude: 77.35195427419718,
          },
        },
        {
          name: "trivandrum",
          coordinates: {
            latitude: 8.527179499848486,
            longitude: 76.93887546889944,
          },
        },
        {
          name: "palpannai",
          coordinates: {
            latitude: 8.18252527216889,
            longitude: 77.41402684846703,
          },
        },

        {
          name: "kanyakumari",
          coordinates: {
            latitude: 8.083350708802255,
            longitude: 77.5564834370575,
          },
        },
      ];
      const sortedPlaces = places.sort((a, b) => {
        const distanceA = getDistance(currentLocation2, a.coordinates);
        const distanceB = getDistance(currentLocation2, b.coordinates);
        return distanceA - distanceB;
      });
      setNearestPlaces(sortedPlaces);
    }
    console.log("placeName", placeName);
  }, [placeName]);

  const handleGeocode = async () => {
    try {
      console.log("ADDRESS ENTERED", address);
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${address}&api_key=6604f48bb31ba040960444oky6154fc`
      );
      console.log("RESponse from the geocode", response.data[0]);
      const { lat, lon } = response.data[0]; // Assuming the API returns latitude and longitude
      console.log("LATANDLONG", lat, lon);
      setLocationfrominput({ latitude: lat, longitude: lon });
      setPlaceName(address);
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  return (
    <div>
      <h1>Current Location:</h1>
      {currentLocation && (
        <div>
          <p>Latitude: {currentLocation.latitude}</p>
          <p>Longitude: {currentLocation.longitude}</p>
        </div>
      )}
      <h1>Current place Name:</h1>
      {placeName && <p>{placeName}</p>}
      <h1>Enter Address for Geocoding:</h1>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter address"
      />
      <button onClick={handleGeocode}>Geocode</button>

      <p>Geocode lat{Locationfrominput && Locationfrominput.latitude}</p>
      <p>Geocode long{Locationfrominput && Locationfrominput.longitude}</p>

      <h1>Nearest place order</h1>
      {nearestPlaces.map((place, index) => (
        <li key={index}>{place.name}</li>
      ))}

      <Container fluid>
        <Row>
          <Col style={{ color: "red" }}>
            <h2>red</h2>
          </Col>
          <Col>
            <h2 style={{ color: "red" }}>red</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Test6;
