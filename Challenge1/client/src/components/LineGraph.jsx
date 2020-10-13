import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 PM'],
  datasets: [
    {
      label: '',
      fill: true,
      lineTension: 0.5,
      backgroundColor: '#33ffae',
      borderColor: '#2EE59D',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 67]
    }
  ]
}


export default class LineGraph extends React.Component {
  constructor(props){
    super(props);
    this.chartReference = React.createRef();
    // this.addData = this.addData.bind(this);
  }

  // componentDidMount() {
  //   let sets = this.state.datasets[0].data;
  //   this.setState({sets: this.props.hourly})
  //   // console.log('after', sets)
  // }

  // componentDidUpdate(prevProps, prevState) {

  // }

  // addData() {
  //   let sets = this.state.datasets[0].data;
  //   this.setState({sets: this.props.hourly})
  //   let data
  // }

  render() {
    return (
      <div>
        <Line
          width={800}
          height={600}
          data={this.props.data}
          options={{
            title:{
              display:true,
              fontSize: 20
            },
            legend:{
              display: true,
              position: 'right'
            },
            maintainAspectRatio: false
          }}
          // redraw
        />
      </div>
    );
  }
}


