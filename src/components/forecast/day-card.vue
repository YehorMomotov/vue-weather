<template>
  <div class="day-card">
    <h2>{{ Math.round(textContent.temp) }}</h2>
    <img :src="require(`@/assets/images/icons/${icon}.png`)" alt="" />
    <h1>{{ time.toLocaleString("en-US", { weekday: "short" }) }}</h1>
  </div>
</template>

<script>
export default {
  name: "day-card",
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
      icon: "c03d",
    };
  },
  mounted() {
    this.time = new Date(this.textContent.datetime);
    this.icon = this.textContent.weather.icon;
  },
};
</script>

<style lang="scss">
.day-card {
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 11.3852px;
  width: fit-content;
  padding: 16px 3.15px;
  h1,
  h2 {
    margin: 0;
    font-family: "Overpass";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
  }
  h1 {
    margin-top: 18px;
  }
  h2 {
    margin-bottom: 18px;
    &:after {
      content: "°C";
      font-family: "Overpass";
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 30px;
      text-align: center;
    }
  }
  img {
    width: 93.76px;
    height: 68.05px;
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;

    border-radius: 11.3852px;
    padding: 0.6px;
    background: linear-gradient(215deg, #ffffffa6 0%, #00000020 100%);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
  }
}
</style>
