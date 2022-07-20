<template>
  <div class="main-wrapper" @click="closeSearchBar">
    <loaderVue :class="{ loader: !isLoading }" />
    <div class="left">
      <searchBarVue
        class="left-search-bar"
        :textContent="weather"
        @search="search"
      />
      <currentDayVue :textContent="weather" />
      <forecastSectionVue />
    </div>
    <div class="right">
      <searchBarVue
        class="right-search-bar"
        :textContent="weather"
        @search="search"
      />
      <dayTimesVue :textContent="weather" />
      <div class="scales">
        <meteoScaleVue
          :textContent="aqi"
          :scaleContent="weather.aqi"
          :titleContent="aqiArray"
        />
        <meteoScaleVue
          :textContent="uv"
          :scaleContent="weather.uv"
          :titleContent="uvArray"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import currentDayVue from "./current-day.vue";
import dayTimesVue from "./day-times/day-times.vue";
import forecastSectionVue from "./forecast/forecast-section.vue";
import meteoScaleVue from "./meteo-scale.vue";
import searchBarVue from "./search-bar.vue";
import loaderVue from "./loader.vue";

export default {
  name: "main-wrapper",
  components: {
    meteoScaleVue,
    dayTimesVue,
    currentDayVue,
    forecastSectionVue,
    searchBarVue,
    loaderVue,
  },
  data() {
    return {
      aqi: {
        title: "Air Quality",
        scale: 500,
        scaleTitle: "Moderate",
      },
      uv: {
        title: "UV Index",
        scale: 11,
        scaleTitle: "High",
      },
      aqiArray: [
        { end: 50, res: "Good" },
        { end: 100, res: "Moderate" },
        { end: 150, res: "Unhealthy for Sensitive Groups" },
        { end: 200, res: "Unhealthy" },
        { end: 300, res: "Very Unhealthy" },
        { end: 500, res: "Hazardous" },
      ],
      uvArray: [
        { end: 2, res: "Low" },
        { end: 5, res: "Medium" },
        { end: 7, res: "High" },
        { end: 10, res: "Very High" },
        { end: 11, res: "Extremely High" },
      ],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["GET_WEATHER", "GET_FORECAST", "GET_CURRENTCITY"]),

    weather() {
      return this.GET_WEATHER;
    },
  },
  methods: {
    ...mapActions([
      "AXIOS_COORDS",
      "SET_CURRENT_CITY",
      "AXIOS_WEATHER",
      "AXIOS_FORECAST",
    ]),
    search(city) {
      this.isLoading = true;
      this.AXIOS_COORDS(city, this.isLoading)
        .then(() => {
          this.AXIOS_WEATHER().then(() => {
            this.AXIOS_FORECAST().then(() => {
              this.isLoading = false;
            });
          });
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    closeSearchBar() {
      if (
        !event.target.classList.contains("opened") &&
        event.target.localName.toString() !== "img"
      ) {
        this.$children[3].isOpened = false;
      }
    },
  },
  mounted() {
    console.log(window);
    const todayDate = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const weatherDate = new Date(
      JSON.parse(window.localStorage.getItem("weather")).ob_time
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const forecastDate = new Date(
      JSON.parse(window.localStorage.getItem("forecast")).data[0].datetime
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    if (
      weatherDate !== todayDate ||
      forecastDate !== todayDate ||
      this.GET_FORECAST.city_name ||
      this.GET_WEATHER.city_name !== this.GET_CURRENTCITY.name
    ) {
      this.AXIOS_WEATHER();
      this.AXIOS_FORECAST();
    }
  },
};
</script>

<style lang="scss">
.loader {
  opacity: 0%;
  z-index: -1;
}
.main-wrapper {
  height: 100%;
  width: 100%;
  background: linear-gradient(135deg, #f0b5ce 0%, #8c6bae 100%);
  display: flex;
  justify-content: space-between;
  .left {
    .left-search-bar {
      display: none;
    }
    width: 90%;
    padding: 50px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .right {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px;
    padding-top: 20px;
    background: radial-gradient(
      100% 100% at 0% 0%,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    .scales {
      overflow: hidden;
      padding-top: 20px;
      margin-top: 57px;
      display: flex;
      justify-content: space-between;
      border-top: 0.6px solid #ffffff;
    }
  }
  @media only screen and (max-width: 1440px) {
    .left,
    .right {
      padding: 20px;
      height: 94%;
    }
  }
  @media only screen and (max-width: 1024px) {
    .left {
      padding-right: 5px;
    }
    .right {
      padding: 16px;
    }
  }
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: max-content;
    width: 100%;
    .left {
      padding: 38px;
      margin: auto;
    }
    .right {
      padding: 38px 161px;
      width: min-content;
    }
    .left,
    .right {
      height: 100%;
    }
  }
  @media only screen and (max-width: 320px) {
    .left,
    .right {
      padding: 0px;
      width: min-content;
      .right-search-bar {
        display: none;
      }
      .left-search-bar {
        display: flex;
      }
    }
    .left {
      margin: 10px;
      width: 95%;
    }
    .scales {
      display: flex;
      flex-direction: column;
      padding: 54px;
    }
  }
}
</style>

// @media only screen and (max-width: 1440px) { }
