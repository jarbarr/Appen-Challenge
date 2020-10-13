import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Location from './Location.jsx';
import Form from './Form.jsx';
import LineGraph from './LineGraph.jsx';
import DailyList from './Daily.jsx';

const axios = require('axios');
const routes = require('../../../Routes.js');
const config = require('../../../config.js');

const App = (props) => {

  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('94103');
  const [current, setCurrent] = useState({});
  const [daily, setDaily] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [units, setUnits] = useState('celsius');
  const [measurement, setMeasure] = useState('metric');
  const [colorC, setColorC] = useState("black");
  const [colorP, setColorP] = useState("grey");
  const [data, setData] = useState({});
  const [initiated, initiate] = useState('false');

  const getWeather = () => {
    routes.maps(city, state, zip, setDaily, setHourly, setCurrent, routes.weather)
    // setTimeout(() => {
    //   graphData()
    // }, 2000)
  }

  useEffect(() => {
    let data = {
      labels: ['3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 PM'],
      datasets: [
        {
          label: `Temp in ${units}`,
          fill: true,
          lineTension: 0.5,
          backgroundColor: 'rgba(46, 229, 157, .5)',
          borderColor: 'rgba(46, 229, 157, 10)',
          borderWidth: 2,
          showLines: 'false',
          data: hourly
        }
      ],
    }

    if (initiated === 'false') {
      getWeather();
      setData(data);
      initiate(true)
    }

  })

  const graphData = () => {
    let data = {
      labels: ['3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 PM'],
      datasets: [
        {
          label: `Temp in ${units}`,
          fill: true,
          lineTension: 0.5,
          backgroundColor: 'rgba(46, 229, 157, .5)',
          borderColor: 'rgba(46, 229, 157, 10)',
          borderWidth: 2,
          showLines: 'false',
          data: hourly
        }
      ],
    }
    console.log('gd', hourly)
    setData(data);
  }

  const convert = (arr) => {
    console.log('prevconvert', arr)
    let converted = arr.map((num) => {
      if (units === 'celsius') {
        return Math.floor((num * (9 / 5)) + 32);
      }
      if (units === 'farenheit') {
        return Math.floor((num - 32) * (5 / 9));
      }
    })
    // setHourly(converted)
    console.log('converted:', converted, 'hourly:', hourly)
    setTimeout(() => {
      setHourly(converted)
      graphData()
    }, 500)
    // graphData()
  }
  return (
    <div className='background'>
      <div className='app'>
        <div className='body'>
          <Header />
          <Location
          hourly={hourly}
          convert={convert}
          colorC={colorC}
          setColorC={setColorC}
          colorP={colorP}
          setColorP={setColorP}
          units={units}
          setUnits={setUnits}
          zip={zip}
          city={city}
          state={state}
          setMeasure={setMeasure}
          graphData={graphData}
          current={current} />
          {/* {hourly.length !== 0 ? <LineGraph options={{ maintainAspectRatio: false }}width={200} height={100} units={units} hourly={hourly} /> : null } */}
          <LineGraph data={data} units={units} hourly={hourly} />
          <DailyList colorC={colorC} colorP={colorP} daily={daily} />
          <Form
            getWeather={getWeather}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zip={zip}
            setZip={setZip}
            setUnits={setUnits}
            setMeasure={setMeasure}
            setColorP={setColorP}
            colorP={colorP}
            setColorC={setColorC}
            colorC={colorC}
            convert={convert}
            current={current}
            graphData={graphData}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

