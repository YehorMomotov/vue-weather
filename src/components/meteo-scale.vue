<template>
  <div class="meteo-scale">
    <h1>{{ textContent.title }}</h1>
    <div class="scale">
      <div class="scale__dot" :style="{ '--angle': angle }"></div>
    </div>
    <p>
      {{ scaleContent | toFix }} / {{ textContent.scale }}<br />
      {{ title.res }}
    </p>
  </div>
</template>

<script>
import toFix from "../filters/toFix.js";
export default {
  name: "meteo-scale",
  filters: { toFix },
  props: {
    textContent: {
      type: Object,
      default: function () {
        return {
          title: "CONTENT ERR",
          scale: "CONTENT ERR",
        };
      },
    },
    scaleContent: {
      type: Number,
      default: 0,
    },
    titleContent: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    angle() {
      return (this.scaleContent / this.textContent.scale) * 180 + "deg";
    },
    title() {
      return this.titleContent.find((element) => {
        return this.scaleContent <= element.end;
      });
    },
  },
};
</script>

<style lang="scss">
.meteo-scale {
  padding: 10px;
  width: min-content;
  height: max-content;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  h1 {
    margin: 0 auto;
    padding-bottom: 25px;
    font-size: 28px;
    line-height: 120%;
  }
  .scale {
    width: 192px;
    height: 96px;
    background: url("../assets/images/scale.svg") center top no-repeat;
    background-size: contain;
    position: relative;
    &__dot {
      position: absolute;
      width: calc(100% - 8px);
      height: calc(200% - 8px);
      left: 50%;
      transform: translateX(-50%) rotate(var(--angle));
      &:before {
        content: "";
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        position: absolute;
        left: 2%;
        top: 45%;
        transform: translateX(-50%);
        background: #fdfdfd60;
        border: 1px solid #efeded;
        border-radius: 50%;
      }
    }
  }
  p {
    position: absolute;
    text-align: center;
    bottom: -5.5%;
    font-size: 19px;
    line-height: 120%;
  }
}
</style>
