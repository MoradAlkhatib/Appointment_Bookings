import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
export default function SellerPage(props) {
  const [allAppointments, setAllAppointments] = useState([]);

  useEffect(() => {
    // use effect to get all seller appointments that reserved from buyer.
    let body = { whoReceived: JSON.parse(localStorage.getItem("user")).email };

    axios({
      method: "get",
      url: `http://localhost:5000/api/appointment/appointments`,
      data: JSON.parse(localStorage.getItem("user")).email,
    }).then((res) => {
      setAllAppointments(res.data);
    });
  }, [""]);

  const cancelBooking = (id) => {
    // for cancel user appointment by delete it.
    axios
      .delete(`http://localhost:5000/api/appointment/update/?=${id}`)
      .then((res) => {});
  };
  const acceptAppointment = (id) => {
    // for accept user appointment so make active true and underProcess throw update appointment.
    let body = {
      active: true,
      underProcess: false,
    };
    axios
      .put(`http://localhost:5000/api/appointment/update/?=${id}`, body)
      .then((res) => {});
  };

  return (
    <div>
      {/* all seller appointments that reserved from buyer*/}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Date</th>
            <th>Agree Appointment</th>
            <th>Disagree Appointment</th>
          </tr>
        </thead>

        <tbody>
          {allAppointments.map((item, index) => {
            <tr key={index}>
              <td>{index}</td>
              <td>{item.day}</td>
              <td>{item.time}</td>
              <td>
                {" "}
                <Button
                  variant="success"
                  onClick={acceptAppointment}
                ></Button>{" "}
              </td>
              <td>
                {" "}
                <Button
                  variant="warning"
                  onClick={() => cancelBooking(item._id)}
                ></Button>{" "}
              </td>
            </tr>;
          })}
        </tbody>
      </Table>
    </div>
  );
}
