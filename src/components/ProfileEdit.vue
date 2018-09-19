<template>

  <form>
    <div class="form-group row justify-content-center">
      <label for="inputName" class="col-3 col-form-label">Name:</label>
      <div class="col-9">
        <input type="text" class="form-control" id="inputName" placeholder="John Doe"
               v-model.trim.lazy="profile.name"
               v-bind:class="{error_outline: errors.nameError}">
        <span v-if="errors.nameError" class="error-span">name is required</span>
      </div>
    </div>
    <div class="form-group row justify-content-center">
      <label for="inputEmail" class="col-3 col-form-label">Email:</label>
      <div class="col-9">
        <input type="email" class="form-control" id="inputEmail" autocomplete="email"
               v-model.trim.lazy="profile.email"
               v-bind:class="{error_outline: errors.emailError}">
        <span v-if="errors.emailError" class="error-span">invalid email address</span>
      </div>
    </div>
    <div class="form-group row justify-content-center">
      <label for="inputphone" class="col-3 col-form-label">phone:</label>
      <div class="col-9">
        <input type="tel" class="form-control" id="inputphone" autocomplete="tel"
               v-model.trim.lazy="profile.phoneNumber"
               v-bind:class="{error_outline: errors.phoneError}">
        <span v-if="errors.phoneError" class="error-span">phone is required</span>
      </div>
    </div>

    <div class="form-group row justify-content-md-center">
      <div class="col-12">
        <button type="button" class="btn btn-outline-secondary"
                @click="validateForm('contactEdited', profile)"
        >
          Save Contact
        </button>
      </div>
    </div>
  </form>

</template>

<script>
import {formMixin} from './mixins/formMixin'

/**
 * Component for the contact profile editing view
 */
export default {
  name: 'ContactEditProfile',
  mixins: [formMixin],
  props: {
    contact: Object
  },

  data () {
    return {
      // hack for getting rid of reference in order to keep prop untouched
      profile: JSON.parse(JSON.stringify(this.contact))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/main";

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .row {
      width: 100%;
      max-width: 400px;
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      position: relative;

      label {
        width: 70px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-left: 20px;
        font-family: "OpenSansSemiBold",sans-serif;
        color: $font-color-xlight;
      }

      input:focus {
        border-color: none;
        box-shadow: none;
      }

      .error-span {
        color: $voda-red;
        position: absolute;
        bottom: -20px;
        font-size: $small-font-size;
      }

      .error_outline {
        border-color: $voda-red;
      }
    }

    .col-12 {
      @extend %flex-center-center;

      .btn {
        padding-right: 25px;
        padding-left: 25px;
        margin: 40px 20px 0 20px;

        &:focus {
          outline: none;
          border-color: none;
          box-shadow: none;
        }
      }
    }
  }

  @media (max-width: 460px) {
    form .row input {
      font-size: $small-font-size;
    }
  }
</style>
