<template>
  <div class="search-bar">
    <div class="search-bar__current-location">
      <img
        class="search-bar__current-location__icon"
        src="../assets/images/menu-icons/location.svg"
        alt=""
      />
      <h1>
        {{ textContent.city_name + ", " + textContent.country_code }}
      </h1>
    </div>
    <div
      :class="{ opened: isOpened }"
      class="search-bar__content-div"
      @click="searchBtn"
    >
      <input
        type="text"
        v-model="city"
        :class="{ opened: isOpened }"
        @keypress.enter="searchBtn"
      />
      <img
        class="search-bar__content-div__search-icon"
        src="../assets/images/menu-icons/search.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "search-bar",
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
      isOpened: false,
      city: "",
    };
  },
  methods: {
    searchBtn() {
      if (
        event.target.localName.toString() === "img" ||
        (event.key === "Enter" && this.city)
      ) {
        this.isOpened = !this.isOpened;
      } else {
        this.isOpened = true;
      }
      if (this.city) {
        this.$emit("search", this.fixedCityName(this.city));
        this.city = "";
      }
    },
    fixedCityName(city) {
      const splitted = city.split("");
      const rest = [...splitted];
      rest.splice(0, 1);
      return [splitted[0].toUpperCase(), ...rest].join("");
    },
  },
};
</script>

<style lang="scss">
.search-bar {
  min-height: 90px;
  min-width: 445px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  &__current-location {
    position: absolute;
    left: 0;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-wrap: nowrap;
    h1 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 300;
      font-size: 32px;
      line-height: 120%;
    }
    &__icon {
      opacity: 30%;
      padding-right: 31px;
    }
  }
  &__content-div {
    cursor: pointer;
    transition: width 0.2s ease-in-out;
    width: 25px;
    padding: 18px;
    backdrop-filter: blur(100px);
    border-radius: 20px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &:hover {
      filter: opacity(80%);
    }
    &:active {
      filter: opacity(100%);
    }
    input {
      padding: 0;
      width: 0%;
      color: white;
      text-shadow: -1.51px 2.26px 0.75px rgba(0, 0, 0, 0.1);
      width: 100%;
      border: transparent;
      background: transparent;
      z-index: 1;
      font-family: "Inter";
      font-style: normal;
      font-weight: 300;
      font-size: 24px;
      line-height: 120%;
      &:focus {
        border: transparent;
        outline: 0;
      }
    }
    img {
      cursor: pointer;
      z-index: 1;
    }
    background: linear-gradient(
      116.79deg,
      rgba(255, 255, 255, 0.48) 0%,
      rgba(255, 255, 255, 0.12) 99.45%
    );
    &:before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 20px;
      padding: 2px;
      background: linear-gradient(135deg, #ffffffa6, #ffffff00);
      mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: xor;
    }
  }
  .opened {
    width: 100%;
    &:hover {
      cursor: default;
      filter: opacity(100%);
    }
    &:active {
      filter: opacity(100%);
    }
    input {
      &:hover {
        cursor: text;
      }
      &:active {
      }
    }
    img {
      &:hover {
        filter: opacity(80%);
      }
      &:active {
        filter: opacity(90%);
      }
    }
  }
  @media only screen and (max-width: 320px) {
    min-width: 0px;
  }
}
</style>
