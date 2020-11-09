import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, Link} from 'react-router-dom';
import History from './History';
import Payload from './Payload';
import Error from './Error';


function App() {
  return (
    <>
    <div className="main">
      <div className="headersDiv">
        <h1 className="heading">SpaceX App</h1>
      </div>
      <div className="buttonDiv">
        <button className="HpButton"><Link to="/history"  className="hpLink">History</Link></button>
        <button className="HpButton"><Link to="/payload" className="hpLink" >Payload</Link></button>
      </div>
    </div>

    <Switch>
      <Route exact path='/' component={History}></Route>
      <Route path='/history' component={History}></Route>
      <Route path='/payload' component={Payload}></Route>
      <Route  component={Error}></Route>
    </Switch>
    </>
  );
}

export default App;