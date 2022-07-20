<template>
  <div class="current-day">
    <div class="current-day__header">
      <img :src="require(`@/assets/images/icons/${icon}.png`)" alt="" />
      <div class="units" @click="changeUnits">
        <span
          class="units__fahrenheit"
          :class="{ active: units === 'F', unactive: units === 'C' }"
          >F</span
        >
        <span
          class="units__celsius"
          :class="{ active: units === 'C', unactive: units === 'F' }"
          >C</span
        >
      </div>
    </div>
    <div class="current-day__content">
      <h1>
        {{
          units === "C"
            ? textContent.temp
            : ((textContent.temp * 9) / 5 + 32) | toFix
        }}
        <span>°{{ units }}</span>
      </h1>
      <div class="date">
        <h2>
          {{ this.time.getDate() }}th
          {{
            this.time.toLocaleString("en-us", {
              month: "short",
            })
          }}
          ‘{{
            this.time.toLocaleString("en-us", {
              year: "2-digit",
            })
          }}
        </h2>
        <div class="time">
          <span>{{
            time.toLocaleString("en-US", { weekday: "long" })
          }}</span>
          <span>{{
            time.toLocaleString("en-US", {
              hour: "numeric",
              hour12: true,
              minute: "numeric",
            })
          }}</span>
        </div>
      </div>
    </div>
    <div class="current-day__forecast">
      <div>
        <img src="../assets/images/menu-icons/wind.svg" alt="" />

        <p>Wind</p>
        <p>{{ textContent.wind_spd || 0 | toFix }} km/h</p>
      </div>
      <div>
        <img src="../assets/images/menu-icons/humidity.svg" alt="" />

        <p>Hum</p>
        <p>{{ textContent.rh || 0 }} %</p>
      </div>
      <div>
        <img src="../assets/images/menu-icons/rain.svg" alt="" />
        <p>Rain</p>
        <p>{{ textContent.precip || 0 }} %</p>
      </div>
    </div>
  </div>
</template>

<script>
import toFix from "../filters/toFix.js";
export default {
  name: "current-day",
  filters: { toFix },
  props: {
    textContent: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      time: new Date(),
      units: "C",
      icon: "c03d",
    };
  },
  methods: {
    changeUnits() {
      this.units = this.units === "C" ? "F" : "C";
    },
  },
  watch: {
    textContent: {
      handler() {
        this.time = new Date(this.textContent.ob_time);
        this.icon = this.textContent.weather.icon;
      },
      deep: true,
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.current-day {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  width: 100%;
  &__header {
    display: flex;
    justify-content: space-between;
    img {
      width: 143.23px;
    }
    .units {
      height: fit-content;
      padding: 5px 2px;
      border-radius: 100px;
      background: rgba(255, 255, 255, 0.18);
      .active {
        background: rgba(255, 255, 255, 0.18);
      }
      &__fahrenheit,
      &__celsius {
        transition: all 0.2s ease-in-out;
        user-select: none;
        text-shadow: none;
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        padding: 5px 20px;
        border-radius: 100px;
      }
      &:hover {
        .unactive {
          filter: brightness(80%);
        }
      }
      &:active {
        .unactive {
          filter: brightness(120%);
        }
      }
    }
  }
  &__forecast {
    font-family: "Overpass";
    font-style: normal;
    font-weight: 300;
    font-size: 22px;
    line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        margin: 0;
        padding: 0 10px;
        padding-top: 5px;
        width: max-content;
      }
      img {
        padding-right: 10px;
        width: 22px;
        height: 22px;
      }
      &:nth-child(1),
      &:nth-child(2) {
        &:after {
          content: "";
          width: 1px;
          height: 16px;
          border-right: 1px solid #ffffff;
          margin: auto 20px;
          display: inline-block;
        }
      }
      &:nth-child(3) {
        &:nth-child(3)p {
          padding-right: 0px;
        }
      }
    }
  }
  &__days {
    margin-top: 74px;
    display: flex;
    overflow: hidden;
    div {
      margin-right: 80px;
    }
  }
  &__content {
    h1 {
      font-size: 164px;
      line-height: 120%;
      font-weight: 100;
      position: relative;
      margin: 0;
      display: inline-block;
      text-shadow: -4px 2px 1px rgba(0, 0, 0, 0.25);
      span {
        position: absolute;
        right: -40px;
        top: 15px;
        font-weight: 400;
        font-size: 32px;
        line-height: 120%;
        letter-spacing: -0.05em;
        text-shadow: -4px 2px 1px rgba(0, 0, 0, 0.25);
      }
    }
    .date {
      h2 {
        font-weight: 400;
        font-size: 36px;
        line-height: 120%;
        margin: 0;
      }
      .time {
        margin-top: 25px;
        span {
          font-weight: 300;
          font-size: 24px;
          line-height: 120%;
          &:nth-child(1) {
            &:after {
              content: "";
              width: 1px;
              height: 16px;
              border-right: 1px solid #ffffff;
              margin: auto 20px;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1440px) {
    &__content {
      h1 {
        font-size: 124px;
        line-height: 110%;
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    &__forecast {
      font-size: 18px;
      line-height: 16px;
      div {
        p {
          padding: 0 5px;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    div {
      margin-bottom: 20px;
    }
  }
  @media only screen and (max-width: 320px) {
    &__forecast {
      font-size: 18px;
      line-height: 16px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      div {
        p {
          padding: 0 5px;
        }
        &:nth-child(1),
        &:nth-child(2) {
          &:after {
            display: none;
          }
        }
      }
    }
  }
}
</style>
