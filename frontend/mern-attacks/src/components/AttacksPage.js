import React, { Component } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Attacks from './AttacksList';
import Copyright from './Copyright';
import BackToTop from './BackToTop';

const classes = '';

function getInput(element_id) {
  return document.getElementById(element_id).value;
}

async function getAttacks(skip, textInputs) {
  let sendData = {};
  textInputs.forEach((name) => (sendData[name] = getInput(name)));
  sendData['skip'] = skip;

  const config = { headers: { 'Content-Type': 'application/json' } };
  config.headers['x-auth-token'] = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:2802/attacks',
    { sendData },
    {
      headers: config.headers,
    }
  );
  return response.data;
}

export default class AttacksPage extends React.Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    //this.classes = useStyles();
    this.state = { attacksList: [] };

    this.callGetAttack = this.callGetAttack.bind(this);
  }

  callGetAttack(reset = false, updateValue = undefined) {
    if (reset) {
      this.state.attacksList = [];
    }
    getAttacks(this.state.attacksList.length, ['Search'])
      .then((res) => {
        this.setState({ attacksList: this.state.attacksList.concat(res) });
        if (updateValue) {
          updateValue(this.state.attacksList);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          alert(err.response.data);
        } else {
          alert(err);
        }
      });
  }

  async componentDidMount() {
    this.callGetAttack();
  }

  render() {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={clsx()}>
          <Toolbar className={classes.toolbar}>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={24}
            >
              <Typography
                component="h1"
                variant="h6"
                color="secondary"
                noWrap
                className={classes.title}
              >
                Attacks
              </Typography>

              <BackToTop></BackToTop>
              <Button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location = 'http://localhost:3000/login';
                }}
                variant="contained"
                color="secondary"
              >
                logout
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Box pt={10}></Box>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Attacks
                    getAttacks={this.callGetAttack}
                    attacks={this.state.attacksList}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}
