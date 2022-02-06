import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Appointments from "./components/Appointments";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App(props) {
  const [dataFromLogin, setDataFromLogin] = useState({});
  // const [dataFromLogin , setDataFromLogin] = useState({});

  const userData = (tokenData, bodyData) => {
    let data = { ...tokenData, ...bodyData };
    setDataFromLogin(data);
    // console.log({data});
  };
  
    
  
  

  return (
    <Router>
      <Header dataFromLogin={dataFromLogin} />

      <Routes>
        <Route
          exact
          path="/login"
          element={<LoginForm userData={userData} />}
        ></Route>
        <Route exact path="/register" element={<SignupForm />}></Route>
        <Route
          exact
          path="/"
          element={<Home dataFromLogin={dataFromLogin} />}
        ></Route>
        <Route
          exact
          path="/appointment"
          element={<Appointments sellerEmail={props.sellerEmail} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
