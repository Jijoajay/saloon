import React, { useState, useEffect } from "react";
import { getDistance } from "geolib";
import axios from "axios";
const Test5 = () => {
  const [placenamestate, setplacenamestate] = useState("");
  //api key
  // AIzaSyAPMGgbHwqwz-bQ1Zl2_2QBH0U7tblo3rs
  const [nearestPlaces, setNearestPlaces] = useState([]);
  const [currentLocation, setcurrentLocation] = useState({});

  const getCurrentLocation = () => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          // Log the current location to the console
          console.log("CUREENT LOCATION", { latitude, longitude });
          setcurrentLocation({
            latitude: latitude,
            longitude: longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  getCurrentLocation();

  // 8.18743310932512, 77.41718550165982
  const getPlaceName = async (latitude, longitude) => {
    const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=6604f48bb31ba040960444oky6154fc`;

    try {
      const response = await axios.get(apiUrl);
      setplacenamestate(response.data.display_name);
    } catch (error) {
      //   console.error("Error retrieving place name:", error);
      return null;
    }
  };
  //8.313118739035943, 77.20649853043774
  //8.313628311738478, 77.20237865760464
  const x = { latitude: 8.081963672504925, longitude: 77.55110943325019 };
  getPlaceName(x.latitude, x.longitude);

  useEffect(() => {
    // Example current location (villukuri)
    const currentLocation = {
      latitude: 8.222723349522987,
      longitude: 77.35384043973744,
    };

    // Example places
    const places = [
      {
        name: "marthdandam",
        coordinates: {
          latitude: 8.307252473793303,
          longitude: 77.22318633308191,
        },
      },
      {
        name: "trivandrum",
        coordinates: {
          latitude: 8.56751323658401,
          longitude: 76.8684079866431,
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
        name: "THuckalay",
        coordinates: {
          latitude: 8.24177372548943,
          longitude: 77.32212861593982,
        },
      },
    ];

    // Sort places array based on distance from currentLocation
    const sortedPlaces = places.sort((a, b) => {
      const distanceA = getDistance(currentLocation, a.coordinates);
      const distanceB = getDistance(currentLocation, b.coordinates);
      return distanceA - distanceB;
    });
    setNearestPlaces(sortedPlaces);
  }, []);

  useEffect(() => {
    console.log("x", x);
    console.log("currentLocation currentLocation", currentLocation);
    getPlaceName(currentLocation.latitude, currentLocation.longitude);

    console.log(placenamestate);
  }, [currentLocation]);

  useEffect(() => {
    // console.log("placename", placenamestate);
  }, [placenamestate]);

  return (
    <div>
      <h1>Nearest Places:</h1>
      <ul>
        {nearestPlaces.map((place, index) => (
          <li key={index}>{place.name}</li>
        ))}
        {placenamestate ? placenamestate : ""}
      </ul>
    </div>
  );
};

export default Test5;
