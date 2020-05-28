import React, { Component } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Attacks from './AttacksList';
import Copyright from './Copyright';
import sendData from './sendData';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

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

class BackToTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowPos: window.pageYOffset };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll);
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const scrolled = winScroll;

    this.setState({
      windowPos: scrolled,
    });
  };

  render() {
    return (
      <Button
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        color="secondary"
        variant="contained"
        disabled={this.state.windowPos < 300}
      >
        Back To The Top
      </Button>
    );
  }
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
    getAttacks(this.state.attacksList.length, ['textSearch'])
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
                color="inherit"
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
