import { shallowMount } from '@vue/test-utils'
import ContactProfile from '@/components/Profile.vue'

describe('ContactProfile.vue', () => {
  let contact
  let wrapper
  beforeEach(() => {
    contact = { id: 1, name: 'Robert Smith', email: 'robertsmith@gmail.com', phoneNumber: '+36709876543' }
    wrapper = shallowMount(ContactProfile, {
      propsData: {
        profile: contact
      }
    })
  })

  it('should display profile data correctly', () => {
    expect(wrapper.find('div.name').text()).toBe(contact.name)
    expect(wrapper.find('div.email').text()).toBe(contact.email)
    expect(wrapper.find('div.phone').text()).toBe(contact.phoneNumber)
  })

  it('should emit delete event', () => {
    wrapper.vm.$emit('deleteProfile', contact)
    expect(wrapper.emitted('deleteProfile')).toBeTruthy()
  })

  it('should emit edit event', () => {
    wrapper.vm.$emit('editProfile', contact)
    expect(wrapper.emitted('editProfile')).toBeTruthy()
  })
})
