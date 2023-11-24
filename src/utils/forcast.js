const request = require("request");
const forcast = (location, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a90d706d94f5c011868b0a08c3cd02df&query=${location}&units=m`;
  request({ url, json: true }, function (error, { body }) {
    if (error) {
      callback("`Unable to connect the WeatherService!`", undefined);
    } else if (body.error) {
      callback(`Unable to Find Location...`, undefined);
    } else {
      console.log(body);

      callback(
        undefined,
        `In ${body.location.name} ${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degree out. It  feels like ${body.current.feelslike} degree out. there`
      );
    }
  });
};
module.exports = forcast;
