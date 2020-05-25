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

// must - 4h
// search description - 2h

// bonus - 3h
// see collection

// cool - 3h
// default routing for react
// add see more attacks

// if have time - 2h
// forget password

// Generate Order Data
function createAttack(
  id,
  description,
  x_mitre_platforms,
  x_mitre_detection,
  phase_name
) {
  return { id, description, x_mitre_platforms, x_mitre_detection, phase_name };
}

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

async function getAttacks() {
  const config = { headers: { 'Content-Type': 'application/json' } };
  config.headers['x-auth-token'] = localStorage.getItem('token');
  const response = await axios.get('http://localhost:2802/attacks', config);
  return response.data;
}

// id, description, x_mitre_platforms, x_mitre_detection, phase_name
// class Attacks extends React.Component
const classes = 'useStyles()';

export default class Attacks extends Component {
  constructor(props) {
    super(props);
    this.state = { attacks: [] };
  }

  async componentDidMount() {
    try {
      getAttacks().then((res) => this.setState({ attacks: res }));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Title>Recent Attacks</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>x_mitre_platforms</TableCell>
              <TableCell>x_mitre_detection</TableCell>
              <TableCell>phase_name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.attacks.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <ShowMoreText>{row.description}</ShowMoreText>
                </TableCell>
                <TableCell>{row.x_mitre_platforms.toString()}</TableCell>
                <TableCell>
                  width: 50
                  <ShowMoreText>{row.x_mitre_detection}</ShowMoreText>
                </TableCell>
                <TableCell>{row.phase_name}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more attacks
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
