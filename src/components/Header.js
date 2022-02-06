import React, {useEffect} from "react";
import logo from "../image/logo.jpg";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header(props) {
 
  const logout = ()=>{
    // function when user logout to make every things clearly for login another time.
    localStorage.setItem('user','')
    props.dataFromLogin = {}
    
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >Appointment Booking</Navbar.Brand>
        {!localStorage.getItem('user')  ? (
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Nav.Link as={Link} to="/login">
              login
            </Nav.Link>

            <Nav.Link as={Link} to="/register">
              register
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Nav.Link as={Link} to="/login" onClick={logout}>
              log out
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
 
}
