const { describe, it, beforeAll, afterAll } = require('@jest/globals');
const fetchMock = require('jest-fetch-mock');
const app = require('./app'); // Import the entire module
const jsdom = require('jsdom-global');

describe('App', () => {
  let restore;

  beforeAll(() => {
    restore = jsdom('<!doctype html><html><body><input id="cityInput"/><div id="temperature"></div><div id="description"></div></body></html>');
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

    const city = 'New York';
    document.getElementById('cityInput').value = city;

    await getWeather();

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining(city));
    expect(fetchMock.mock.calls[0][0]).toMatch(/546cc5dbc4624a37874173118233110/); // Replace with your API key variable

    expect(document.getElementById('temperature').textContent).toBe('Temperature: 25°C');
    expect(document.getElementById('description').textContent).toBe('Description: Sunny');
  });
});
