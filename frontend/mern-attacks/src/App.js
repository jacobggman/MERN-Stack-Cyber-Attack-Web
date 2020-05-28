import React from 'react';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
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
      <Helmet>
        <title>Cyber Attacks</title>
      </Helmet>

      <Router>
        {/*<NavBar />*/}
        <br />
        <Switch>
          <Route path="/login" component={SignInSide} />
          <Route path="/register" component={SignUp} />
          <Route path="/attacks" component={AttacksPage} />
          <Redirect exact from="/" to="login" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
