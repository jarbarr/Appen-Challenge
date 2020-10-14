const axios = require('axios');
const config = require('./config.js');
const moment = require('moment');

module.exports = {
  maps: (city, state, zip, setDaily, setHourly, setCurrent, weather, setX) => {
    axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},${zip}&inputtype=textquery&key=${config.google.API_KEY}`, {
      method: 'get',
      mode: 'no-cors',
      headers: { 'Accept': 'application/json' }
    })
      .then((response) => {
        let loc = {};
        loc = response.data.results[0].geometry.location;
        weather(loc, setDaily, setHourly, setCurrent, setX)
      })
      .catch(console.error)
  },
  weather: (loc, setDaily, setHourly, setCurrent, setX) => {
    axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${loc.lat}&lon=${loc.lng}&units=metric&exclude=minutely,alerts&appid=${config.openWeatherMap.API_KEY}`, {
      method: 'get',
      mode: 'no-cors',
      headers: { 'Accept': 'application/json' }
    })
      .then((response) => {
        let xAxis = [];
        let now = new moment().format('h');
        let M = new moment().format('A')
        xAxis.push(`${now} ${M}`)
        let i = 3;
        while (xAxis.length < 9) {
          let val = new moment().add(i, 'hours').format('h');
          M = new moment().add(i, 'hours').format('A');
          xAxis.push(`${val} ${M}`)
          i += 3;
        }
        setX(xAxis);
        let current = {};
        current.temp = response.data.current.temp;
        current.condition = response.data.current.weather[0].main
        current.icon = response.data.current.weather[0].icon
        setCurrent(current);
        let daily = response.data.daily;
        setDaily(daily);
        let hours = response.data.hourly.slice(0, 25);
        let hourly = []
        i = 0;
        console.log(hours)
        while(hourly.length < 9) {
          console.log(hours[i]);
          hourly.push(Math.floor(hours[i].temp));
          i += 3;
        }
        setHourly(hourly);
      })
      .catch(console.error)
  }
}

