import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { process } from "postcss-flexbugs-fixes";
export default function SignForSeller() {
  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const navigate = useNavigate();

  const signUp = (e) => {
    // function for register a new Seller.
    e.preventDefault();
    let passwordC = e.target.passwordC.value;
    let user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,

      image: e.target.image.value,
      service: e.target.service.value,
      isSeller: true,
    };
    // check if the password and config password is matched.
    if (user.password !== passwordC) {
      setAlertColor("bg-red-600 text-center text-white text-xl");
      setAlertData("Password and config password Not match.");
      setAlert(true);
    }
    // if the password matched then we can post a new user for database.
    else {
      axios({
        method: "post",
        url: `http://localhost:5000/api/register`,
        data: user,
      })
        .then((res) => {
          // registration Success
          navigate("/login");
          setAlertColor("bg-green-400 text-center text-white text-xl");
          setAlertData(`Success Sign Up You Are Welcome ${user.name}.`);
          setAlert(true);
        })
        .catch((err) => {
          // registration Failed
          setAlertColor("bg-blue-400 text-center text-white text-xl");
          setAlertData("A user with that email already exists.");
          setAlert(true);
        });
    }
  };
  return (
    <div id="buyerSignUp">
      {/* Alert to let user know what happen for registration success or failed*/}
      {alert && <Alert className={alertColor}>{alertData}</Alert>}
     {/* form for registration seller*/}
      <form
        onSubmit={(e) => signUp(e)}
        enctype="multipart/form-data"
        className="bg-gray-200 p-4"
      >
        <div className="flex flex-col items-center justify-center h-full p-4  bg-gray-200">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
              <div className="w-3/5 p-5">
                <div className=" text-center font-bold text-xl">
                  <span className="text-sky-600">Anointment</span>Booking
                </div>
                <div className="pt-4">
                  <h2 className="text-2xl font-bold text-sky-600 pb-2">
                    Make A New A Count
                  </h2>
                </div>
                <p className="text-gray-400 my-3">
                  Use UserName, Email And Password
                </p>
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-gray-100 w-64  p-2 flex items-center">
                    <AiOutlineUser className="text-gray-400 mr-1" />
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className=" bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64  p-2 flex items-center">
                    <FaRegEnvelope className="text-gray-400 mr-1" />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      className=" bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center">
                    <MdLockOutline className="text-gray-400 mr-1" />
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="password"
                      className=" bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center">
                    <MdLockOutline className="text-gray-400 mr-1" />
                    <input
                      required
                      type="password"
                      name="passwordC"
                      placeholder="config password"
                      className=" bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64  p-2 flex items-center">
                    <input
                      required
                      type="file"
                      // accept ="image/*"
                      name="image"
                      placeholder="Image"
                      className=" bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64  p-2 flex items-center">
                    <input
                      required
                      type="text"
                      name="service"
                      placeholder="Service"
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
                <p className=" mx-10 pb-10">Appointment Make Life Easy</p>
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

// <form onSubmit={(e) => login(e)} className="bg-gray-200 p-14">
// <div className="flex flex-col items-center justify-center h-full p-14  bg-gray-200">
//   <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//     <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
//       <div className="w-3/5 p-5 ">
//         <div className=" text-left font-bold text-xl mb-8">
//           <span className=" text-sky-500">Appointment </span>Booking
//         </div>
//         <div className="pt-10 ">
//           <h2 className="text-2xl font-bold text-sky-600 pb-2">
//             Log In To You'r Account
//           </h2>
//           <div className="w-16 font-bold  text-black inline-block mb-2">------------</div>
//         </div>
//         <p className="text-gray-400 my-3">Use UserName, And Password</p>
//         <div className="flex flex-col items-center gap-8 mt-8">
//           <div className="bg-gray-100 w-64  p-2 flex items-center">
//             <FaRegEnvelope className="text-gray-400 mr-2" />
//             <input
//               required
//               type="text"
//               name="email"
//               placeholder="email"
//               className=" bg-gray-100 outline-none text-sm flex-1"
//             />
//           </div>
//           <div className="bg-gray-100 w-64 p-2 flex items-center">
//             <MdLockOutline className="text-gray-400 mr-2" />
//             <input
//               required
//               type="password"
//               name="password"
//               placeholder="password"
//               className=" bg-gray-100 outline-none text-sm flex-1"
//             />
//           </div>
//         </div>
//       </div>
//       {/*Sign in */}
//       <div className="w-2/5 bg-sky-500 text-zinc-800 rounded-tr-2xl rounded-br-2xl pt-36 pb-24 px-2">
//         <h2 className=" text-2xl font-bold mb-2">

//           Welcome
//         </h2>
//         <div className="w-16 font-bold  text-white inline-block mb-2">------------</div>
//         <p className=" mx-10 pb-10">
//           Appointments Make Life Easy
//         </p>

//         <button
//           type="submit"
//           className="border-2 mb-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-teal-700"
//         >
//           Log In
//         </button>

//         {/* <Link href="/Login">
// <div className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-teal-700">Go Log In</div>
// </Link> */}
//       </div>
//       {/*Sign up */}
//     </div>
//   </main>
// </div>
// </form>
