import React, { useEffect, useState } from "react";
import "./styles/Selectstylishmen.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  FormControl,
  Modal,
} from "react-bootstrap";
import ReactSearchBox from "react-search-box";
import { AVAILABLESERVICES } from "./Resources/ServiceformenDummy";
import axios from "axios";
// import Filterscontainer from "../../Filterscontainer";
// import Navbarofthesaloon from "../../../../Navbar/Navbarofthesaloon";
import Navbarofthesaloon from "./ui-components/Navbarofthesaloon";
import shavinghead from "./assets/shavinghead.png";
import clock from "./assets/clock.png";
import close from "./assets/close.png";
import calender from "./assets/calender.png";
import moneyimage from "./assets/moneyimage.png";
// import stylishlogo from "../../../../../assets/stylishlogo.png";
import Anderson from "./assets/Anderson.png";
import star from "./assets/star.png";
import bag from "./assets/bag.png";
import smartgirlpixel from "./assets/smartgirlpixel.png";
import handbagpixelated from "./assets/handbagpixelated.png";
import ratingspixelated from "./assets/ratingspixelated.png";
import { CiSearch } from "react-icons/ci";
// import Footer from "../../../../Footer/Footer";
import Filterstylishmen from "./ui-components/Filterstylishmen";
import Calendar from "react-calendar"; // Import react-calendar component
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./ui-components/Footer";
import {
  SELECTSTYLISHTIMINGS,
  STYLISHMENDETAILS,
} from "./Resources/SelectStylishMenDummy";
import { Addedtobebooked } from "./Resources/Addedtobebooked";
import { useDispatch, useSelector } from "react-redux";
import { wholedatacredentials } from "./Reducers/wholedata";
import { appointmentsdata } from "./Reducers/appointmentredusers";

const filteredFemaleStylishMen = STYLISHMENDETAILS.filter(
  (person) => person.gender === "female"
);
const Selectstylishwomen = () => {
  const [termschecktoggle, setermschecktoggle] = useState(false);
  const handletermscheck = () => {
    setermschecktoggle(!termschecktoggle);
  };
  const dispatch = useDispatch();
  const wholeDataREDUX = useSelector((state) => state.wholedata.value);
  const acutualappointmentdata = useSelector(
    (state) => state.appointments.value
  );

  const [trigger, settrigger] = useState(false);

  useEffect(() => {
    // console.log("whole data ...............", wholeDataREDUX);
    if (
      Object.keys(wholeDataREDUX.data.saloondetails).length === 0 ||
      Object.keys(wholeDataREDUX.data.servicedetails).length === 0
    ) {
      navigate("/saloonsforwomen");
    }
  }, [wholeDataREDUX]);

  useEffect(() => {
    console.log("acutualappointmentdata", acutualappointmentdata);
  }, [acutualappointmentdata]);

  const location = useLocation();
  const x = wholeDataREDUX.data.servicedetails.selectedService;
  const headingpassedfromsaloon = wholeDataREDUX.data.saloondetails.saloonname;
  const [currentstylish, setcurrentstylish] = useState();
  const [alldetailstoappoint, setalldatetoappoint] = useState({
    selectedbuttons: {},
    selectedservice: {},
    salonname: {},
    stylishname: {},
    timevalue: {},
    dateofappointment: {},
    timeofappointment: {},
    numberofitems: {},
    totaltime: {},
    totalamount: {},
  });

  useEffect(() => {
    // console.log("alldetailstoappoint", alldetailstoappoint);
    if (uniqueINDEXARR.length === 0) {
      alert("select the timing");
      console.log("SELECT THE TIMiNGI");
    } else {
      if (alldetailstoappoint.dateofappointment.length > 0) {
        console.log("CHECK");

        const someTempvar = wholeDataREDUX;

        dispatch(
          wholedatacredentials({
            data: {
              saloondetails: someTempvar.data.saloondetails,
              servicedetails: someTempvar.data.servicedetails,
              stylishdetails: {
                confirmappointmentdetails: alldetailstoappoint,
              },
            },
          })
        );
        dispatch(
          appointmentsdata({
            data: {
              saloondetails: {},
              confirmappointmentdetails: alldetailstoappoint,
              userdetails: {},
            },
          })
        );
        if (termschecktoggle === true) {
          navigate("/mobile");
        } else {
          alert("Click the Terms and condition");
        }
      }
    }
  }, [alldetailstoappoint]);

  // console.log("headingpassedfromsaloon", headingpassedfromsaloon);
  const [selectedServiceUseLocation, setselectedServiceUseLocation] =
    useState(x);
  const [totalItems, setTotalItems] = useState(0);
  const [totalTime, setTotaltime] = useState(0);
  const [convertedTime, setConvertedTime] = useState("0hours");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // console.log(
    //   "selectedSERVICE FROM USE LOCATION",
    //   selectedServiceUseLocation
    // );
    const somthing = selectedServiceUseLocation;
    const numberofitems = somthing.length;
    // console.log("NUMBER OF ITEMS", numberofitems);
    setTotalItems(numberofitems);
    setTotaltime(0);
    setTotalAmount(0);
    const time = selectedServiceUseLocation.map((item, index) => {
      setTotaltime((prevTotalTime) => prevTotalTime + item.timevalue);
    });

    const money = selectedServiceUseLocation.map((item, index) => {
      setTotalAmount((prevTotalAmount) => prevTotalAmount + item.amount);
    });
    if (uniqueINDEXARR.length > 0) {
      setuniqueINDEXARR([]);
    }
    if (selectedServiceUseLocation.length === 0) {
      alert(" select a service first");
      navigate("/serviceforwomen", {});
    }
    // console.log("totalTime", totalTime);
    // console.log("selectedServiceUseLocation", selectedServiceUseLocation);
  }, [selectedServiceUseLocation]);

  const [autobuttonclick, setautobuttonclick] = useState([]);
  useEffect(() => {
    // console.log("totalTime", totalTime);
    let minutesValue = parseInt(totalTime);
    let hoursValue = Math.floor(minutesValue / 60);
    let remainingMinutesValue = minutesValue % 60;
    if (hoursValue < 1) {
      setConvertedTime(`   ${remainingMinutesValue} mins `);
    }
    if (hoursValue >= 1) {
      setConvertedTime(`${hoursValue} hours   ${remainingMinutesValue} mins `);
    }

    const temp = Math.round(totalTime / 30) + 1;
    // console.log("ITEMS that need tO be cliCked", temp);

    setautobuttonclick(temp);
  }, [totalTime]);

  //converted time useeffect

  // useEffect(() => {
  //   console.log("CONVERTED Time", convertedTime);
  // }, [convertedTime]);

  const [alreadybooked, setalreadybooked] = useState([55]);
  const [buttonno, setbuttonsnum] = useState(25); //no of button that one can select
  const [date, setDate] = useState(new Date());
  const [SELECTEDSTLISHNAME, setSELECTEDSTLISHNAME] = useState("");
  const [SELECTEDAPPDATE, setSELECTEDAPPDATE] = useState("");
  const [SELECTEDAPPTIME, setSELECTEDAPPTIME] = useState("");
  const [selectedServiceDisp, setselectedserviceDisp] = useState([]);
  const [uniqueID, setuniqueID] = useState("");
  const [uniqueINDEX, setuniqueINDEX] = useState("");
  const [selectedID, setSelectedId] = useState();

  const [fullDate, setfullDate] = useState({
    days: date.getDate(),
    months: date.getMonth(),
    years: date.getFullYear(),
  });

  //     setTotalItems(selectedService.length + 1);
  //     setTotaltime((prevtime) => prevtime + itempromax.timevalue);
  //     setTotalAmount((prevamount) => prevamount + itempromax.amount);

  useEffect(() => {
    setselectedserviceDisp(selectedService);
  }, []);

  const [selectedService, setselectedservice] = useState([
    {
      _id: "65e7ee0d8052dae4d27cd38b",
      amount: 300,
      currency: "Rs.",
      duration: "1hour",
      heading: "4",
      isadded: "Added",
      logo: { contentType: "image/png" },
      style: "HAIRCUT",
      timeunit: "hours\n",
      timevalue: 90,
    },
  ]);
  const [addedItems, setAddedItems] = useState({});
  const [expand, setexpand] = useState({});
  const [addeditemsIndex, setAddedItemsIndex] = useState({});
  const [post, setpost] = useState(null);
  const navigate = useNavigate();

  const [dataToPass, setdataToPass] = useState("");

  const handleconfirmappointment = () => {
    const cringeee = {
      IDoftheitem: itemidentifer,
      date: fullDate,
      selectedbuttons: uniqueINDEXARR,
    };
    if (itemidentifer !== null) {
      // console.log("not null");

      //commented postbtndata because i need to only postdata after otp
      // PostbuttonDATA();

      setalldatetoappoint({
        selectedbuttonsdetails: {
          IDoftheitem: itemidentifer,
          date: fullDate,
          selectedbuttons: uniqueINDEXARR,
        },
        selectedservice: selectedServiceUseLocation,
        salonname: headingpassedfromsaloon,
        stylishname: currentstylish,
        timevalue: totalTime,
        dateofappointment: `${fullDate.days}-${fullDate.months + 1}-${
          fullDate.years
        }`,

        timeofappointment: `${
          SELECTSTYLISHTIMINGS[Math.min(...uniqueINDEXARR)]
        }-${
          SELECTSTYLISHTIMINGS[Math.max(...uniqueINDEXARR)] !==
          SELECTSTYLISHTIMINGS[Math.min(...uniqueINDEXARR)]
            ? SELECTSTYLISHTIMINGS[Math.max(...uniqueINDEXARR)]
            : ""
        }`,
        numberofitems: totalItems,
        totaltime: totalTime,
        totalamount: totalAmount,
      });

      // if (alldetailstoappoint.dateofappointment.length > 0) {
      //   alert("Success if its alerts the first time");
      //   console.log("CHECK");

      //   const someTempvar = wholeDataREDUX;

      //   dispatch(
      //     wholedatacredentials({
      //       data: {
      //         saloondetails: someTempvar.data.saloondetails,
      //         servicedetails: someTempvar.data.servicedetails,
      //         stylishdetails: {
      //           confirmappointmentdetails: alldetailstoappoint,
      //         },
      //       },
      //     })
      //   );
      //   dispatch(
      //     appointmentsdata({
      //       data: {
      //         saloondetails: {},
      //         confirmappointmentdetails: alldetailstoappoint,
      //         userdetails: {},
      //       },
      //     })
      //   );

      //   // navigate("/mobile", {
      //   //   state: {
      //   //     confirmappointmentdetails: alldetailstoappoint,
      //   //   },
      //   // });

      //   // navigate("/mobile");
      // }

      // console.log("ALLAPPOINTMENTS DETAILS", alldetailstoappoint);
      // PostbuttonDATAget();
    } else {
      alert("Select any appointments to confirm");
    }
    // console.log("postdatadummy", cringeee);
    setpost(1);
  };

  const [itemidentifer, setitemidentifer] = useState(null);
  useEffect(() => {
    // console.log("selectedID", selectedID);
  }, [selectedID]);

  useEffect(() => {
    // console.log("alreadybooked", alreadybooked);
  }, [alreadybooked]);

  const refreshwhentimechange = async () => {
    // console.log("ITEM._id", ITEM._id);
    // console.log("date", fullDate);

    const response2 = await axios.post(
      "http://127.0.0.1:5000/selectedbuttons/data/alreadybooked",
      {
        IDoftheitem: selectedidofthefilter,
        date: fullDate,
        selectedbuttons: uniqueINDEXARR,
      },
      {}
    );

    // console.log("IT is kind of working", response2);
    if (response2.data.QUeried.length === 0) {
      // console.log("    response2.data.QUeried========0");
      setalreadybooked([55]);

      // alert(
      //   "SETing already booked to 55",
      //   alreadybooked
      // );
    } else {
      // alert(
      //   "time refreshed",
      //   response2.data.QUeried[0]
      //     .selectedbuttons
      // );
      setalreadybooked(response2.data.QUeried[0].selectedbuttons);
    }
  };

  const [selectedidofthefilter, setselectedidofthefilter] = useState("");

  useEffect(() => {
    refreshwhentimechange();
  }, [selectedidofthefilter]);

  const handleSelect = (e, itemId, indexx, ITEM) => {
    // console.log("ITEM OF the seleccted pro ", ITEM);
    setcurrentstylish(ITEM.heading);
    if (uniqueINDEXARR.length > 0) {
      // alert("wait what");
      setuniqueINDEXARR([]);
      // return;
    }
    setselectedidofthefilter(ITEM._id);

    const backendbookeddata = async () => {
      // console.log("ITEM._id", ITEM._id);
      // console.log("date", fullDate);

      const response2 = await axios.post(
        "http://127.0.0.1:5000/selectedbuttons/data/alreadybooked",
        {
          IDoftheitem: ITEM._id,
          date: fullDate,
          selectedbuttons: uniqueINDEXARR,
        },
        {}
      );

      // console.log("response", response2.data);
      // setalreadybooked(response2.data.QUeried[0].selectedbuttons);
      // console.log("RESPONSE 2", response2);
      if (response2.data.QUeried.length === 0) {
        // console.log("hello", response2.data.QUeried);
        setalreadybooked([...alreadybooked, 55]);
        // alert("SETing already booked to 55", alreadybooked);
      } else {
        // alert("EEEELLLSE", response2.data.QUeried[0].selectedbuttons);
        setalreadybooked(response2.data.QUeried[0].selectedbuttons);
      }
    };
    backendbookeddata();

    handletimingdisp(itemId);
    // console.log("SELECTED SAMBAVAM", ITEM);
    setitemidentifer(ITEM._id);
    // console.log("SELECTED SAMBAVAM", selectedID);
    setSELECTEDSTLISHNAME(ITEM.heading);
    e.stopPropagation();
    setAddedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));

    setAddedItemsIndex((prevState) => ({
      ...prevState,
      [indexx]: !prevState[indexx],
    }));
  };

  //orignal one for the display when select
  // const handletimingdisp = (itemId) => {
  //   setexpand((prevState) => ({
  //     ...prevState,
  //     [itemId]: !prevState[itemId],
  //   }));
  // };

  const handletimingdisp = (itemId) => {
    setexpand((prevState) => {
      const newState = {};
      // Set all values to false
      // console.log("expand", expand);
      expand.length > 0 &&
        expand.keys(prevState).forEach((key) => {
          newState[key] = false;
        });
      // Toggle the state associated with itemId to true
      newState[itemId] = !prevState[itemId];
      return newState;
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/selectstylishmenroute/images"
      );
      // console.log("RES FROM BACKEND", response.data.saloonformen);
      setData(response.data.saloonformen);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const PostbuttonDATAget = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/selectedbuttons/data/date",
        {
          IDoftheitem: itemidentifer,
          date: fullDate,
          selectedbuttons: uniqueINDEXARR,
        },
        {}
      );
      // console.log("succesfully getted from post", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const PostbuttonDATA = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/selectedbuttons/data",
        {
          IDoftheitem: itemidentifer,
          date: fullDate,
          selectedbuttons: uniqueINDEXARR,
        },
        {}
      );
      // console.log("SUCESSFULLY POSTED DATA CONFIRM", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const PostbuttonDATAwhentimechange = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/selectedbuttons/data",
        {
          IDoftheitem: itemidentifer,
          date: fullDate,
          selectedbuttons: uniqueINDEXARR,
        },
        {}
      );
      // console.log("SUCESSFULLY POSTED DATA CONFIRM", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterImage = async () => {
    // console.log("Data from the Backend", data);
    const x = data.filter((item) => item.gender !== "MALE");
    setfilteredDatapro(x);
  };
  const [onclicktiming, setonclicktiming] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [DATES, SETDATES] = useState([]);
  const [selectedDATE, SETselectedDATES] = useState({
    date: { days: "-", months: "-", years: "-" },
  });

  const handleclosebuttonclickonservice = (itempromax, index) => {
    const filtered = selectedServiceUseLocation.filter((item) => {
      if (itempromax._id === item._id) {
        // console.log("going to be removed", item._id);
      }
      return itempromax._id !== item._id;
    });
    setselectedServiceUseLocation(filtered);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  DATES;
  useEffect(() => {
    // console.log("dateeeee", date);
    // console.log("DATES", DATES);
  }, [date, DATES]);

  useEffect(() => {
    // console.log("dateeeee", date);
    // console.log("selectedDATE", selectedDATE);
  }, [selectedDATE]);

  useEffect(() => {
    // console.log("dateeeee", date);
    // console.log("fullDate", fullDate);
    // alert("Time change fulldate");
    refreshwhentimechange();

    if (uniqueINDEXARR.length > 0) {
      setuniqueINDEXARR([]);
    }
  }, [fullDate]);

  const handleCloseModal = () => {
    setShowModal(false);
    SETselectedDATES(DATES);
  };

  const handletimechange = (item) => {
    // Logic to handle time change
    // console.log("Time changeeed", item);
  };

  const handleTodaybuttonClick = () => {
    // console.log("full DAtae", fullDate);
    setfullDate({
      days: date.getDate(),
      months: date.getMonth(),
      years: date.getFullYear(),
    });
  };
  const handleTommorowbuttonClick = () => {
    // console.log("full DAtae", fullDate);
    const today = new Date();

    // Create a new date by adding 1 to the current date's date component
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setfullDate({
      days: tomorrow.getDate(),
      months: tomorrow.getMonth(),
      years: tomorrow.getFullYear(),
    });
    // console.log("fullDATE", fullDate);
  };

  // const handletimechange = () => {
  //   console.log("full fullDate", fullDate);
  // };
  const onChange = (date) => {
    setDate(date);

    // SETDATES((prevval) => {
    //   const v = [...prevval, date];
    //   SETDATES(v);
    // });
  };
  const handleh1click = (i) => {
    // console.log("wait", i);
  };

  const [selectedbtnunique, setsselectedbtnunique] = useState(null);
  const [selectedbuttons, setselectedbutton] = useState([]);

  useEffect(() => {
    // console.log("uniqueID", uniqueID);
  }, [uniqueID]);

  const [uniqueINDEXARR, setuniqueINDEXARR] = useState([]);

  useEffect(() => {
    // console.log("uniqueINDEXARR", uniqueINDEXARR);
  }, [uniqueINDEXARR]);

  const [togglebacktounselect, settogglebacktounselect] = useState();

  const handletimingButtonClick = (index, item) => {
    // console.log("ITEM >ID", item._id);
    // setitemidentifer(ITEM._id);
    if (uniqueINDEXARR.includes(index)) {
      // console.log("YES BRO it is already colored");
      setuniqueINDEXARR([]);
      return;
    }
    if (uniqueINDEXARR.length > 0) {
      setuniqueINDEXARR([]);
      return;
    }
    if (
      !uniqueINDEXARR.includes(index) &&
      uniqueINDEXARR.length < buttonno &&
      !alreadybooked.includes(index)
    ) {
      setuniqueINDEX(index);
      setuniqueINDEXARR((prevArray) => {
        const b = index + autobuttonclick;
        let newArray = [];

        for (let i = index; i < b; i++) {
          if (alreadybooked.includes(i)) {
            // console.log("I will Not push you today bro", i);
            newArray = [];
            break;
          } else {
            newArray.push(i);
          }
          // console.log("PUSHED aRRAy", newArray);
        }
        // console.log("Math.max(...newArray)", Math.max(...newArray));
        if (Math.max(...newArray) > 24) {
          alert("select a proper time");
          return [];
        }
        return [...prevArray, ...newArray];
      });
      console.log("Single button click  retrun item ", item);

      //original way of setting the index to change colors
      // setuniqueINDEX(index);
      // setuniqueINDEXARR((prevArray) => [...prevArray, index]);
      // console.log("Single button click   retrun item ", item);
    } else {
      // uniqueINDEXARR.splice(uniqueINDEXARR.indexOf(index), 1);
      const x = uniqueINDEXARR.filter((xitem, xindex) => {
        return xitem !== index;
      });
      setuniqueINDEXARR(x);
      // console.log("uniqueINDEXARR x", uniqueINDEXARR);
    }

    setuniqueID(item._id);
  };
  const [filteredDatapro, setfilteredDatapro] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();

    // Fetch data when component mounts
  }, []);
  useEffect(() => {
    // Fetch data when component mounts
  }, [post]);

  useEffect(() => {
    handleFilterImage();
    console.log("data \n \n \n===>", data, "....... \n \n \n");

    // Filter data when 'data' state changes
  }, [data]);

  useEffect(() => {
    // console.log("FILTERED DATA PROFES", filteredDatapro);
    setfilterwithsearch(filteredDatapro);
  }, [filteredDatapro]);

  const [searchValue, setSearchValue] = useState("Doe");
  const [filterwithsearch, setfilterwithsearch] = useState("");
  const handleSearch = (value) => {
    setfilterwithsearch(data);
    setSearchValue(value);
    // console.log("filteredIMGDATA IN the searCH", filteredIMGDATA);

    const filteredservice = data.filter(
      (item) =>
        item.heading.toLowerCase().includes(value.toString().toLowerCase())
      // console.log("ITEMMMM", item)
    );
    setfilterwithsearch(filteredservice);
  };
  useEffect(() => {
    console.log("filterwithsearch", filterwithsearch);
  }, [filterwithsearch]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbarofthesaloon backgroundcolor="black" color="white" />{" "}
        </Col>
      </Row>
      <Row className="headingandsearchsection">
        <Col>
          <Container>
            <Row>
              <Col className="  col-lg-6 col-md-12  ">
                <h1
                  style={{
                    fontFamily: "Petrona, serif",
                    color: "rgba(53, 53, 53, 1)",
                    fontWeight: "700",
                  }}
                >
                  Select your Stylist{" "}
                </h1>
              </Col>
              {/* <div className="  col-lg-6 col-md-8  col-sm-12 col-sm-12 col-12  containerofthesearchbar">
                <Col className=" col-lg-8 col-md-10 col-sm-10  col-xs-10  col-10 ">
                  <InputGroup className="inputoftheserchbar">
                    <Form.Control
                      type="text"
                      placeholder="Search for saloons"
                      style={{
                        backgroundColor: " rgba(255, 255, 255, 0.1)",
                        borderTopLeftRadius: "25px",
                        borderBottomLeftRadius: "25px",
                      }}
                    />
                    <InputGroup.Text className="inputgroupdottextofthesearchbar">
                      <div
                        className="col-10 "
                        style={{
                          marginTop: "5px",
                          paddingLeft: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <ReactSearchBox
                          style={{ paddingTop: "10px" }}
                          placeholder="Search for saloons"
                          data={filteredDatapro}
                          // value={searchValue}
                          // onChange={(value) => handleSearch(value)}
                          // onSelect={(record) => console.log(record)}
                          rightIcon={<>🎨</>}
                          inputHeight="20px"
                          inputBorderColor="white"
                        />
                      </div>
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </div> */}

              <Col className=" col-12 col-md-8 col-lg-6 searchbar">
                <div>
                  <div
                    className="col-11"
                    style={{
                      display: "flex",

                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      borderTopLeftRadius: "25px",
                      borderBottomLeftRadius: "25px",
                      boxShadow: "0px 4px 6px 4px rgba(0, 0, 0, 0.1) ",
                    }}
                  >
                    <div
                      className="col-10 "
                      style={{
                        marginTop: "5px",
                        paddingLeft: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <ReactSearchBox
                        style={{ paddingTop: "10px" }}
                        placeholder="Search for salons"
                        // value={searchValue}
                        data={filteredDatapro}
                        onChange={(value) => handleSearch(value)}
                        // onSelect={(record) => console.log(record)}
                        rightIcon={<>🎨</>}
                        inputHeight="20px"
                        inputBorderColor="white"
                      />
                    </div>

                    <div
                      style={{
                        borderTopRightRadius: "25px",
                        borderBottomRightRadius: "25px",
                        color: "white",
                        background: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="col-2"
                    >
                      <CiSearch />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Container fluid="xl">
        <Row>
          <Col
            style={{ padding: "0px" }}
            className=" col-12 col-md-12 col-lg-3"
          >
            <Container className="filterofthestyish">
              <Row>
                <Col className="stylishlogocol">
                  <Filterstylishmen
                    setfilteredDatapro={setfilteredDatapro}
                    filteredDatapro={filteredDatapro}
                    data={data}
                    setData={setData}
                  />
                </Col>
              </Row>
              <Row></Row>
            </Container>
          </Col>
          <Col
            style={{ padding: "0px" }}
            className=" col-12 col-md-6 col-lg-5 "
          >
            <Container fluid className="secondarycontainer">
              {/* SECONDARY SINGLE CONTAINER */}

              {filterwithsearch.length > 0 &&
                filterwithsearch.map(function (item, indexx) {
                  const blob = new Blob([Int8Array.from(item.logo.data.data)], {
                    type: item.contentType,
                  });
                  const image = window.URL.createObjectURL(blob);

                  return (
                    <Container
                      fluid
                      // style={{ border: "1px solid blue" }}
                      className="singlesecondarycontainer"
                    >
                      <Row
                        onClick={(e) => handleSelect(e, item._id, indexx, item)}
                        style={{
                          borderBottom: "none",
                          marginRight: "5px",
                          marginLeft: "5px",
                          borderRadius: "25px",
                        }}
                        className="upsinglesecondary"
                        // onClick={() => handletimingdisp(item._id)}
                      >
                        <Col className="secondcolumnpro col-lg-2  col-md-12  ">
                          <img
                            style={{ height: "70px", borderRadius: "10px" }}
                            src={image}
                            alt=""
                          />
                        </Col>
                        <Col className=" secondcolumnpro col-lg-6  col-md-6 ">
                          <Container fluid>
                            <Row style={{ minWidth: "200px" }}>
                              <Col
                                className="col-12 "
                                onClick={() => handleh1click(item._id)}
                                style={{
                                  fontFamily: "petrona,serif",
                                  fontWeight: "700",
                                  fontSize: "20px",
                                }}
                              >
                                {item.heading}
                              </Col>
                            </Row>
                            <Row className="secondrowofsecondcontainer">
                              <Col
                                style={{ paddingRight: "0px" }}
                                className="md-12  lg-6  d-flex "
                              >
                                <img
                                  src={handbagpixelated}
                                  className="columnimageofthesecondcontainer"
                                  alt=""
                                />{" "}
                                <p>
                                  {item.experience}{" "}
                                  {item.experience === "1" ? "year" : "years"}
                                </p>
                              </Col>
                              <Col
                                style={{ paddingRight: "0px" }}
                                className=" md-12  lg-6 d-flex"
                              >
                                <img
                                  src={ratingspixelated}
                                  className="columnimageofthesecondcontainer"
                                  alt=""
                                />{" "}
                                <p>({item.review})</p>
                              </Col>
                            </Row>
                          </Container>
                        </Col>
                        <Col className=" secondcolumnpro col-lg-3 col-md-12 ">
                          <Button
                            style={{ border: "1px solid black" }}
                            className={
                              uniqueINDEXARR.length > 0 &&
                              uniqueINDEXARR &&
                              expand[item._id]
                                ? "selectbuttoninsecondarycontainerifselected"
                                : "selectbuttoninsecondarycontainer"
                            }
                          >
                            {/* {addeditemsIndex[indexx] ? "Selected" : "Select"} */}
                            {uniqueINDEXARR.length > 0 &&
                            uniqueINDEXARR &&
                            expand[item._id]
                              ? "Selected"
                              : "Select"}
                            {/* Select */}
                          </Button>
                        </Col>
                      </Row>
                      <Row
                        className="onclicksecondary"
                        style={{ padding: "0px" }}
                      >
                        <Col>
                          {/* if onclick display */}
                          <Container
                            fluid
                            style={{
                              borderTop: expand[item._id]
                                ? "1px solid rgba(205, 205, 205, 1)"
                                : "none",
                              padding: expand[item._id] ? "25px" : "none",
                              display: expand[item._id] ? "grid" : "none",
                              transition: onclicktiming ? "500ms" : "500ms",
                            }}
                          >
                            <Row className="inerrowonclicksecondary">
                              <Col className=" col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                                <img
                                  onClick={handleShowModal}
                                  src={calender}
                                  alt=""
                                  // style={{ cursor: "pointer" }}
                                  className="calenderimage"
                                />
                                <Container>
                                  <Row className="mt-3">
                                    <Col className="text-center"></Col>
                                  </Row>
                                  <Modal
                                    show={showModal}
                                    onHide={handleCloseModal}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>Calendar</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      {/* Use react-calendar component */}
                                      <Calendar
                                        // onChange={() => onChange(item)}
                                        onChange={(value, event) => {
                                          // setDate(value);
                                          // SETDATES(value),
                                          // console.log("ITEM>id", item._id);
                                          // console.log(
                                          //   "selectedidofthefilter",
                                          //   selectedidofthefilter
                                          // );
                                          // item._id === selectedidofthefilter
                                          //   ? console.log(
                                          //       "same selectedidofthefilter",
                                          //       selectedidofthefilter
                                          //     )
                                          //   : console.log(
                                          //       "Not same",
                                          //       selectedidofthefilter,
                                          //       item._id
                                          //     );
                                          setfullDate({
                                            days: value.getDate(),
                                            months: value.getMonth(),
                                            years: value.getFullYear(),
                                          });
                                          SETDATES((prev) => ({
                                            ...prev,
                                            _id: [item._id],
                                            date: fullDate,
                                          }));

                                          // const refreshwhentimechange =
                                          //   async () => {
                                          //     // console.log("ITEM._id", ITEM._id);
                                          //     // console.log("date", fullDate);

                                          //     const response2 =
                                          //       await axios.post(
                                          //         "http://127.0.0.1:5000/selectedbuttons/data/alreadybooked",
                                          //         {
                                          //           IDoftheitem:
                                          //             selectedidofthefilter,
                                          //           date: fullDate,
                                          //           selectedbuttons:
                                          //             uniqueINDEXARR,
                                          //         },
                                          //         {}
                                          //       );

                                          //     console.log(
                                          //       "IT is kind of working",
                                          //       response2
                                          //     );
                                          //     if (
                                          //       response2.data.QUeried
                                          //         .length === 0
                                          //     ) {
                                          //       console.log(
                                          //         "    response2.data.QUeried========0"
                                          //       );
                                          //       setalreadybooked([55]);

                                          //       // alert(
                                          //       //   "SETing already booked to 55",
                                          //       //   alreadybooked
                                          //       // );
                                          //     } else {
                                          //       // alert(
                                          //       //   "time refreshed",
                                          //       //   response2.data.QUeried[0]
                                          //       //     .selectedbuttons
                                          //       // );
                                          //       setalreadybooked(
                                          //         response2.data.QUeried[0]
                                          //           .selectedbuttons
                                          //       );
                                          //     }
                                          //   };

                                          // refreshwhentimechange();
                                        }}
                                        value={date}
                                        className="custom-calendar"
                                        calendarClassName="custom-calendar-container"
                                        tileClassName="custom-calendar-tile"
                                      />
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="secondary"
                                        onClick={handleCloseModal}
                                      >
                                        Close
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </Container>

                                {/* <img onClick={handleShowModal}  src={calender} alt="" /> */}
                              </Col>
                              <Col className="   col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6  col-xxl-3">
                                <Container>
                                  <Row>
                                    <Col>
                                      <h6
                                        style={{
                                          color: "rgba(53, 53, 53, 1)",
                                          fontSize: "10px",
                                        }}
                                      >
                                        Date of appointment
                                      </h6>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <h6 style={{ fontWeight: "700" }}>
                                        {/* {selectedDATE.date} */}
                                        {fullDate && fullDate.days}-
                                        {fullDate && fullDate.months + 1}-
                                        {fullDate && fullDate.years}
                                      </h6>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                              <Col className=" col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                                <Button
                                  onClick={handleTodaybuttonClick}
                                  className="buttonofsecondary"
                                >
                                  Today
                                </Button>
                              </Col>
                              <Col className=" col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                                <Button
                                  onClick={handleTommorowbuttonClick}
                                  className="buttonofsecondary"
                                >
                                  Tomorrow
                                </Button>
                              </Col>
                            </Row>

                            <Row
                              style={{
                                paddingTop: "25px",
                              }}
                            >
                              {SELECTSTYLISHTIMINGS.map(
                                (itemselectedtime, index) => {
                                  const unique2 = item._id + index;
                                  // const incrementedID = uniqueID[0] + 1;
                                  // console.log("increment", incrementedID);

                                  // if (uniqueID.includes(unique2)) {
                                  //   console.log(
                                  //     "uniqueID",
                                  //     uniqueID,
                                  //     " id",
                                  //     unique2
                                  //   );
                                  // }

                                  return (
                                    <Col className="col-3" key={index}>
                                      <button
                                        style={{
                                          fontSize: "12px",
                                          fontFamily: "poppins,sans-serif",
                                          borderRadius: "30px",
                                          padding: "03px 5px 03px 5px",
                                          width: "70px",
                                          marginBottom: "25px",

                                          border:
                                            alreadybooked.length > 0 &&
                                            alreadybooked.includes(index)
                                              ? "1px solid rgba(181, 181, 181, 1)"
                                              : "1px solid  black",

                                          background:
                                            uniqueID === item._id &&
                                            uniqueINDEXARR.includes(index)
                                              ? "black"
                                              : "white",

                                          color:
                                            uniqueID === item._id &&
                                            uniqueINDEXARR.includes(index)
                                              ? "white"
                                              : alreadybooked.length > 0 &&
                                                alreadybooked.includes(index)
                                              ? "rgba(181, 181, 181, 1)"
                                              : "black",

                                          //   border:
                                          //     uniqueID === item._id &&
                                          //     uniqueINDEXARR.includes(index)
                                          //       ? "1px solid red"
                                          //       : "black",

                                          //  background:
                                          //     alreadybooked.length > 0 &&
                                          //     alreadybooked.includes(index)
                                          //       ? "black"
                                          //       : "white",
                                          //   color:
                                          //     alreadybooked.length > 0 &&
                                          //     alreadybooked.includes(index)
                                          //       ? "white"
                                          //       : "black",

                                          //   border:
                                          //     uniqueID === item._id &&
                                          //     uniqueINDEXARR.includes(index)
                                          //       ? "1px solid red"
                                          //       : "black",

                                          //  background:
                                          //     alreadybooked.length > 0 &&
                                          //     alreadybooked.includes(index)
                                          //       ? "black"
                                          //       : "white",
                                          //   color:
                                          //     alreadybooked.length > 0 &&
                                          //     alreadybooked.includes(index)
                                          //       ? "white"
                                          //       : "black",
                                        }}
                                        className="bookedbutton notbooked booking "
                                        onClick={() =>
                                          handletimingButtonClick(index, item)
                                        }
                                      >
                                        {itemselectedtime}
                                        {/* {unique} */}
                                      </button>
                                    </Col>
                                  );
                                }
                              )}
                              {/* {SELECTSTYLISHTIMINGS.map((itemmm, index) => {
                                const unique = item._id + index;
                                return (
                                  <Col className="col-3" key={unique}>
                                    <button
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "poppins,sans-serif",
                                        borderRadius: "30px",
                                        padding: "03px 5px 03px 5px",
                                        width: "70px",
                                        marginBottom: "25px",
                                        backgroundColor:
                                          selectedButtonIndex === unique ||
                                          selectedButtonIndex === unique - 1 ||
                                          selectedButtonIndex === unique - 2
                                            ? "black"
                                            : "white",
                                        color:
                                          selectedButtonIndex === unique ||
                                          selectedButtonIndex === unique - 1 ||
                                          selectedButtonIndex === unique - 2
                                            ? "white"
                                            : "black",
                                      }}
                                      className="bookedbutton notbooked booking "
                                      onClick={() =>
                                        handletimingButtonClick(
                                          index,
                                          item._id,
                                          unique
                                        )
                                      }
                                    >
                                      {itemmm}
                                    </button>
                                  </Col>
                                );
                              })} */}
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  );
                })}
            </Container>
          </Col>
          <Col style={{ padding: "0px" }} className=" col-12 col-md-6 col-lg-4">
            <Container
              style={{ minHeight: "200px" }}
              className="ternarycontainer"
              fluid
            >
              {selectedServiceUseLocation.length > 0 &&
                selectedServiceUseLocation.map(function (itempromax, index) {
                  const blob = new Blob(
                    [Int8Array.from(itempromax.logo.data.data)],
                    {
                      type: itempromax.contentType,
                    }
                  );
                  const image = window.URL.createObjectURL(blob);

                  return (
                    <Container className="singleternarycont" id={index}>
                      <Row>
                        <Col
                          style={{ padding: "0px" }}
                          className="col-lg-2 col-2 col-md-2   col-xl-2 itemdotlogocol"
                        >
                          <img
                            style={{ maxHeight: "50px" }}
                            src={image}
                            alt=""
                          />
                        </Col>
                        <Col className="col-lg-8 col8 col-sm-8 col-md-8 col-xl-9">
                          <Container fluid>
                            <Row>
                              <Col>
                                <h6
                                  style={{
                                    textAlign: "start",
                                    fontFamily: "petrona,serif",
                                    fontWeight: "700",
                                    fontSize: "19px",
                                  }}
                                >
                                  {itempromax.heading}
                                </h6>
                              </Col>
                            </Row>
                            <Row style={{ padding: "0px", margin: "0px" }}>
                              <Col
                                className="col-6"
                                style={{
                                  display: "flex",
                                  paddingLeft: "20px",
                                  padding: "0px",
                                  margin: "0px",
                                }}
                              >
                                <img
                                  src={clock}
                                  style={{
                                    height: "25px",
                                  }}
                                  alt=""
                                />{" "}
                                <p
                                  style={{
                                    color: "rgba(121, 121, 121, 1)",
                                    fontFamily: "poppins,sans-serif",
                                    paddingTop: "2px",
                                    fontSize: "16px",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  {itempromax.timevalue}
                                  mins
                                </p>
                              </Col>
                              <Col
                                className="col-6"
                                style={{
                                  display: "flex",
                                  paddingLeft: "20px",
                                  padding: "0px",
                                  margin: "0px",
                                }}
                              >
                                <img
                                  src={moneyimage}
                                  style={{
                                    height: "25px",
                                  }}
                                  alt=""
                                />{" "}
                                <p
                                  style={{
                                    fontFamily: "poppins,sans-serif",
                                    paddingTop: "2px",
                                    fontSize: "16px",
                                    paddingLeft: "10px",
                                    fontWeight: "700",
                                    color: "rgba(53, 53, 53, 1)",
                                  }}
                                >
                                  {itempromax.currency}
                                  {itempromax.amount}
                                </p>
                              </Col>
                            </Row>
                          </Container>
                        </Col>
                        <Col className="  col-lg-1 col-2  col-sm-2 col-md-2  col-xl-1">
                          <img
                            style={{
                              marginRight: "10px",
                              marginTop: "14px",
                              maxHeight: "30px",
                              cursor: "pointer",
                            }}
                            src={close}
                            alt=""
                            onClick={() =>
                              handleclosebuttonclickonservice(itempromax, index)
                            }
                          />
                        </Col>
                      </Row>
                    </Container>
                  );
                })}

              <Container>
                <Row
                  style={{
                    paddingRight: "0px",
                    marginTop: "180px",
                    marginBottom: "15px",
                  }}
                >
                  <Col className="col-1">
                    <input onClick={handletermscheck} type="checkbox" />
                  </Col>
                  <Col className="col-10">
                    <p>
                      I Accept the{" "}
                      <span>
                        {" "}
                        <a href="#">terms and condition</a>{" "}
                      </span>
                    </p>{" "}
                  </Col>
                </Row>
                <Row style={{ marginTop: "15px", marginBottom: "15px" }}>
                  <Col style={{ padding: "0px" }} className="col-4 d-flex">
                    <img
                      className="align-self-start"
                      style={{ margin: "0px" }}
                      src={calender}
                      alt=""
                    />
                    <div className="d-flex flex-column gap-0">
                      <p
                        style={{
                          fontFamily: "poppins,sans-serif",
                          fontWeight: "200",
                          fontSize: "10px",
                          textAlign: "start",
                          paddingTop: "5px",
                          margin: "0px",
                        }}
                      >
                        Your Stylist
                      </p>
                      <h6
                        style={{
                          fontFamily: "poppins,sans-serif",
                          fontWeight: "600",
                          fontSize: "10px",
                          margin: "0px",
                        }}
                      >
                        {SELECTEDSTLISHNAME}
                      </h6>
                    </div>
                  </Col>
                  <Col style={{ padding: "0px" }} className="col-4 d-flex">
                    <img
                      className="align-self-start"
                      style={{ margin: "0px" }}
                      src={calender}
                      alt=""
                    />
                    <div className="d-flex flex-column gap-0">
                      <p
                        style={{
                          fontFamily: "poppins,sans-serif",
                          fontWeight: "200",
                          fontSize: "08px",
                          textAlign: "start",
                          paddingTop: "5px",

                          margin: "0px",
                        }}
                      >
                        Date of Appointment{" "}
                      </p>
                      <h6
                        style={{
                          fontFamily: "poppins,sans-serif",
                          fontWeight: "600",
                          fontSize: "10px",
                          margin: "0px",
                        }}
                      >
                        {fullDate && fullDate.days}-
                        {fullDate && fullDate.months + 1}-
                        {fullDate && fullDate.years}
                      </h6>
                    </div>
                  </Col>
                  <Col style={{ padding: "0px" }} className="col-4 d-flex">
                    <img
                      className="align-self-start"
                      style={{ margin: "0px" }}
                      src={calender}
                      alt=""
                    />
                    <div className="d-flex flex-column gap-0">
                      <p
                        style={{
                          fontFamily: "poppins,sans-serif",
                          fontWeight: "200",
                          fontSize: "08px",
                          textAlign: "start",
                          paddingTop: "5px",
                          margin: "0px",
                        }}
                      >
                        Time of Appointment{" "}
                      </p>
                      <h6
                        style={{
                          fontFamily: "poppins,sans-serif",
                          fontWeight: "600",
                          fontSize: "10px",
                          margin: "0px",
                        }}
                      >
                        {SELECTSTYLISHTIMINGS[Math.min(...uniqueINDEXARR)]}-
                        {SELECTSTYLISHTIMINGS[Math.max(...uniqueINDEXARR)] !==
                        SELECTSTYLISHTIMINGS[Math.min(...uniqueINDEXARR)]
                          ? SELECTSTYLISHTIMINGS[Math.max(...uniqueINDEXARR)]
                          : ""}
                      </h6>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "30px", marginTop: "30px" }}>
                  <Col style={{ paddingRight: "0px" }} className="col-2 ">
                    <div className="d-flex flex-column">
                      <p
                        style={{
                          fontFamily: "poppins,sans-serif",
                          fontWeight: "300",
                          fontSize: "10px",

                          margin: "0px",
                        }}
                      >
                        {totalItems}Items
                      </p>
                      <h6
                        style={{
                          fontFamily: "poppins,sans-serif",
                          fontWeight: "600",
                          fontSize: "15px",

                          margin: "0px",
                        }}
                      >
                        {convertedTime}
                      </h6>
                    </div>
                  </Col>
                  <Col
                    style={{
                      paddingLeft: "10px",
                      borderLeft: "2px solid rgba(205, 205, 205, 1)",
                    }}
                    className="col-3"
                  >
                    <h6
                      style={{
                        fontFamily: "poppins,sans-serif",
                        fontWeight: "600",
                        fontSize: "15px",
                        paddingTop: "15px",
                        margin: "0px",
                      }}
                    >
                      Rs.{totalAmount}
                    </h6>
                  </Col>
                  <Col className="col-6">
                    <Button
                      variant=""
                      style={{ border: "1px solid black" }}
                      className="buttonofsecondary "
                      onClick={handleconfirmappointment}
                    >
                      <h6
                        style={{
                          fontFamily: "poppins,sans-serif",
                          fontWeight: "600",
                          fontSize: "10px",
                          padding: "5px",
                          margin: "0px",
                        }}
                      >
                        Confirm Appointment
                      </h6>
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Selectstylishwomen;
