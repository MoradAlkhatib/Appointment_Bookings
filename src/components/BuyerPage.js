import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FaSistrix } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Appointments from "./Appointments";

export default function BuyerPage(props) {
  const [sellers, setSellers] = useState([]);
  let [counter, setCounter] = useState(0);
  let [showAppointment, setShowAppointment] = useState(false);
  let [sellerData, setSellerData] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // get all seller from database to display them fro buyer.
    axios.get(`http://localhost:5000/api/sellers`).then((res) => {
      setSellers(res.data.response);
    });
  }, [""]);

  const handleSearch = (e) => {
    // function for handle search about specific seller.
    e.preventDefault();
    let sellerName = e.target.searchBar.value;

    setCounter(++counter);

    axios.get("http://localhost:5000/api/sellers").then((res) => {
      console.log(sellers + "1");
      setSellers(res.data.response);
      let arr = sellers.filter((item) => {
        return item.name.includes(sellerName);
      });
      setSellers(arr);

  
    });

  };

  const appointmentWithSeller = (data) => {
    setShowAppointment(true);
    setSellerData(data);
  };

  return (
    <div>
      {/* form search about specific seller */}

      {!showAppointment ? (
        <div>
          {/* Render Search About Seller And All Seller*/}
          <form
            onSubmit={(e) => handleSearch(e)}
            className="flex border-4  w-1/4 text-center items-center justify-between  m-auto my-4"
          >
            <input
              type="text"
              id="header-search"
              placeholder="Search blog posts"
              name="searchBar"
              className=" hover:ring-2 ring-inset ring-slate-700 p-2 text-lg w-/4 h-full"
            />
            <div className="flex ring-2 ring-inset ring-slate-700 p-2 text-lg w-1/4">
              {" "}
              <FaSistrix className="mr-1 mt-1" />
              <button type="submit">Search</button>
            </div>
          </form>

          <Row>
            {/* render all sellers */}
            {sellers.map((item, index) => {
              return (
                <Col key={index} md={6} lg={4} sm={12}>
                  <Card style={{ width: "18rem" }} className="items-center">
                    <Card.Body>
                      <Card.Title className=" w-40">{item.name}</Card.Title>
                      <Card.Text className="w-40">
                        {item.service}
                        {item.email}
                      </Card.Text>

                      {/* as={Link}   to="/appointment" */}
                      <Button
                        variant="primary"
                        onClick={(data) => appointmentWithSeller(item)}
                      >
                        Booking Appoint
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
            <br />
          </Row>
        </div>
      ) : (
        <div>
          {/* Render Appointment that related with seller how choose*/}
          <Appointments sellerData={sellerData} />
        </div>
      )}
    </div>
  );
}
