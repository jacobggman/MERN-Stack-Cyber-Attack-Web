import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';

// todo:

// must - 4h
// fix promise of the attack function - 2h
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

// id, description, x_mitre_platforms, x_mitre_detection, phase_name
export default function Attacks() {
  const classes = useStyles();
  const config = { headers: { 'Content-Type': 'application/json' } };
  config.headers['x-auth-token'] = localStorage.getItem('token');
  let returnData = axios
    .get('http://localhost:2802/attacks', config)
    .then((res) => {
      console.log(res.data);
      const rows = res.data;
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
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.x_mitre_platforms}</TableCell>
                  <TableCell>{row.x_mitre_detection}</TableCell>
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
    })
    .catch((err) => {
      if (err.response !== undefined) {
        console.log(err.response.data);
        alert(err.response.data);
      } else {
        alert(err);
      }
      window.location = 'http://localhost:3000/login';
    });

  return returnData;
}
