import React from 'react';
import ShowMoreText from 'react-show-more-text';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';

export default class AttacksList extends React.Component {
  render() {
    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Title>id</Title>
            </TableCell>
            <TableCell>
              <Title>phase_name</Title>
            </TableCell>
            <TableCell>
              <Title>x_mitre_platforms</Title>
            </TableCell>
            <TableCell>
              <Title>description</Title>
            </TableCell>
            <TableCell>
              <Title>x_mitre_detection</Title>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.attacks.map((row) => (
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
    );
  }
}
