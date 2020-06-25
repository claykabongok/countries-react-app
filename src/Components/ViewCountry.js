import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Country from "./Country";
import axios from "axios";
import NavBar from "./Navigation/NavBarSecondary";
import loadingIcon from "../assets/images/loadingIcon.gif";

export default function ViewCountry(props) {
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const country = props.match.params.country;

  useEffect(() => {
    setLoading(true);
    setError(false);
    
    const api = `https://restcountries.eu/rest/v2/alpha/${country}`;
    axios({
      method: "GET",
      url: `${api}`,
    })
      .then((res) => {
        console.log(res.data);
        setCountryData(res.data);

        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, []);
    
    return (
        <div>
        <NavBar />
        <div>{loading && <img src={loadingIcon} alt="loading" className="loadingIcon" />}</div>
      <Container>
      <h2>{country}</h2>
    <h3>{countryData.name}</h3>
    <h3>{countryData.capital}</h3>
    <h3>{countryData.region}</h3>
    <h3>{countryData.subregion}</h3>
      </Container>
        
        </div>
    )
}
