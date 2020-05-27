import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignInSide from './components/SignInSide.js';
import SignUp from './components/SignUp.js';
import AttacksPage from './components/AttacksPage';

function App() {
  return (
    <Router>
      {/*<NavBar />*/}
      <br />
      <Redirect from="/" to="login" />

      <Route path="/login" component={SignInSide} />
      <Route path="/register" component={SignUp} />
      <Route path="/attacks" component={AttacksPage} />
    </Router>
  );
}

export default App;
