<template>
  <div id="contact-list">
    <letter-filter :letterArr="letters"
                   :filterLetter="filterLetter"/>
    <div class="row contacts-row align-items-center">
      <transition-group
        name="staggered-fade"
        tag="ul"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
      >
        <contact-list-item
          v-for="(contact, index) in filteredContacts" v-bind:key="contact.id"
          :contact="contact"
          v-on:chooseContact="chooseContact"
          v-bind:data-index="index"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import ContactListItem from './ContactListItem'
import LetterFilter from './LetterFilter'
import {eventBus} from '../main'
import Velocity from 'velocity-animate'

/**
 * This component handles the main view, by listing the contacts
 */
export default {

  name: 'contact-list',

  components: {
    'contact-list-item': ContactListItem,
    'letter-filter': LetterFilter
  },

  props: {
    contacts: Array,
    filterLetterInp: String,
    contactId: String
  },
  created () {
    eventBus.$on('letterClicked', letter => {
      this.filterLetter = letter === this.filterLetter ? null : letter
    })
    eventBus.$on('deleteFilterLetter', () => {
      this.filterLetter = null
    })
    eventBus.$on('setFirstLetterInSearch', letter => {
      this.setFilterLetterByCheck(letter)
    })
  },
  /**
   * @description
   * setting initial data
   */
  mounted () {
    this.letters = this.uniqueLetters(this.contacts.map(contact => contact.name[0]))
    this.filterContacts(null)
  },

  data () {
    return {
      filteredContacts: [],
      letters: [],
      filterLetter: this.filterLetterInp
    }
  },

  methods: {
    /**
     * @description set filterLetter's value if the received letter
     * is in the letters array
     * @param {String} letter
     */
    setFilterLetterByCheck (letter) {
      if (letter === null) {
        this.filterLetter = null
      } else if (this.letters.includes(letter.toUpperCase())) {
        this.filterLetter = letter.toUpperCase()
      }
    },
    /**
     * @description Informing parent component on chosen contact
     * @param {Contact} contact
     */
    chooseContact (contact) {
      eventBus.$emit('selectProfile', contact)
    },

    /**
     * @description showing contacts according to chosen letter, showing all if no letter was chosen
     * @param {String} letter
     */
    filterContacts (letter) {
      if (letter === null) {
        this.filteredContacts = this.contacts
      } else {
        this.filteredContacts = this.contacts.filter(contact =>
          contact.name.toLowerCase().startsWith(letter.toLowerCase())
        )
      }
    },

    /**
     * @description calculating unique letters
     * @param {Array} array
     * @returns {Array }
     */
    uniqueLetters (array) {
      let uniqueArray = [...new Set(array)]
      return uniqueArray.sort()
    },

    /**
     * setups for animations
     */
    beforeEnter: function (el) {
      el.style.opacity = 0
    },

    enter: function (el, done) {
      var delay = el.dataset.index * 50
      setTimeout(function () {
        Velocity(el, {opacity: 1}, {complete: done})
      }, delay)
    },

    leave: function (el, done) {
      var delay = el.dataset.index * 50
      setTimeout(function () {
        Velocity(el, {opacity: 0}, {complete: done})
      }, delay)
    }
  },

  watch: {
    /**
     * @description reacting to clicked letter events
     * @param {String} letter
     */
    filterLetter (letter) {
      this.filterContacts(letter)
    },

    /**
     * @description filter by letter from props
     * @param {String} letter
     */
    filterLetterInp (letter) {
      this.filterContacts(letter)
    }

  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/main";

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 0;
    width: 100%;
  }
</style>
