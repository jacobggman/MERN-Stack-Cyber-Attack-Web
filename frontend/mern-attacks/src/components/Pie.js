import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Donut extends Component {
  render() {
    return (
      <div className="donut">
        <Chart
          label="Series 3"
          options={{ labels: Object.keys(this.props.data) || [] }}
          series={Object.values(this.props.data) || []}
          type="donut"
          width="380"
        />
      </div>
    );
  }
}

export default Donut;
