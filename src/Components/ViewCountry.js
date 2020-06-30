import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Country from "./Country";
import axios from "axios";
import NavBar from "./Navigation/NavBar";
import loadingIcon from "../assets/images/loadingIcon.gif";


import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

import "../Styles/viewcountry.scss";

export default function ViewCountry(props) {
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [altSpelling, setaltSpelling] = useState([]);
  const [borders, setborders] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [regionalBlocks, setregionalBlocks] = useState([]);
  const country = props.match.params.country;

  const strlatlng = props.match.params.latlng;
  const latlng = strlatlng.split(",");

  function mapgoogle() {
    return (
      <GoogleMap
        defaultZoom={4}
        defaultCenter={{
          lat: parseFloat(latlng[0]),
          lng: parseFloat(latlng[1]),
        }}
      >
        <Marker
          position={{ lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1]) }}
        />
      </GoogleMap>
    );
  }
  const WrappedMap = withScriptjs(withGoogleMap(mapgoogle));

  useEffect(() => {
    setLoading(true);

    const api = `https://restcountries.eu/rest/v2/alpha/${country}`;
    axios({
      method: "GET",
      url: `${api}`,
    })
      .then((res) => {
        console.log(res.data);
        setCountryData(res.data);
        setCurrencies(res.data.currencies);
        setaltSpelling(res.data.altSpellings);
        setborders(res.data.borders);
        setTimezones(res.data.timezones);
        setLanguages(res.data.languages);
        setregionalBlocks(res.data.regionalBlocs);

        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [country]);

  return (
    <div>
      <NavBar />
      <div>
        {loading && (
          <img src={loadingIcon} alt="loading" className="loadingIcon" />
        )}
      </div>
      <Container className="contry">
        <div class="container-fluid country-info-card">
          <div className="row">
            <div class="col-lg-12 header-country-name">
              <h2>{countryData.name}</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 view-country-flag">
              <img src={countryData.flag} alt={countryData.name} />
            </div>
            <div class="col-lg-6 country-basic-info-text">
              <h4>
                <span>Capital</span>: {countryData.capital}
              </h4>
              <h4>
                <span>Native name</span>: {countryData.nativeName}
              </h4>
              <h4>
                <span>Subregion</span>: {countryData.subregion}
              </h4>
              <h4>
                <span>Region</span>: {countryData.region}
              </h4>
              <h4>
                <span>Demonym</span>: {countryData.demonym}
              </h4>
              <h4>
                <span>Population</span>:{" "}
                {new Intl.NumberFormat().format(countryData.population)}
              </h4>
              <h4>
                <span>Area</span>:{" "}
                {new Intl.NumberFormat().format(countryData.area)}
              </h4>
              <h4>
                <span>Calling code</span>: {countryData.callingCodes}
              </h4>
              <h4>
                <span>Domain</span>: {countryData.topLevelDomain}
              </h4>
            </div>
          </div>
        </div>
        {borders.length >= 1 ? (
          <div class="container-fluid country-info-card">
            <div class="row">
              <div class="col-sm-12 ">
                <h4>Alternative Spellings ({altSpelling.length}):</h4>{" "}
              </div>
              <div class="col-sm-12 ">
                <table class="table table-hover">
                  <tbody>
                    {altSpelling.map((name) => (
                      <tr>
                        <td> {name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {borders.length >= 1 ? (
          <div class="container-fluid country-info-card">
            <div class="row">
              <div class="col-sm-12 ">
                <h4>Borders ({borders.length}):</h4>{" "}
              </div>
              <div class="col-sm-12 ">
                <table class="table table-hover">
                  <tbody>
                    {borders.map((country) => (
                      <tr>
                        <td> {country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div class="container-fluid country-info-card">
          <div className="row">
            <div class="col-sm-12">
              <h4>
              {currencies.length <= 1
                    ? "Currency"
                    : "Currencies"}
                </h4>{" "}


            </div>
            <div class="col-sm-12 ">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th className="table-header-view-country">Code</th>
                    <th className="table-header-view-country">Symbol</th>
                    <th className="table-header-view-country">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {currencies.map((currency) => (
                    <tr>
                      <td> {currency.code != null ? currency.code : ""} </td>
                      <td>
                        {" "}
                        {currency.symbol != null ? currency.symbol : ""}{" "}
                      </td>
                      <td> {currency.name != null ? currency.name : ""} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="container-fluid country-info-card">
          <div className="row">
            <div class="col-sm-12 ">
              <h4>{timezones.length <= 1 ? "Timezone" : "Timezones"}</h4>
            </div>
            <div class="col-sm-12 ">
              {/* {timezones.map((timezone) => (
                <h4>{timezone != null ? timezone : ""}</h4>
              ))} */}

              <table class="table table-hover">
                <tbody>
                  {timezones.map((timezone) => (
                    <tr>
                      <td> {timezone != null ? timezone : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="container-fluid country-info-card">
          <div className="row">
            <div class="col-sm-12 ">
              <h4>{languages.length <= 1 ? "Languague" : "Languagues"}</h4>
            </div>
            <div class="col-sm-12 ">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th className="table-header-view-country">Code</th>
                    <th className="table-header-view-country">Name</th>
                    <th className="table-header-view-country">Native Name</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map((language) => (
                    <tr>
                      <td> {language.iso639_2}</td>
                      <td> {language.name}</td>
                      <td>{language.nativeName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {regionalBlocks.length >= 1 ? (
          <div class="container-fluid country-info-card">
            <div className="row">
              <div class="col-sm-12 ">
                <h4>
                  {regionalBlocks.length <= 1
                    ? "Regional Bloc"
                    : "Regional Blocs"}
                </h4>
              </div>
              <div class="col-sm-12 ">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th className="table-header-view-country">Acronym</th>
                      <th className="table-header-view-country">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalBlocks.map((block) => (
                      <tr>
                        <td> {block.acronym}</td>
                        <td> {block.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div class="container-fluid country-info-card">
          <div className="row">
            <div class="col-sm-12 ">
              <h4>Location on map</h4>
            </div>
            <div class="col-sm-12 " style={{ width: "100vw", height: "80vh" }}>
              <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=yourkey`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
