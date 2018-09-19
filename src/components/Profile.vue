<template>
  <div id="profile-row" class="row justify-content-md-center">
    <div class="profile-data-wrapper">

      <div class="profile-data-item">
        <div class="label">Name:</div>
        <div class="value name">{{ this.profile.name }}</div>
      </div>

      <div class="profile-data-item">
        <div class="label">Email:</div>
        <div class="value email">{{ this.profile.email }}</div>
      </div>

      <div class="profile-data-item">
        <div class="label">Phone:</div>
        <div class="value phone">{{ this.profile.phoneNumber }}</div>
      </div>

    </div>

    <div class="col-12 buttons">
      <button type="button" class="btn btn-outline-danger" @click="deleteProfile">Delete</button>
      <button type="button" class="btn btn-outline-secondary" @click="editProfile">Edit</button>
    </div>

  </div>
</template>

<script>
import {eventBus} from '../main'

/**
 * Component for an individual profile view
 */
export default {
  name: 'ContactProfile',
  props: {
    profile: Object
  },

  data () {
    return {}
  },
  methods: {
    /**
     * @description
     * Informing parent component to change view for editing
     */
    editProfile () {
      eventBus.$emit('editProfile', this.profile)
    },

    /**
     * @description
     * Informing parent component to delete selected contact
     */
    deleteProfile () {
      eventBus.$emit('deleteProfile', this.profile)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/main";

  #profile-row {
    justify-content: center;

    .profile-data-item {
      display: flex;
      align-items: center;

      .label {
        width: 70px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 8px 10px;
        font-family: "OpenSansSemiBold",sans-serif;
        color: $font-color-xlight;
      }

      .value {
        display: flex;
        align-items: center;
        padding: 8px 10px;
      }

      .email,
      .phone {
        color: $voda-red;
      }
    }

    .col-12 {
      @extend %flex-center-center;
    }

    .email,
    .phone {
      color: $voda-red;
    }

    .btn {
      padding-right: 25px;
      padding-left: 25px;
      margin: 40px 20px 0 20px;

      &:focus {
        border-color: none;
        outline: none;
        box-shadow: none;
      }
    }
  }
</style>
