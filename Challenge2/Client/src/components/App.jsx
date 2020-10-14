import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
// import Memory from './Memory.jsx';
// import CPU from './CPU.jsx';
import LineGraph from './LineGraph.jsx';
import Time from './Time.jsx';

const os = require('os');
const process = require('process');
const cpuStat = require('cpu-stat');

const routes = require('../../../Routes.js');

const App = (props) => {

  const [data, setData] = useState({});
  const [CPU, setCPU] = useState('');
  const [Memory, setMemory] = useState([]);
  const [initiated, initiate] = useState(false);
  const [info, setInfo] = useState([])

  // useEffect(() => {
  //   let data = ['5%', '10%', '3%', '30%', '80%', '30%', '3%']
  //   setInfo(data)
  // }, [])

  const memory = () => {
    let data = {
      labels: ['60', '50', '40', '30', '20', '10', '0'],
      datasets: [
        {
          label: `Memory Usage`,
          fill: true,
          lineTension: 0.5,
          backgroundColor: 'rgba(46, 229, 157, .5)',
          borderColor: 'rgba(46, 229, 157, 10)',
          borderWidth: 2,
          showLines: 'true',
          data: ['0%', '5%', '10%', '20%', '5%', '20%', '1%']
        }
      ],
    }
    setData(data);
    console.log(data)
  }
  const cpu = () => {
    let data = {
      labels: ['60', '50', '40', '30', '20', '10', '0'],
      datasets: [
        {
          label: `CPU Usage`,
          fill: true,
          lineTension: 0.5,
          backgroundColor: 'rgba(46, 229, 157, .5)',
          borderColor: 'rgba(46, 229, 157, 10)',
          borderWidth: 2,
          showLines: 'true',
          data: ['5%', '10%', '3%', '30%', '80%', '30%', '3%']
        }
      ],
    }
    setData(data);
    console.log(data)
  }

  // useEffect(() => {
  //   let data1 = {
  //     labels: ['60', '50', '40', '30', '20', '10', '0'],
  //     datasets: [
  //       {
  //         label: `Memory Usage`,
  //         fill: true,
  //         lineTension: 0.5,
  //         backgroundColor: 'rgba(46, 229, 157, .5)',
  //         borderColor: 'rgba(46, 229, 157, 10)',
  //         borderWidth: 2,
  //         showLines: 'true',
  //         data: info
  //       }
  //     ],
  //   }
  //   console.log(data)
  //   // if (initiated === false) {
  //     setData(data1);
  //     console.log(data)
  //   // }
  //   // initiate(true);
  // }, [info])

//   useEffect(() => {
// //Create function to get CPU information
// function cpuAverage() {


  return (
    <div className='background'>
      <div className='app'>
        <div className='body'>
          <Header CPU={cpu} memory={memory} initiated={initiated} initiate={initiate}/>
          <LineGraph data={data} />
          <Time />
        </div>
      </div>
    </div>
  );
};

export default App;

