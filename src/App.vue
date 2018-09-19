<template>
  <div class="container-fluid">
    <div id="app" class="container">
      <transition name="fade" mode="out-in">
        <div v-if="alertText !== null" class="alert alert-success" role="alert">
          {{ alertText }}
        </div>
      </transition>
      <div class="row header-row align-items-center justify-content-between">
        <div class="col col-logo"><img @click="goHome" id="vodafone-logo" src="./assets/vodafone_logo.svg" width=200>
        </div>
        <div class="col col-search-input" v-if="appState === views.default">

          <input type="text"
                 v-model="searchInput"
                 placeholder="Search for contact"
          >
        </div>
      </div>
      <div class="row title-row align-items-center justify-content-center">
        <div class="col col-title">
          <transition name="fade" mode="out-in" appear>
            <div class="page-title" :key="pageTitle">{{ pageTitle }} <span class="after"></span></div>
          </transition>
        </div>
      </div>

      <transition name="fade" mode="out-in">

        <contact-list
          v-if="appState === views.default"
          :contacts="contacts"
          :filterLetterInp="filterLetter"
        />

        <profile
          v-if="appState === views.profile"
          :profile="this.selectedContact"
        />

        <profile-edit
          v-if="appState === views.profileEdit"
          :contact="selectedContact"
        />

        <profile-add
          v-if="appState === views.profileAdd"
        />

      </transition>

    </div> <!-- #app end -->

    <transition name="fade" mode="out-in">
      <div v-if="appState !== views.profileAdd" id="add-btn" @click="goToAdd">
        <i class="fas fa-user-plus"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import Profile from './components/Profile.vue'
import ContactList from './components/ContactList.vue'
import ProfileEdit from './components/ProfileEdit.vue'
import ProfileAdd from './components/ProfileAdd.vue'
import ContactService from './services/ContactService.js'
import {VIEWS} from './constants/constants.js'
import {eventBus} from './main'

/**
   * Main component handling all the views in the app
   */
export default {
  name: 'app',
  components: {
    'contact-list': ContactList,
    'profile': Profile,
    'profile-edit': ProfileEdit,
    'profile-add': ProfileAdd
  },
  props: {
    staticVal: String
  },
  /**
     * @description
     */
  beforeCreate () {
    this.contactService = new ContactService()
  },

  /**
     * @description
     * setting eventListeners for events coming from child components
     * getting contact data from service
     */
  created () {
    eventBus.$on('selectProfile', profile => (this.selectedContact = profile))
    eventBus.$on('editProfile', () => this.goToEdit())
    eventBus.$on('deleteProfile', contact => this.deleteContact(contact))
    eventBus.$on('contactEdited', contact => this.contactEdited(contact))
    eventBus.$on('contactAdded', contact => this.contactAdded(contact))
    eventBus.$on('letterClicked', () => this.deleteSearchInp())
    eventBus.$on('goHome', () => this.goHome())

    this.contacts = this.contactService.getContacts()
  },

  beforeMount () {
  },

  mounted () {
  },

  data () {
    return {
      contacts: [],
      filterLetter: null,
      searchInput: null,
      selectedContact: null,
      alertText: null,
      views: VIEWS,
      appState: VIEWS.default
    }
  },

  methods: {
    /**
     * @description
     * deleting contact from contact list and setting default view
     * @param {Contact} contact
     */
    deleteContact (contact) {
      this.appState = this.views.default
      this.selectedContact = null
      this.contacts = this.contacts.filter(item => {
        return item.id !== contact.id
      })
      this.showAlert(`Contact deleted successfully`)
    },

    /**
     * @description
     * Set searchInput value to null
     */
    deleteSearchInp () {
      this.searchInput = null
    },

    /**
     * @description
     * Saving existing contact and setting default view
     * @param {Contact} contact
     */
    contactEdited (contact) {
      this.appState = this.views.default
      this.selectedContact = null
      this.contacts = this.contacts.map(item => {
        return item.id === contact.id ? contact : item
      })
      this.showAlert(`Contact saved successfully`)
    },

    /**
     * @description
     * Add new contact to contact list
     * @param {Contact} contact
     */
    contactAdded (contact) {
      this.appState = this.views.default
      this.selectedContact = null
      this.contacts.push(contact)
      this.showAlert('Contact added successfully')
    },

    /**
     * @description
     * Set view to default state and set selectedContact
     * and filterLetter to null, delete search input then
     * emit deleteFilterLetter event
     */
    goHome () {
      this.appState = this.views.default
      this.selectedContact = null
      this.filterLetter = null
      this.deleteSearchInp()
      eventBus.$emit('deleteFilterLetter')
    },

    /**
     * @description
     * Setting the edit contact view
     */
    goToEdit () {
      this.appState = this.views.profileEdit
      this.filterLetter = null
    },

    /**
     * @description
     * setting the add new Contact view
     */
    goToAdd () {
      this.appState = this.views.profileAdd
      this.filterLetter = null
      this.selectedContact = null
    },

    /**
     * @description
     * showing a confirmation message for the user after editing, deleting or adding a contact
     * @param {String} text
     */
    showAlert (text) {
      this.alertText = text
      setTimeout(() => {
        this.alertText = null
      }, 2000)
    }
  },

  watch: {

    /**
     * @description
     * handle typing event in search bar and emit an event,
     * if letter argument is not null send the first letter
     * of the array with the event else send null and delete
     * search input field
     * @param {String} letter
     */
    searchInput (letter) {
      if (letter === '') {
        eventBus.$emit('setFirstLetterInSearch', null)
        this.deleteSearchInp()
      } else {
        this.filterLetter = letter
        eventBus.$emit('setFirstLetterInSearch', this.filterLetter[0])
      }
    },

    /**
     * @description
     * handling contact select event and changing view accordingly
     * @param {Contact} contact
     */
    selectedContact (contact) {
      if (contact !== null) {
        this.appState = this.views.profile
      }
    }
  },

  computed: {
    /**
     * @description
     * dynamically changing the title of the page
     * @returns {String}
     */
    pageTitle () {
      if (this.appState === this.views.profile && this.selectedContact) {
        return `${this.selectedContact.name}'s Profile`
      } else if (this.appState === this.views.profileEdit && this.selectedContact) {
        return `Edit ${this.selectedContact.name}'s Profile`
      } else if (this.appState === this.views.profileAdd) {
        return 'Add new contact'
      } else {
        return 'Contacts'
      }
    }
  }
}
</script>

<style lang="scss">
  @import "styles/main";

  @font-face {
    font-family: OpenSansRegular;
    src: url("./assets/fonts/Open_Sans/OpenSans-Regular.ttf");
  }

  @font-face {
    font-family: OpenSansBold;
    src: url("./assets/fonts/Open_Sans/OpenSans-Bold.ttf");
  }

  @font-face {
    font-family: OpenSansSemiBold;
    src: url("./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf");
  }

  @font-face {
    font-family: OpenSansLight;
    src: url("./assets/fonts/Open_Sans/OpenSans-Light.ttf");
  }

  @font-face {
    font-family: OpenSansExtraBold;
    src: url("./assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf");
  }

  * {
    box-sizing: border-box;
  }

  #app {
    font-family: "OpenSansRegular",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: $font-color;
    margin-top: 30px;
    position: relative;

    .alert-success {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      top: -20px;
      height: 20px;
      padding: 5px 10px;
      font-size: $small-font-size;
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      min-width: 300px;
    }

    #vodafone-logo {
      cursor: pointer;
    }

    .col-search-input {
      display: flex;
      justify-content: flex-end;

      input[type="text"] {
        @extend %search-box;
        min-width: 170px;
        width: 80%;
      }
    }

    .title-row {
      margin: 30px 0;

      .col-title {
        .page-title {
          font-size: $large-font-size;
          font-family: "OpenSansBold",sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          text-align: center;

          .after {
            width: 40px;
            height: 3px;
            background: $voda-red;
          }
        }
      }
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
  }

  .letter {
    padding: 10px;
    text-align: center;
  }

  #add-btn {
    width: 50px;
    height: 50px;
    background: $voda-red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: $medium-font-size;
    position: fixed;
    right: 40px;
    bottom: 40px;
    -webkit-box-shadow: 0 6px 17px -5px #858585;
    -moz-box-shadow: 0 6px 17px -5px #858585;
    box-shadow: 0 6px 17px -5px #858585;
    cursor: pointer;
    transition: all 200ms;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 460px) {
    #app .col-search-input {
      display: none;
    }

    #vodafone-logo {
      width: 100%;
    }

    #app .title-row .col-title .page-title {
      font-size: $medium-font-size;
    }
  }
</style>
