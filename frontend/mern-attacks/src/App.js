import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignInSide from './components/SignInSide.js';
import SignUp from './components/SignUp.js';
import AttacksPage from './components/AttacksPage';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: amber,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/*<NavBar />*/}
        <br />
        <Route path="/login" component={SignInSide} />
        <Route path="/register" component={SignUp} />
        <Route path="/attacks" component={AttacksPage} />
        {/*<Redirect from="/" to="login" />*/}
      </Router>
    </ThemeProvider>
  );
}

export default App;
