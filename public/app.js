//http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY
//Source of code: WeatherAPI documentation, Node.js documentation, VSCode documentation aswell as syntax help from ChatGPT 3.5
console.log("app.js init");

async function getWeather() {
    const apiKey = '546cc5dbc4624a37874173118233110'; // Replace with your WeatherAPI.com API key
    const city = 'Helsinki'; // Replace with the desired city
  
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      const data = await response.json();
  
      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
  
      document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
      document.getElementById('description').textContent = `Description: ${description}`;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', getWeather);
  