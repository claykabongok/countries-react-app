import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import NavBar from "./Navigation/NavBar";
import loadingIcon from "../assets/images/loader_theme_color_large.gif";
import Footer from "./Navigation/Footer";

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
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

  let latlng = "";
  if (strlatlng) {
    latlng = strlatlng.split(",");
  }

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

        setTimezones(res.data.timezones);
        setLanguages(res.data.languages);
        setregionalBlocks(res.data.regionalBlocs);

        setLoading(false);

        axios({
          method: "GET",
          url: `https://restcountries.eu/rest/v2/alpha?codes=${res.data.borders.join(
            ";"
          )}`,
        }).then((resborder) => {
          setborders(resborder.data);
        });
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
      <div className="container-contries">
        <div class="container-fluid country-info-card">
          <div className="row">
            <div class="col-lg-12 header-country-name">
              <h1>{countryData.name}</h1>
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

        <div class="container-fluid country-info-card">
          <div class="row">
            <div class="col-sm-6 ">
              {altSpelling.length >= 1 ? (
                <div>
                  <div class="row">
                    <div class="col-sm-12 ">
                      <h4>Alternative Spellings ({altSpelling.length}):</h4>{" "}
                    </div>
                    <div class="col-sm-12 ">
                      <table class="table table-hover table-borderless">
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
            </div>
            <div class="col-sm-6 ">
              {borders.length >= 1 ? (
                <div>
                  <div class="row">
                    <div class="col-sm-12 ">
                      <h4>Borders ({borders.length}):</h4>{" "}
                    </div>
                    <div class="col-sm-12 ">
                      <table class="table table-hover table-borderless">
                        <thead>
                          <tr>
                            <th className="table-header-view-country">Name</th>
                            <th className="table-header-view-country">
                              Capital
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {borders.map((country) => (
                            <tr>
                              <td className="country-border-name">
                                <a
                                  href={`/viewcountry/${country.alpha3Code}/${country.latlng}`}
                                >
                                  {country.name}{" "}
                                </a>
                              </td>
                              <td> {country.capital}</td>
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
            </div>
          </div>
        </div>

        <div class="container-fluid country-info-card">
          <div className="row">
            <div class="col-sm-6">
              <div>
                <div className="row">
                  <div class="col-sm-12 ">
                    <h4>
                      {languages.length <= 1 ? "Languague" : "Languagues"}
                    </h4>
                  </div>
                  <div class="col-sm-12 ">
                    <table class="table table-hover table-borderless">
                      <thead>
                        <tr>
                          <th className="table-header-view-country">Code</th>
                          <th className="table-header-view-country">Name</th>
                          <th className="table-header-view-country">
                            Native Name
                          </th>
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
            </div>
            <div class="col-sm-6">
              <div>
                <div className="row">
                  <div class="col-sm-12 ">
                    <h4>{timezones.length <= 1 ? "Timezone" : "Timezones"}</h4>
                  </div>
                  <div class="col-sm-12 ">
                    <table class="table table-hover table-borderless">
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
            </div>
          </div>
        </div>

        <div class="container-fluid country-info-card">
          <div className="row">
            <div class="col-sm-6">
              <div className="row">
                <div class="col-sm-12">
                  <h4>{currencies.length <= 1 ? "Currency" : "Currencies"}</h4>{" "}
                </div>
                <div class="col-sm-12 ">
                  <table class="table table-hover table-borderless">
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
                          <td>
                            {" "}
                            {currency.code != null ? currency.code : ""}{" "}
                          </td>
                          <td>
                            {" "}
                            {currency.symbol != null
                              ? currency.symbol
                              : ""}{" "}
                          </td>
                          <td>
                            {" "}
                            {currency.name != null ? currency.name : ""}{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              {regionalBlocks.length >= 1 ? (
                <div className="row">
                  <div class="col-sm-12 ">
                    <h4>
                      {regionalBlocks.length <= 1
                        ? "Regional Bloc"
                        : "Regional Blocs"}
                    </h4>
                  </div>
                  <div class="col-sm-12 ">
                    <table class="table table-hover table-borderless">
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
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

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
      </div>
      <Footer />
    </div>
  );
}
