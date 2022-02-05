import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Container, Alert } from "react-bootstrap";
import Footer from "./Footer";
import bcrypt from "bcryptjs";

export default function LoginForm(props) {
  const [isSeller, setIsSeller] = useState(false);
  const [alert, setAlert] = useState(false);
  const [logged, setLogged] = useState(false);
  let navigate = useNavigate();
  const salt = bcrypt.genSaltSync(10);

  let login = (e) => {
    // function for login for exists user.
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let body = { email: email, password: password };

    axios
      .post("http://localhost:5000/api/login", body)
      .then((res) => {
        let objToken = jwt_decode(res.data.token);

        localStorage.setItem("user", JSON.stringify({...body,...objToken}));
        props.userData(objToken, body);
        // console.log(body);
        // console.log(objToken.isSeller);
        // console.log(jwt_decode(res.data.token));
        setIsSeller(objToken.isSeller);
        setAlert(false);
        console.log(isSeller);
        navigate("/");
      })
      .catch((err) => {
        setAlert(true);
      });
  };

  return (
    <div>
      {alert && (
        <Alert
          variant="danger"
          className="text-center bg-red-600 font-bold from-orange-100"
        >
          Invalid Password or Email ....!
        </Alert>
      )}

      <form onSubmit={(e) => login(e)} className="bg-gray-200 p-14">
        <div className="flex flex-col items-center justify-center h-full p-14  bg-gray-200">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
              <div className="w-3/5 p-5 ">
                <div className=" text-center font-bold text-xl mb-8">
                  <span className=" text-sky-600">Appointment </span>Booking
                </div>
                <div className="pt-10 ">
                  <h2 className="text-2xl font-bold text-sky-600 pb-2">
                    Log In To You'r Account
                  </h2>
                  <div className="w-16 font-bold  text-black inline-block mb-2">
                    ------------
                  </div>
                </div>
                <p className="text-gray-400 my-3">Use UserName, And Password</p>
                <div className="flex flex-col items-center gap-8 mt-8">
                  <div className="bg-gray-100 w-64  p-2 flex items-center">
                    <FaRegEnvelope className="text-gray-400 mr-2" />
                    <input
                      required
                      type="text"
                      name="email"
                      placeholder="email"
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
                </div>
              </div>
              {/*Sign in */}
              <div className="w-2/5 bg-sky-500 text-zinc-800 rounded-tr-2xl rounded-br-2xl pt-36 pb-24 px-2">
                <h2 className=" text-2xl font-bold mb-2">Welcome</h2>
                <div className="w-16 font-bold  text-white inline-block mb-2">
                  ------------
                </div>
                <p className=" mx-10 pb-10">Appointments Make Life Easy</p>

                <button
                  type="submit"
                  className="border-2 mb-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-teal-700"
                >
                  Log In
                </button>

                {/* <Link href="/Login">
<div className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-teal-700">Go Log In</div>
</Link> */}
              </div>
              {/*Sign up */}
            </div>
          </main>
        </div>
      </form>
      </div>
  );
}
