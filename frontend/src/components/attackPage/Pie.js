import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Title from '../Title';

class Donut extends Component {
  render() {
    return (
      <div className="donut">
        <Container>
          <Row>
            <Title>{this.props.name}</Title>
          </Row>
          <Row></Row>
        </Container>
        <Chart
          label="Series 3"
          options={{ labels: Object.keys(this.props.data) || [] }}
          series={Object.values(this.props.data) || []}
          type="donut"
          width="400"
          height="262.7"
        />
      </div>
    );
  }
}

export default Donut;
