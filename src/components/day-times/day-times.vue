<template>
  <div class="day-times">
    <div class="day-times__el">
      <h1>Sunrise</h1>
      <clockVue :time="sunrise" />
    </div>
    <div class="day-times__el">
      <h1>Golden Hour</h1>
      <clockVue :txtNeeded="true" :time="goldenHour" />
    </div>
    <div class="day-times__el">
      <h1>Sunset</h1>
      <clockVue :time="sunset" />
    </div>
  </div>
</template>

<script>
import clockVue from "./clock.vue";

export default {
  name: "day-times",
  components: {
    clockVue,
  },
  props: {
    textContent: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    sunrise() {
      return {
        starts: new Date(
          new Date("2022-01-01T" + this.textContent.sunrise).getTime()
        ),
        ends: new Date(
          new Date("2022-01-01T" + this.textContent.sunrise).getTime() +
            20 * 60000
        ),
      };
    },
    goldenHour() {
      return {
        starts: new Date(
          new Date("2022-01-01T" + this.textContent.sunrise).getTime() +
            3600000
        ),
        ends: new Date(
          new Date("2022-01-01T" + this.textContent.sunset).getTime() -
            3600000
        ),
      };
    },
    sunset() {
      return {
        starts: new Date(
          new Date("2022-01-01T" + this.textContent.sunset).getTime()
        ),
        ends: new Date(
          new Date("2022-01-01T" + this.textContent.sunset).getTime() +
            20 * 60000
        ),
      };
    },
  },
};
</script>

<style lang="scss">
.day-times {
  display: flex;
  justify-content: space-between;
  align-items: end;
  &__el {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &:nth-child(2) {
      margin-bottom: 50px;
    }
  }
  @media only screen and (max-width: 320px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
