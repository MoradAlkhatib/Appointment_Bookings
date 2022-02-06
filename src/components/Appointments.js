import React, { useState } from "react";
import { AppointmentPicker } from "react-appointment-picker";
import { Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default function Appointments(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addedBooking, setAddedBooking] = useState(false);

  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const buyerData = JSON.parse(localStorage.getItem("user"));

  // initial appointments for one week.
  const days = [];
  for (let i = 1; i < 6; i++) {
    let day = [];
    for (let j = 0; j < 5; j++) {
      day.push({ id: i + j, number: i + j, isSelected: false, periods: 2 });
    }
    days.push(day);
  }
  // loading use for make loading when the user click on any appointments.
  const [loading, setLoading] = useState(false);

  let addAppointmentCallback = ({
    // function that make a loading for appointment clicked.
    addedAppointment: { day, number, time, id },
    addCb,
  }) => {
    setLoading(true);

    let loadingAffect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
      );

      setTime(time);
      setDay(day);
      addCb(day, number, time, id);
      setLoading(false);
      handleShow();
    };
    loadingAffect();
  };

  let removeAppointmentCallback = ({ day, number, time, id }, removeCb) => {
    // function that make a loading for appointment clicked to remove it.
    setLoading(true);

    let loadingAffect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
      );
      removeCb(day, number);
      setLoading(false);
      handleClose();
    };
    loadingAffect();
  };

  const bookingAppointment = () => {
    let body = {
      time: time,
      date: day,
      whoBooking: buyerData.email,
      whoReceived: props.sellerData.email,
      active: false,
      underProcess: true,
      finished: false,
    };
    axios
      .post(`http://localhost:5000/api/appointment/create`, body)
      .then((res) => {
        localStorage.setItem("appointment", JSON.stringify(res.data));
        setAddedBooking(true);
      })
      .catch((err) => {});
  };
  
  

  return (
    <div>
      <h1 className="text-center mb-8">Appointment Picker</h1>
      <div className="flex">
       
          <AppointmentPicker
            startTime={8}
            endTime={14}
            addAppointmentCallback={addAppointmentCallback}
            removeAppointmentCallback={removeAppointmentCallback}
            initialDay={new Date("2022-02-05")}
            days={days}
            maxReservableAppointments={1}
            alpha
            visible
            selectedByDefault
            loading={loading}
          />
       
        {!addedBooking ? (
          <div>
            {show && (
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>
                    Seller Name : {props.sellerData.name}
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>
                    {" "}
                    You will booking your desired seller on {day} at {time}`
                  </p>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={bookingAppointment}>
                    Booking Now
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            )}
          </div>
        ) : (
          <div>
            <Alert
              variant="warning"
              className="text-lg text-blue-900 font-bold mt-4 text-center"
            >
              {" "}
              You Need to wait until your seller confirm your appointment.
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
