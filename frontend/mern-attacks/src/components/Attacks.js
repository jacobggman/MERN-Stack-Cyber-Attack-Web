import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

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

const rows = [
  createAttack(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719'
  ),
  createAttack(
    1,
    '16 Magggggggggggggggggggggggggggggggggggggggggddddddddddddddddddddddddddddddddddakfsjasfklja lkf la klasf alks fasls faslk aklf askljf lakjfs ksaljf alskjf laks jklfa jr, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574'
  ),
  createAttack(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253'),
  createAttack(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000'
  ),
  createAttack(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919'
  ),
];

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
}
