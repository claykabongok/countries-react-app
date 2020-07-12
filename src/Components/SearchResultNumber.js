import React from "react";
import "../Styles/SearchResultNumber.scss";

export default function SearchResultNumber(props) {
  return (
    <div className="number-of-countries">
      {props.countries.length > 0 ? (
        <h4>
          {" "}
          Result: region {props.countries[0].region}. number of countries {props.countries.length}
        </h4>
      ) : (
        ""
      )}
    </div>
  );
}
