import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Pie from './Pie';
import Box from '@material-ui/core/Box';
import GetMoreAttacks from './GetMoreAttacks';
import AttacksList from './AttacksList';
import getInput from '../../helpers/getInput';

export default class DownPart extends Component {
  constructor(props) {
    super(props);
    this.state = { attacks: [] };
    this.getAttacks = this.getAttacks.bind(this);
    this.callGetAttack = this.callGetAttack.bind(this);
    this.countType = this.countType.bind(this);
  }

  addOneDict(dict, key) {
    if (dict[key] === undefined) {
      dict[key] = 0;
    }
    dict[key] += 1;
  }

  countType(type, isArray) {
    let defaultDict = {};

    this.state.attacks.forEach((row) => {
      if (isArray) {
        row[type].forEach((valueInArray) => {
          this.addOneDict(defaultDict, valueInArray);
        });
      } else {
        this.addOneDict(defaultDict, row[type]);
      }
    });

    return defaultDict;
  }

  async componentDidMount() {
    this.callGetAttack();
  }

  callGetAttack(reset = false) {
    if (reset) {
      this.setState({ attacks: [] });
    }
    const skip = reset ? 0 : this.state.attacks.length;
    this.getAttacks(skip)
      .then((res) => {
        this.setState({ attacks: this.state.attacks.concat(res) });
      })
      .catch((err) => {
        if (err.response !== undefined) {
          alert(err.response.data);
        } else {
          alert(err);
        }
      });
  }

  async getAttacks(skip) {
    let sendData = { Search: getInput('Search') };
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

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Pie
            data={this.countType('phase_name', false)}
            name="phase_name"
          ></Pie>
          <Pie
            data={this.countType('x_mitre_platforms', true)}
            name="x_mitre_platforms"
          ></Pie>
        </Grid>
        <Box pt={10}></Box>
        <TextField
          variant="outlined"
          name="Search"
          label="Search"
          type="Search"
          id="Search"
          margin="normal"
          fullWidth
          onChange={(e) => {
            if (e.target.value.length > 2) {
              this.callGetAttack(true);
            } else if (e.target.value.length === 0) {
              // if reset the search
              this.callGetAttack(true);
            }
          }}
        />

        <GetMoreAttacks callGetAttack={this.callGetAttack} />

        <AttacksList attacks={this.state.attacks} />

        <GetMoreAttacks callGetAttack={this.callGetAttack} />
      </React.Fragment>
    );
  }
}
