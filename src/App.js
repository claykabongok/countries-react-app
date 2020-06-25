import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect,Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Components/Homepage";
import Regions from "./Components/Regions";
import PageNotFound from "./Components/PageNotFound";
import ViewCountry from "./Components/ViewCountry";
import "./Styles/App.scss";

function App() {
  return (
    <Router>
    <Switch>

        <Route exact path="/" component={Homepage} />
        <Route  path="/region/:name" component={Regions} />
        <Route path="/viewcountry/:country" component={ViewCountry}/>
        <Route  component={PageNotFound} />
     
    
    </Switch>
    </Router>
  );
}

export default App;
