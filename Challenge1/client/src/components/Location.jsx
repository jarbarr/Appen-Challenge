import React, { useState } from 'react';

const moment = require('moment');

const Location = (props) => {
  return (
    <div className="location">
      <h2>{props.city}, {props.state} {props.zip}</h2>
      <h3>{moment().format('dddd')}</h3>
      <h3>{props.current.condition}</h3>
      <Weather
        hourly={props.hourly}
        convert={props.convert}
        colorC={props.colorC}
        setColorC={props.setColorC}
        colorP={props.colorP}
        setColorP={props.setColorP}
        setUnits={props.setUnits}
        setMeasure={props.setMeasure}
        units={props.units}
        graphData={props.graphData}
        current={props.current} />
    </div>
  );
}

const Weather = (props) => {
  const switchUnits = (e) => {
    if (props.units === 'celsius') {
      props.current.temp = ((props.current.temp * (9 / 5)) + 32);
      props.setUnits('farenheit');
      props.setMeasure('imperial');
    } else {
      props.current.temp = ((props.current.temp - 32) * (5 / 9));
      props.setUnits('celsius');
      props.setMeasure('metric');
    }
    props.convert(props.hourly);
    props.setColorC(props.colorP);
    props.setColorP(props.colorC);
    // props.graphData()
    // props.setClick('unClicked')

  }
  return (
    <div className="weather">
      { props.current ? <Icon current={props.current} /> : null}
      <p className="temp">{(Math.floor(Number(props.current.temp))).toString()}</p>
      <div className="degrees">
        <p
          className="celsius"
          style={{ color: props.colorC }}
          onClick={switchUnits}>°C</p>
        <p className="p">|</p>
        <p
          className="farenheit"
          style={{ color: props.colorP }}
          onClick={switchUnits}>°F</p>
      </div>
    </div>
  );
};

const Icon = (props) => {
  return (
    <div>
      {props.current.condition === 'Clouds' ? <img className="icon" src="clouds.png" /> : null}
      {props.current.condition === 'Rain' ? <img className="icon" src="rain.png" /> : null}
      {props.current.condition === 'Drizzle' ? <img className="icon" src="sunRain.png" /> : null}
      {/* {props.current.condition === ?<img className="icon" src={partialClouds}/> : null} */}
      {props.current.condition === 'Clear' ? <img className="icon" src="sun.png" /> : null}
      {props.current.condition === 'Snow' ? <img className="icon" src="snow.png" /> : null}
    </div>
  );
};

export default Location;