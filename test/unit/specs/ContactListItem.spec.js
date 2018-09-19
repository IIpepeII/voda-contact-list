import { shallowMount } from '@vue/test-utils'
import ContactListItem from '@/components/ContactListItem.vue'

describe('ContactListItem.vue', () => {
  let contact

  beforeEach(() => {
    contact = { id: 1, name: 'Robert Smith', email: 'robertsmith@gmail.com', phoneNumber: '+36709876543' }
  })

  it('should display contact data correctly', () => {
    const wrapper = shallowMount(ContactListItem, {
      propsData: {
        contact: contact
      }
    })
    expect(wrapper.find('div.name').text()).toBe(contact.name)
    expect(wrapper.find('div.email').text()).toBe(contact.email)
    expect(wrapper.find('div.phone').text()).toBe(contact.phoneNumber)
  })
})
