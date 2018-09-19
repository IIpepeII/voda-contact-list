import { eventBus } from '../../main'

export const formMixin = {
  data () {
    return {
      errors: {
        nameError: false,
        emailError: false,
        phoneError: false
      }
    }
  },

  methods: {
    /*
    * email validation check by regex
    */
    validEmail () {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.profile.email)
    },

    /*
    * Checking input validity and setting errors accordingly,
    * if no errors found submitting form to parent component by
    * emitting en event
    */
    validateForm (event, message) {
      let errors = 0
      if (this.profile.name.length === 0) {
        this.errors.nameError = true
        errors++
      }
      if (!this.validEmail()) {
        this.errors.emailError = true
        errors++
      }
      if (this.profile.phoneNumber.length === 0) {
        this.errors.phoneError = true
        errors++
      }

      if (errors > 0) {

      } else {
        eventBus.$emit(event, message)
      }
    }
  },

  watch: {
    'profile.name' (name) {
      this.errors.nameError = name.length === 0
    },

    'profile.phoneNumber' (phone) {
      this.errors.phoneError = phone.length === 0
    },

    'profile.email' () {
      this.errors.emailError = !this.validEmail()
    }
  }
}
