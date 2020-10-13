const axios = require('axios');
const config = require('./config.js');

module.exports = {
  maps: (city, state, zip, setDaily, setHourly, setCurrent, weather) => {
    axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},${zip}&inputtype=textquery&key=${config.google.API_KEY}`, {
      method: 'get',
      mode: 'no-cors',
      headers: {'Accept': 'application/json'}
    })
      .then((response) => {
        // console.log('maps response:', response.data);
        let loc = {};
        loc = response.data.results[0].geometry.location;
        weather(loc, setDaily, setHourly, setCurrent)
      })
      .catch(console.error)
  },
  weather: (loc, setDaily, setHourly, setCurrent) => {
    axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${loc.lat}&lon=${loc.lng}&units=metric&exclude=minutely,alerts&appid=${config.openWeatherMap.API_KEY}`, {
        method: 'get',
        mode: 'no-cors',
        headers: {'Accept': 'application/json'}
    })
      .then((response) => {
        // console.log(response.data)
        let current = {};
        current.temp = response.data.current.temp;
        current.condition = response.data.current.weather[0].main
        current.icon = response.data.current.weather[0].icon
        setCurrent(current);
        let daily = response.data.daily;
        setDaily(daily);
        let hours = response.data.hourly.slice(0, 24);
        let hourly = []
        hours.forEach((hour, i) => {
          if ((i+1) % 3 == 0) {
            hourly.push(Math.floor(hour.temp));
          }
        })
        setHourly(hourly);
      })
      .catch(console.error)
  }
}

// maps: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input