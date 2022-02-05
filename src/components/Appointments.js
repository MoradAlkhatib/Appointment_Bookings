import React, { useState } from "react";
import { AppointmentPicker } from "react-appointment-picker";

export default function Appointments() {
  const [appointmentBooked, setAppointmentBooked] = useState();
  
  // initial appointments for one week.
  const days =[]
  for(let i = 1 ;i<6;i++){
    let day = [];
    for (let j=0;j<5;j++){
      day.push({ id: i+j, number: i+j, isSelected: false ,periods: 2,
        endTime: 14  })
    } 
    days.push(day)
  }
 
  
  const [loading, setLoading] = useState(false);
  const [continuousLoading, setContinuousLoading] = useState(false);

  let addAppointmentCallback = ({
    addedAppointment: { day, number, time, id },
    addCb,
  }) => {
    setLoading(true);

    let loadingAffect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
      );
      addCb(day, number, time, id);
      setLoading(false);
    };
    loadingAffect();
  };

  let removeAppointmentCallback = ({ day, number, time, id }, removeCb) => {
    setLoading(true);

    let loadingAffect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
      );
      removeCb(day, number);
      setLoading(false);
    };
    loadingAffect();
  };

  return (
    <div>
      <h1>Appointment Picker</h1>
      <AppointmentPicker
        startTime ={8}
        endTime = {14}
        addAppointmentCallback={addAppointmentCallback}
        removeAppointmentCallback={removeAppointmentCallback}
        initialDay={new Date("2022-02-05")}
        days={days}
        maxReservableAppointments={3}
        alpha
        visible
        selectedByDefault
        loading={loading}
      />
    </div>
  );
}
