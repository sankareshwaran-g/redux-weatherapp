import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const setSearchQuery = (query) => {
  return { 
    type: 'weather/setSearchQuery', 
    payload: query 
};
};
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=ed3dc109daec45c0a3e50446230707&q=${searchQuery}&days=3&aqi=no&alerts=no`
      );
      const jsonData = await response.json();
      return jsonData.forecast.forecastday;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    forecasts: [],
    city: '',
    searchQuery: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state, action) => {
        state.searchQuery = action.meta.arg;
        state.forecasts = [];
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.forecasts = action.payload;
        state.city = action.meta.arg;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        console.error('Error fetching data', action.error);
        state.forecasts = [];
        state.city = '';
      });
  },
});

export default weatherSlice.reducer;
