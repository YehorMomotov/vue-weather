<template>
  <div
    class="clock-wrapper"
    :class="{ 'golden-hour': txtNeeded }"
    @click="timeformat(time.starts)"
  >
    <div class="clock">
      <div
        class="clock__seconds"
        :style="{ '--angle': angles.secondAngle }"
      ></div>
      <div
        class="clock__minutes"
        :style="{ '--angle': angles.minuteAngle }"
      ></div>
      <div
        class="clock__hours"
        :style="{ '--angle': angles.hourAngle }"
      ></div>
    </div>
    <p class="AM" v-html="timeformat(time.starts)"></p>
    <p class="PM" v-html="timeformat(time.ends)"></p>
  </div>
</template>

<script>
export default {
  name: "clockVue",
  props: {
    txtNeeded: { type: Boolean, default: false },
    time: {
      type: Object,
      default: function () {
        return { starts: new Date(), ends: new Date() };
      },
    },
  },
  computed: {
    angles() {
      return {
        hourAngle:
          ((this.time.starts.getHours() % 12) / 12) * 360 + 180 + "deg",
        minuteAngle:
          (this.time.starts.getMinutes() / 60) * 360 + 180 + "deg",
        secondAngle:
          (this.time.starts.getSeconds() / 60) * 360 + 180 + "deg",
      };
    },
  },
  methods: {
    timeformat(date) {
      if (date.toString() !== new Date("null").toString()) {
        return new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
          .formatToParts(date)
          .map(({ type, value }) => {
            switch (type) {
              case "dayPeriod":
                return `<span>${value}</span>`;
              default:
                return value;
            }
          })
          .reduce((string, part) => string + part);
      }
    },
  },
};
</script>

<style lang="scss">
.clock-wrapper {
  background: rgba(255, 255, 255, 0.26);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  border-radius: 100px;
  .clock {
    padding: 6px 2.5px 0px 2.5px;
    width: 100px;
    height: 100px;
    position: relative;
    &__hours,
    &__minutes,
    &__seconds {
      transform: rotate(var(--angle));
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      &:before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 0px;
        left: 50%;
        top: 49%;
        transform: translateX(-50%);
        border-radius: 5px;
      }
    }
    &__hours {
      &:before {
        height: 20.97px;
        border: 2px solid #e0e0e0;
        background: #e0e0e0;
      }
    }
    &__minutes {
      &:before {
        height: 34.27px;
        border: 2px solid #828282;
        background: #828282;
      }
    }
    &__seconds {
      &:before {
        border: 1px solid #885ffc;
        background: #885ffc;
        height: 48.55px;
      }
    }
  }
  .AM,
  .PM {
    font-weight: bold;
    text-shadow: none;
    margin: 0;
    span {
      display: none;
    }
  }
  .AM {
    padding: 0 10px 3.5px 10px;
    font-size: 28px;
    line-height: 34px;
  }
  .PM {
    color: #ebebeb;
    padding: 3.5px;
    font-size: 22px;
    line-height: 27px;
    padding-bottom: 36px;
  }
}
.golden-hour {
  .clock {
    padding: 20px 15px 3px 15px;
    &__hours {
      &:before {
        height: 22.97px;
      }
    }
    &__minutes {
      &:before {
        height: 37.53px;
      }
    }
    &__seconds {
      &:before {
        height: 53.17px;
      }
    }
  }

  .AM {
    padding: 0 10px 6px 10px;
    font-size: 29px;
    line-height: 35px;
    span {
      display: inline-block;
      padding-left: 3px;
      font-size: 18px;
      line-height: 22px;
    }
  }
  .PM {
    padding: 6px;
    font-size: 24px;
    line-height: 29px;
    span {
      display: inline-block;
      padding-left: 3px;
      font-size: 18px;
      line-height: 22px;
    }
    padding-bottom: 46px;
  }
}
</style>
