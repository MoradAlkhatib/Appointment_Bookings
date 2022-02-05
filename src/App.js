import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Home from "./components/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appointments from "./components/Appointments";
import { Container } from "react-bootstrap";

function App() {
  const [dataFromLogin, setDataFromLogin] = useState({});

  const userData = (tokenData, bodyData) => {
    let data = { ...tokenData, ...bodyData };
    setDataFromLogin(data);
    // console.log({data});
  };

  return (
    <Router>
      <Header dataFromLogin={dataFromLogin} />
      <Container>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home dataFromLogin={dataFromLogin} />}
          ></Route>
          <Route
            exact
            path="/login"
            element={<LoginForm userData={userData} />}
          ></Route>
          <Route exact path="/register" element={<SignupForm />}></Route>
          <Route exact path="/appointment" element={<Appointments />}></Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
