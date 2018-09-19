<template>
  <div id="contact-list-item" @click="chooseContact">
    <div class="name">{{ this.contact.name }}</div>
    <div class="email">{{ this.contact.email }}</div>
    <div class="phone">{{ this.contact.phoneNumber }}</div>
  </div>
</template>

<script>
/**
 * Component for displaying each contact
 */
export default {
  name: 'ContactListItem',
  props: {
    contact: Object
  },

  methods: {
    /**
     * @description Informing parent component on chosen contact
     */
    chooseContact () {
      this.$emit('chooseContact', this.contact)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/main";

  #contact-list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 350px;
    min-width: 120px;
    border: 1px solid $contact-border-color;
    margin: 15px;
    -webkit-box-shadow: 0 9px 58px -22px rgba(133, 133, 133, 1);
    -moz-box-shadow: 0 9px 58px -22px rgba(133, 133, 133, 1);
    box-shadow: 0 9px 58px -22px rgba(133, 133, 133, 1);
    cursor: pointer;
    transition: all 200ms;
    flex: 1 0 auto;

    &:hover {
      transform: translateY(3px);
    }

    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 100%;
      background: $contact-bg-color;
      color: #fff;
    }

    .email {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      height: 35px;
      width: 100%;
      font-size: $extraSmall-font-size;
      color: $font-color-xlight;
      font-family: "OpenSansSemiBold",sans-serif;
    }

    .phone {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      height: 35px;
      width: 100%;
      font-size: $small-font-size;
      color: $font-color-xlight;
    }
  }
</style>
