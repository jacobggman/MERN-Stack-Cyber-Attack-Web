import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

class Donut extends Component {
  render() {
    return (
      <div className="donut">
        <Container>
          <Row>{this.props.name}</Row>
          <Row></Row>
        </Container>
        <Chart
          label="Series 3"
          options={{ labels: Object.keys(this.props.data) || [] }}
          series={Object.values(this.props.data) || []}
          type="donut"
          width="380"
          height="222.7"
        />
      </div>
    );
  }
}

export default Donut;
