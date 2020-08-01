import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import "../Styles/country.scss";

export default function Country({ data }) {
  return (
    
    <div className="col-lg-3 col-md-4  col-sm-6 col-crountry-container">
      <div className="card-country">
        <img class="card-img-top" src={data.flag} alt="flag" />
        <div class="card-body">
          <h4 class="card-title">
            {" "}
            <LinesEllipsis
              text={data.name}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </h4>
          <p class="card-text ">{data.capital}</p>
        </div>
        <div className="card-country-info">
          <a
            href={`/viewcountry/${data.alpha3Code}/${data.latlng}`}
            className="stretched-link"
          > </a>
        </div>
      </div>
    </div>
  );
}
