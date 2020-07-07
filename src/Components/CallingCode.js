import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Country from "./Country";
import axios from "axios";
import NavBar from "./Navigation/NavBar";
import loadingIcon from "../assets/images/loadingIcon.gif";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Styles/CallingCode.scss";
export default function CallingCode() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchresult, setsearchresult] = useState([]);

  function SearchCode(e) {
    e.preventDefault();

    if (query >= 1) {
      setLoading(true);
      setError(false);
      const api = `https://restcountries.eu/rest/v2/callingcode/${query}`;

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

      <div className="container-contries">
        <div class="container-fluid calling-code-card">
          <h2>Search by calling code {query}</h2>

          <div className="row calling-search-from-container">
            <div>
              {loading && (
                <img src={loadingIcon} alt="loading" className="loadingIcon" />
              )}

              {error && (
                <div class="alert alert-danger">
                  <strong>{query}</strong> is not a valid calling code. Please
                  provide a valid try again.
                </div>
              )}
            </div>
            <div className="col-lg-12  ">
              <form onSubmit={SearchCode}>
                <div class="input-group">
                  <input
                    className="form-control form-control-lg shadow-none"
                    type="number"
                    placeholder="Type any calling code example 1"
                    autoFocus
                    name="query"
                    value={query}
                    onChange={handleSearchInput}
                  />
                  <div class="input-group-append">
                    <button
                      className="btn search-button shadow-none"
                      type="submit"
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
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
      </div>
    </div>
  );
}
