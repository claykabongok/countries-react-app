import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Country from "./Country";
import axios from "axios";
import NavBar from "./Navigation/NavBarSecondary";
import loadingIcon from "../assets/images/loadingIcon.gif";
import "../Styles/CallingCode.scss";
export default function CallingCode() {
  return (
    <div>
        <NavBar/>
      <Container className="calling-code-container">
        <div class="container-fluid calling-code-card">
        <h2>Calling code</h2>
          <div className="row calling-search-from-container">
     
            <div class="col-lg-12  ">
             
              <input
                className="form-control form-control-lg"
                type="number"
                placeholder="Type any calling code example 1"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
