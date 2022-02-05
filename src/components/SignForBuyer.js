import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SignForBuyer() {
  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const navigate = useNavigate()
  const signUp = (e) => {
    e.preventDefault();
    let passwordC = e.target.passwordC.value;
    let user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,

      image: "not Seller",
      service: "not Seller",
      isSeller: false,
    };
    if (user.password !== passwordC) {
      setAlertColor("bg-red-600 text-center text-white text-xl");
      setAlertData("Password and config password Not match.");
      setAlert(true);
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/api/register",
        data: user,
      })
        .then((res) => {
          navigate('/login')
          setAlertColor("bg-green-400 text-center text-white text-xl");
          setAlertData(`Success Sign Up You Are Welcome ${user.name}.`);
          setAlert(true);
        })
        .catch((err) => {
          setAlertColor("bg-blue-400 text-center text-white text-xl");
          setAlertData("A user with that username already exists.");
          setAlert(true);
        });
    }
  };
  return (
    <div id="buyerSignUp">
      {alert && <Alert className={alertColor}>{alertData}</Alert>}

      <form className="bg-gray-200 p-2" onSubmit={(e) => signUp(e)}>
        <div className="flex flex-col items-center justify-center h-full p-8  bg-gray-200">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
              <div className="w-3/5 p-5">
                <div className=" text-center font-bold text-xl">
                <span className=" text-sky-600">Appointment</span>Booking
                </div>
                <div className="pt-10">
                  <h2 className="text-2xl font-bold text-sky-600 pb-2">
                    Sign Up To Make A New A Count
                  </h2>
                  <div className="w-16 font-bold  text-black inline-block mb-2">---------</div>
                </div>
                <p className="text-gray-400 my-3">
                  Use FullName, Email And Password
                </p>
                <div className="flex flex-col items-center gap-8">
                  <div className="bg-gray-100 w-64  p-2 flex items-center">
                    <AiOutlineUser className="text-gray-400 mr-2" />
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className=" bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64  p-2 flex items-center">
                    <FaRegEnvelope className="text-gray-400 mr-2" />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      className=" bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center">
                    <MdLockOutline className="text-gray-400 mr-2" />
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="password"
                      className=" bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center">
                    <MdLockOutline className="text-gray-400 mr-2" />
                    <input
                      required
                      type="password"
                      name="passwordC"
                      placeholder="config password"
                      className=" bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                </div>
              </div>
              {/*Sign in */}
              <div className="w-2/5 bg-sky-500 text-zinc-800 rounded-tr-2xl rounded-br-2xl pt-36 pb-24 px-2">
                <h2 className=" text-2xl font-bold mb-2">
              
                  Welcome
                </h2>
                <div className="w-16 font-bold  text-white inline-block mb-2">------------</div>
                <p className=" mx-10 pb-10">
                Appointments Make Life Easy
                </p>
                <button type="submit">
                  <div className="border-2 mb-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-teal-700">
                    Sign Up
                  </div>
                </button>
               
              </div>
              {/*Sign up */}
            </div>
          </main>
        </div>
      </form>
    </div>
  );
}


