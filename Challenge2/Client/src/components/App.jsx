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

  useEffect(() => {
    let data = ['5%', '10%', '3%', '30%', '80%', '30%', '3%']
    setInfo(data)
  }, [])

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

  useEffect(() => {
    let data1 = {
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
          data: info
        }
      ],
    }
    setData(data1);
  }, [info])

  useEffect(() => {
    //Create function to get CPU information
    function cpuAverage() {

      //Initialise sum of idle and time of cores and fetch CPU info
      var totalIdle = 0, totalTick = 0;
      var cpus = os.cpus();

      //Loop through CPU cores
      for (var i = 0, len = cpus.length; i < len; i++) {

        //Select CPU core
        var cpu = cpus[i];

        //Total up the time in the cores tick
        for (type in cpu.times) {
          totalTick += cpu.times[type];
        }

        //Total up the idle time of the core
        totalIdle += cpu.times.idle;
      }

      //Return the average Idle and Tick times
      return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
    }

    // function to calculate average of array
    const arrAvg = function (arr) {
      if (arr && arr.length >= 1) {
        const sumArr = arr.reduce((a, b) => a + b, 0)
        return sumArr / arr.length;
      }
    };

    // load average for the past 1000 milliseconds calculated every 100
    function getCPULoadAVG(avgTime = 1000, delay = 100) {

      return new Promise((resolve, reject) => {

        const n = ~~(avgTime / delay);
        if (n <= 1) {
          reject('Error: interval to small');
        }

        let i = 0;
        let samples = [];
        const avg1 = cpuAverage();

        let interval = setInterval(() => {
          console.debug('CPU Interval: ', i);

          if (i >= n) {
            clearInterval(interval);
            resolve(~~((arrAvg(samples) * 100)));
          }

          const avg2 = cpuAverage();
          const totalDiff = avg2.total - avg1.total;
          const idleDiff = avg2.idle - avg1.idle;

          samples[i] = (1 - idleDiff / totalDiff);

          i++;

        }, delay);

      });

    }

    getCPULoadAVG(1000, 100).then((avg) => {
      console.log(avg);
    });
  }, setCPU(avg))


  return (
    <div className='background'>
      <div className='app'>
        <div className='body'>
          <Header CPU={cpu} memory={memory} initiated={initiated} initiate={initiate} />
          <LineGraph data={data} />
          <Time />
        </div>
      </div>
    </div>
  );
};

export default App;

