import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Location from './Location.jsx';
import Form from './Form.jsx';
import LineGraph from './LineGraph.jsx';
import DailyList from './Daily.jsx';

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
  const [xAxis, setX] = useState([]);

  const getWeather = () => {
    routes.maps(city, state, zip, setDaily, setHourly, setCurrent, routes.weather, setX)
  }

  useEffect(() => {
    getWeather()
  }, [])

  useEffect(() => {
    let data = {
      labels: xAxis,
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
      setData(data);
  }, [hourly])

  const convert = () => {
    let converted = hourly.map((num) => {
      if (units === 'celsius') {
        return Math.floor((num * (9 / 5)) + 32);
      }
      if (units === 'farenheit') {
        return Math.floor((num - 32) * (5 / 9));
      }
    })
    setHourly(converted)
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
          current={current} />
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
          />
        </div>
      </div>
    </div>
  );
};

export default App;

