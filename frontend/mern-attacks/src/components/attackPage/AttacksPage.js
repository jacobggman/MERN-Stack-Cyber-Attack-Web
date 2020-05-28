import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Copyright from '../Copyright';
import getAttacks from '../../helpers/getAttacks';
import Toolbar from './Toolbar';
import DownPart from './DownPart';
const classes = '';

export default class AttacksPage extends React.Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.state = { attacksList: [] };

    this.callGetAttack = this.callGetAttack.bind(this);
  }

  callGetAttack(reset = false, updateValue = undefined) {
    if (reset) {
      this.setState({ attacksList: [] });
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
        <Toolbar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Box pt={10}></Box>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <DownPart
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
