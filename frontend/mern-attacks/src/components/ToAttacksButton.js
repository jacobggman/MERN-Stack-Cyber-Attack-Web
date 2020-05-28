import React from 'react';
import Button from '@material-ui/core/Button';
import sendData from '../helpers/sendData';

export default class AttacksList extends React.Component {
  render() {
    return (
      <Button
        onClick={() =>
          sendData(this.props.url, this.props.fieldsList, (res) => {
            localStorage.setItem('token', String(res));
            window.location = 'http://localhost:3000/attacks';
          })
        }
        fullWidth
        variant="contained"
        color="primary"
        className={''}
      >
        {this.props.text}
      </Button>
    );
  }
}
