import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.scss";
import LoadingIcon from "./assets/images/loader_theme_color_large.gif";
const Homepage = lazy(() => import("./Components/Homepage"));
const Regions= lazy(() => import("./Components/Regions"));
const PageNotFound = lazy(() => import("./Components/PageNotFound"));
const ViewCountry = lazy(() => import("./Components/ViewCountry"));
const CallingCode = lazy(() => import("./Components/CallingCode"));
const SearchCountryName = lazy(() => import("./Components/SearchByName"));
const SearchCapital = lazy(() => import("./Components/SearchByCapital"));
const SearchCurrency = lazy(() => import("./Components/SearchByCurrency"));

function App() {
  return (
    <Router>
      <Suspense fallback={<img src={LoadingIcon} className="loadingIcon" alt="loading_icon" />}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/region/:name" component={Regions} />
          <Route exact path="/callingcode" component={CallingCode} />
          <Route exact path="/seachcountryname" component={SearchCountryName} />
          <Route exact path="/seachcapital" component={SearchCapital} />
          <Route exact path="/seachcurrency" component={SearchCurrency} />

          <Route
            exact
            path="/viewcountry/:country/:latlng"
            component={ViewCountry}
          />

          <Route exact path="/viewcountry/:country" component={ViewCountry} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
