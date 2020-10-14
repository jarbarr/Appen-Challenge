import React from 'react';
import {Line} from 'react-chartjs-2';

export default class LineGraph extends React.Component {
  constructor(props){
    super(props);
    this.chartReference = React.createRef();
  }

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
            legend: {
              display: true,
              position: 'left',
              labels: {
                fontSize: 18,
                fontColor: 'grey'
              },
            },
            maintainAspectRatio: false
          }}
          redraw
        />
      </div>
    );
  }
}


