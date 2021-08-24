import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar"; //for rafc
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" render={() => {
            return(
              <>
                <Navbar />
              </>
            )
          }}></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
