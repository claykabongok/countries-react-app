import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Country from "./Country";
import axios from "axios";
import NavBar from "./Navigation/NavBar";
import loadingIcon from "../assets/images/loadingIcon.gif";
import "../Styles/SearchByName.scss";
export default function SearchByName() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchresult, setsearchresult] = useState([]);

  function SearchByName(e) {
    e.preventDefault();

    if (query != null) {
      setLoading(true);
      setError(false);
      const api = `https://restcountries.eu/rest/v2/name/${query}`;

      axios({
        method: "GET",
        url: `${api}`,
      })
        .then((res) => {
          setLoading(false);
          setsearchresult(res.data);
          console.log(searchresult);
        })
        .catch((e) => {
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  }

  function handleSearchInput(e) {
    setQuery(e.target.value);
    setsearchresult([]);
    setError(false);
  }

  return (
    <div>
      <NavBar />

      <Container className="calling-code-container">
        <div class="container-fluid calling-code-card">
          <h2>Search country name {query}</h2>

          <div className="row calling-search-from-container">
            <div>
              {loading && (
                <img src={loadingIcon} alt="loading" className="loadingIcon" />
              )}

              {error && (
                <div class="alert alert-danger">
                  <strong>Not found!</strong> Please provide a valid calling
                  code and try again.
                </div>
              )}
            </div>
            <div className="col-lg-12  ">
              <form onSubmit={SearchByName}>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Search for any country"
                  autoFocus
                  name="query"
                  value={query}
                  onChange={handleSearchInput}
                />
              </form>
            </div>
          </div>
          <div className="row row-search-results">
            {searchresult.length >= 1
              ? searchresult.map((data) => (
                  <Country data={data} key={data.numericCode} />
                ))
              : ""}
          </div>
        </div>
      </Container>
    </div>
  );
}