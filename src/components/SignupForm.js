import React, { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import BuyerSignUp from "./SignForBuyer";
import SellerSignUp from "./SignForSeller";


export default function SignupForm() {
  
  const [user, setUser] = useState("not selected");
  const [activeBuyer, setActiveBuyer] = useState(
    "w-2/4 hover:text-white hover:bg-sky-400 "
  );
  const [activeSeller, setActiveSeller] = useState(
    "w-2/4 hover:text-white hover:bg-sky-400"
  );

  const buyer = (e) => {
    e.preventDefault();
    setUser("buyer");
    // buyer is Active
    setActiveBuyer("bg-blue-600 font-bold text-white  w-2/4");
    // seller not Active
    setActiveSeller("w-2/4 hover:text-white hover:bg-sky-400");
    console.log(user);
  };
  const seller = (e) => {
    e.preventDefault();
    setUser("seller");
    // seller is Active
    setActiveSeller("bg-blue-600 font-bold text-white w-2/4");
    // buyer not Active

    setActiveBuyer("w-2/4 hover:text-white hover:bg-sky-400");
    console.log(user);
  };

  return (
    <div>
      <h1 className='text-lg text-center text-zinc-700 m-2'> Choose if you want to register as buyer or seller!</h1>
      <form className="flex justify-between border-4 border-black">
        <button className={activeBuyer} onClick={(e) => buyer(e)}>
          Buyer
        </button>
        <button className={activeSeller} onClick={(e) => seller(e)}>
          Seller
        </button>
      </form>
      
      {user == "buyer" && <BuyerSignUp />}
      {user == "seller" && <SellerSignUp />}
    </div>
  );
}
