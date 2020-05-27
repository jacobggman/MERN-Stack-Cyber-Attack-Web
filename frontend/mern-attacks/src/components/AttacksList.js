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

// todo:

// must:
// search description - 2h

// bonus:
// see statics - 2h
// default routing for react

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

// class Attacks extends React.Component
const classes = 'useStyles()';

// https://material-ui.com/components/tables/
export default class Attacks extends Component {
  constructor(props) {
    super(props);
    this.state = { attacks: [] };
  }

  callGetAttack() {
    getAttacks(this.state.attacks.length, ['textSearch'])
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

  async componentDidMount() {
    this.callGetAttack();
  }

  render() {
    const addAttacksFunc = this;
    return (
      <React.Fragment>
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
            onClick={() => addAttacksFunc.callGetAttack()}
          >
            See more attacks
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
