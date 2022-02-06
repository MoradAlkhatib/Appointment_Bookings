import React, { useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BuyerPage from "./BuyerPage";
import SellerPage from "./SellerPage";

export default function Home(props) {
  let navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  useEffect(() => {
    // to login from data that coming from local storage.
    let checkLogin = localStorage.getItem("user");
    console.log(props.dataFromLogin);
    if (checkLogin) {
      // checking if there data in the local storage so if there that mean the user already logged in.
      checkLogin = JSON.parse(checkLogin);
      setIsSeller(checkLogin.isSeller);
      axios
        .post(`http://localhost:5000/api/login`, checkLogin)
        .then((res) => {})
        .catch((err) => {
          navigate("/login");
        });
    } else {
      // other wise back to login page.
      navigate("/login");
    }
  }, [props.dataFromLogin]);

 

  return (
    <div>
      {isSeller ? (
        <SellerPage sellerData={props.dataFromLogin} />
      ) : (
        <BuyerPage buyerData={props.dataFromLogin} />
      )}
    </div>
  );
}
