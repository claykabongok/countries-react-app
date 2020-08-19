import React from "react";
import PageNotFoundImage from "../assets/images/error-1349562_1280.png";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import NavBar from "./Navigation/NavBar";
import "../Styles/pagenotfound.scss";

export default function PageNotFound() {
  return (
    <div>
      <NavBar />
      <Container>
        <div className="container-page-not_found">
        
          <img src={PageNotFoundImage} alt="NotFound" />
        </div>
      </Container>
    </div>
  );
}
