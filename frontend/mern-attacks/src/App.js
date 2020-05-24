import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignInSide from './components/SignInSide.js';
import SignUp from './components/SignUp.js';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      {/*<NavBar />*/}
      <br />
      <Route path="/login" component={SignInSide} />
      <Route path="/register" component={SignUp} />
      <Route path="/attacks" component={Dashboard} />
    </Router>
  );
}

export default App;
