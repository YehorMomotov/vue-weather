import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    weather: JSON.parse(window.localStorage.getItem("weather")),
    forecast: JSON.parse(window.localStorage.getItem("forecast")),
    currentCity: JSON.parse(
      window.localStorage.getItem("currentCity")
    ) || { name: "Kharkiv", lon: 36.25, lat: 50 },
  },
  actions: {
    AXIOS_FORECAST({ commit }) {
      const options = {
        method: "GET",
        url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily",
        params: {
          lon: this.state.currentCity.lon,
          lat: this.state.currentCity.lat,
        },
        headers: {
          "X-RapidAPI-Key":
            "97eeb62b5fmsh3a0c29b417e6816p12f12cjsn311062a3dc2a",
          "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
      };

      return axios
        .request(options)
        .then(function (response) {
          commit("SET_FORECAST", response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    AXIOS_WEATHER({ commit }) {
      const options = {
        method: "GET",
        url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
        params: {
          lon: this.state.currentCity.lon,
          lat: this.state.currentCity.lat,
        },
        headers: {
          "X-RapidAPI-Key":
            "97eeb62b5fmsh3a0c29b417e6816p12f12cjsn311062a3dc2a",
          "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
      };

      return axios
        .request(options)
        .then(function (response) {
          commit("SET_WEATHER", response.data.data[0]);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    AXIOS_COORDS({ commit }, city) {
      this.state.isLoading = true;
      const options = {
        method: "GET",
        url: "https://community-open-weather-map.p.rapidapi.com/weather",
        params: { q: city, units: "metric" },
        headers: {
          "X-RapidAPI-Key":
            "97eeb62b5fmsh3a0c29b417e6816p12f12cjsn311062a3dc2a",
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        },
      };
      return axios.request(options).then((response) => {
        commit("SET_CURRENTCITY", {
          name: response.data.name,
          lon: response.data.coord.lon,
          lat: response.data.coord.lat,
        });
      });
    },
    SET_CURRENT_CITY({ commit }, data) {
      commit("SET_CURRENTCITY", {
        data,
      });
    },
  },
  mutations: {
    SET_FORECAST: (state, forecast) => {
      window.localStorage.setItem("forecast", JSON.stringify(forecast));
      state.forecast = forecast;
    },
    SET_WEATHER: (state, weather) => {
      window.localStorage.setItem("weather", JSON.stringify(weather));
      state.weather = weather;
    },
    SET_CURRENTCITY: (state, currentCity) => {
      window.localStorage.setItem(
        "currentCity",
        JSON.stringify(currentCity)
      );
      state.currentCity = currentCity;
    },
  },
  getters: {
    GET_WEATHER(state) {
      return state.weather;
    },
    GET_FORECAST(state) {
      return state.forecast;
    },
    GET_CURRENTCITY(state) {
      return state.currentCity;
    },
  },
});

export default store;
