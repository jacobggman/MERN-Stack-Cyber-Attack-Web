import React from 'react';
import Button from '@material-ui/core/Button';

export default class GetMoreAttacks extends React.Component {
  render() {
    return (
      <div>
        <Button
          onClick={() => this.props.callGetAttack(false)}
          fullWidth
          variant="contained"
          color="primary"
        >
          See more attacks
        </Button>
      </div>
    );
  }
}
