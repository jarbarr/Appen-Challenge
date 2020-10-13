import React, { useState } from 'react';
const moment = require('moment');

const DailyList = (props) => {
  return (
    <div className="dailyList">
      {props.daily.map((day, i) => (
        <DailyListItem colorC={props.colorC} colorP={props.colorP} key={i} i={i} day={day} />
      ))}
    </div>
  );
};

const DailyListItem = (props) => {
  const today = moment().format('dddd')
  const week = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun', 'Mon']

  return (
    <div className="dailyListItem">
      <p className={'dddd'}>{week[props.i]}</p>
      <DailyIcon day={props.day.weather[0].main} />
      <div className="dailyTemp">
        <p
        className="tempC"
        style={{ color: props.colorC, fontWeight: 'bold' }}
        >{Math.floor(props.day.temp.day)}°</p>
        <p
        className="tempF"
        style={{ color: props.colorP, fontWeight: 'bold' }}
        >{Math.floor((props.day.temp.day * (9 / 5)) + 32)}°</p>
      </div>
    </div>
  );
};

const DailyIcon = (props) => {
  return (
    <div>
      {props.day === 'Clouds' ? <img className="icon" src="clouds.png" /> : null}
      {props.day === 'Rain' ? <img className="icon" src="rain.png" /> : null}
      {props.day === 'Drizzle' ? <img className="icon" src="sunRain.png" /> : null}
      {/* {props.day === ?<img className="icon" src={partialClouds}/> : null} */}
      {props.day === 'Clear' ? <img className="icon" src="sun.png" /> : null}
      {props.day === 'Snow' ? <img className="icon" src="snow.png" /> : null}
    </div>
  );
};

export default DailyList;