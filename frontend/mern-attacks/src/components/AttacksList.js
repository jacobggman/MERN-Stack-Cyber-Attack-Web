import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import ShowMoreText from 'react-show-more-text';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Pie from './Pie';
// todo:

// must:
// search description - 2h

// bonus:
// see statics - 2h
// default routing for react
// logout

function sendConfig(url, config, callback) {
  axios
    .get(url, config)
    .then((res) => {
      console.log(res.data);
      return callback(res.data);
    })
    .catch((err) => {
      if (err.response !== undefined) {
        console.log(err.response.data);
        alert(err.response.data);
      } else {
        alert(err);
      }
    });
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

class SearchField extends React.Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.getSearchResponse = this.getSearchResponse.bind(this);
  }

  getSearchResponse() {
    this.props.getAttacks(true);
  }
}

// class Attacks extends React.Component
const classes = 'useStyles()';

// https://material-ui.com/components/tables/
export default class Attacks extends Component {
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

    this.state.attacks.map((row) => {
      if (isArray) {
        row[type].map((valueInArray) => {
          this.addOneDict(defaultDict, valueInArray);
        });
      } else {
        this.addOneDict(defaultDict, row[type]);
      }
    });

    return defaultDict;
  }

  getInput(element_id) {
    return document.getElementById(element_id).value;
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
    let sendData = { textSearch: this.getInput('textSearch') };
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
          justify="space-between"
          alignItems="flex-end"
        >
          <TextField
            variant="outlined"
            margin="normal"
            name="textSearch"
            label="textSearch"
            type="textSearch"
            id="textSearch"
            onChange={(e) => {
              if (e.target.value.length > 2) {
                this.callGetAttack(true);
              } else if (e.target.value.length == 0) {
                // if reset the search
                this.callGetAttack(true);
              }
            }}
          />
          <Pie data={this.countType('phase_name', false)}></Pie>
          <Pie data={this.countType('x_mitre_platforms', true)}></Pie>
        </Grid>
        <Title>Attacks List</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>phase_name</TableCell>
              <TableCell>x_mitre_platforms</TableCell>
              <TableCell>description</TableCell>
              <TableCell>x_mitre_detection</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.attacks.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.phase_name}</TableCell>
                <TableCell>{row.x_mitre_platforms.toString()}</TableCell>
                <TableCell>
                  <ShowMoreText>{row.description}</ShowMoreText>
                </TableCell>
                <TableCell>
                  <ShowMoreText>{row.x_mitre_detection}</ShowMoreText>
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link
            color="primary"
            href="#"
            onClick={() => this.callGetAttack(false)}
          >
            See more attacks
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
