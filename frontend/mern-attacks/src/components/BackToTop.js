import React from 'react';
import Button from '@material-ui/core/Button';

export default class BackToTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowPos: window.pageYOffset };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll);
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const scrolled = winScroll;

    this.setState({
      windowPos: scrolled,
    });
  };

  render() {
    return (
      <Button
        onClick={() => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }}
        color="secondary"
        variant="contained"
        disabled={this.state.windowPos < 300}
      >
        Back To The Top
      </Button>
    );
  }
}
