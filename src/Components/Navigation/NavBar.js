import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Homepage() {
  const regions={
    Africa:'africa',
     Americas:'americas',
      Asia:'asia',
       Europe:'europe', 
       Oceania:'oceania'
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to={`/`}>
          <Navbar.Brand>Countries</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          callingcode
            <Nav.Link href="/callingcode">Country code</Nav.Link>
            <NavDropdown title="Region" id="collasible-nav-dropdown">
            <NavDropdown.Item href={`/region/${regions.Africa}`}>Africa</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={`/region/${regions.Asia}`}>Asia</NavDropdown.Item>
             
              <NavDropdown.Divider />
              <NavDropdown.Item href={`/region/${regions.Americas}`}>Americas</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={`/region/${regions.Europe}`}>Europe</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href={`/region/${regions.Oceania}`}>Oceania</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search"
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
