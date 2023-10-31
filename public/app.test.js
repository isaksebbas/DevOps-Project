const { describe, it, beforeAll, afterAll } = require('@jest/globals');
const fetchMock = require('jest-fetch-mock');
const app = require('./app'); // Import the entire module
const jsdom = require('jsdom-global');

describe('App', () => {
  let restore;

  beforeAll(() => {
    restore = jsdom('<!doctype html><html><body></body></html>');
    fetchMock.enableMocks();
  });

  afterAll(() => {
    restore();
  });

  const getWeather = app.getWeather; // Extract the getWeather function

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('getWeather fetches weather data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        current: {
          temp_c: 25,
          condition: {
            text: 'Sunny',
          },
        },
      })
    );

    // Set the value of the city input element
    document.getElementById('cityInput').value = 'New York';

    await getWeather();

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api.weatherapi.com/v1/current.json?key=546cc5dbc4624a37874173118233110&q=New York'
    );

    expect(document.getElementById('temperature').textContent).toBe('Temperature: 25°C');
    expect(document.getElementById('description').textContent).toBe('Description: Sunny');
  });

  it('getWeather handles fetch error', async () => {
    fetchMock.mockReject(new Error('Network Error'));

    // Set the value of the city input element
    document.getElementById('cityInput').value = 'InvalidCity';

    await getWeather();

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api.weatherapi.com/v1/current.json?key=546cc5dbc4624a37874173118233110&q=InvalidCity'
    );

    expect(console.error).toHaveBeenCalledWith('Error fetching weather data:', expect.any(Error));
  });
});
