<template>
  <div class="forecast-section-wrapper">
    <div class="forecast-section">
      <div class="forecast-section__days" :style="{ '--shift': shift }">
        <dayCardVue
          v-for="(content, index) in forecast"
          :key="index"
          :textContent="content"
        />
      </div>
      <div
        class="forecast-section__arrow arrow-right"
        @click="changeShift(1)"
      >
        <span> </span><span> </span>
      </div>
      <div
        class="forecast-section__arrow arrow-left"
        :class="{ hidden: !shift }"
        @click="changeShift(-1)"
      >
        <span> </span><span> </span>
      </div>
    </div>
  </div>
</template>

<script>
import dayCardVue from "./day-card.vue";
import { mapGetters } from "vuex";

export default {
  name: "forecast-section",
  components: { dayCardVue },

  data() {
    return { shift: 0 };
  },
  computed: {
    ...mapGetters(["GET_FORECAST"]),

    forecast() {
      return this.GET_FORECAST.data;
    },
  },
  methods: {
    changeShift(shift) {
      if (this.shift + shift >= 0 && this.shift + shift <= 10) {
        this.shift += shift;
      }
    },
  },
};
</script>

<style lang="scss">
.forecast-section-wrapper {
  position: relative;
  width: calc(200px * 6);
  height: 50%;
}
.forecast-section {
  position: absolute;
  max-width: 85%;
  &__content {
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
    }
  }
  &__days {
    border-radius: 11.3852px;
    margin-top: 74px;
    display: flex;
    overflow: hidden;
    div {
      transition: all 0.5s ease-in-out;
      transform: translateX(calc(-180.03px * var(--shift)));
      margin-right: 80px;
    }
  }
  &__arrow {
    padding: 0px 0px 21px 21px;
    position: absolute;
    span {
      position: absolute;
      width: 1px;
      height: 20.5px;
      background: #ffffff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      &:nth-child(2) {
        transform: rotate(90deg);
        top: 10px;
        right: 9px;
      }
    }

    &:hover {
      filter: brightness(70%);
    }
    &:active {
      filter: brightness(120%);
    }
  }
  .arrow-right {
    right: -1%;
    transform: rotate(321deg) skewY(-15deg);
  }
  .arrow-left {
    left: -3%;
    transform: rotate(140deg) skewY(-15deg);
  }
  .arrow-left,
  .arrow-right {
    top: 59%;
  }
  .hidden {
    display: none;
  }
}
@media only screen and (max-width: 1440px) {
  .forecast-section-wrapper {
    width: calc(200px * 4);
    margin-left: 13px;
  }
  .forecast-section {
    &__days {
      margin-top: 24px;
      margin-left: 13px;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .forecast-section-wrapper {
    width: calc(200px * 2);
  }
  .forecast-section {
    &__days {
      margin-left: 24px;
    }
  }
}
@media only screen and (max-width: 768px) {
  .forecast-section-wrapper {
    width: calc(200px * 3);
    margin: auto;
    margin-left: 90px;
    margin-bottom: 20px;
  }
  .forecast-section {
    position: relative;
    &__days {
      margin-top: 20px;
    }
    .arrow-left,
    .arrow-right {
      top: 50%;
    }
  }
}
@media only screen and (max-width: 320px) {
  .forecast-section-wrapper {
    width: calc(200px * 1);
    margin-left: 65px;
  }
  .forecast-section {
    position: relative;
    &__days {
      margin-left: 30px;
    }
    .arrow-left,
    .arrow-right {
      top: 45%;
    }
  }
}
</style>
