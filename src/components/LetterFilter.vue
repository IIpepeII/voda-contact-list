<template>
  <div class="row letters-row align-items-center justify-content-center">
          <span class="letter"
                v-for="letter in letterArr" :key="letter"
                v-bind:class="{selectedLetter : filterLetter === letter}"
                @click="letterClicked(letter)"
          >{{ letter }}</span>
    <button v-if="filterLetter !== null" id="filter-off" class="far fa-times-circle btn btn-outline-danger"
            @click="filterOff()"></button>
  </div>
</template>
<script>
import {eventBus} from '../main'

export default {

  name: 'letter-filter',

  props: {
    letterArr: Array,
    filterLetter: String
  },

  methods: {
    /**
       * @description Reacting to click event, then send selected letter through eventBus
       * @param {String} letter
       */
    letterClicked (letter) {
      eventBus.$emit('letterClicked', letter)
    },

    filterOff () {
      eventBus.$emit('goHome')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/main";

  #filter-off {
    border: 0 solid transparent;
  }

  .letters-row {
    padding: 0 0 10px 0;

    .letter {
      padding: 10px;
      font-size: $medium-font-size;
      font-family: "OpenSansBold",sans-serif;
      color: $font-color-mlight;
      cursor: pointer;
      transition: all 200ms;

      &:hover {
        color: $voda-red;
        transform: scale(1.1);
      }
    }

    .selectedLetter {
      color: $voda-red;
    }
  }

</style>
