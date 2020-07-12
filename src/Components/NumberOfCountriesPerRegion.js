import React from 'react';
import "../Styles/NumberOfCountries.scss";

export default function NumberOfCountriesPerRegion(props) {
    return (
        <div className="number-of-countries">
              {
          props.countries.length >0 ? <h3> Region {props.countries[0].region}. number of countries, dependencies or other territories {props.countries.length}</h3> :""
        }
     
        </div>
    )
}
