import { shallowMount } from '@vue/test-utils'
import ContactList from '@/components/ContactList.vue'

describe('ContactList.vue', () => {
  let contacts

  beforeEach(() => {
    contacts = [
      { id: 1, name: 'Bob Smith', email: 'janesmith@gmail.com', phoneNumber: '+36709876543' },
      { id: 2, name: 'John Doe', email: 'johnDoe@gmail.com', phoneNumber: '+36701234567' }
    ]
  })

  it('filteredContacts lenght should be 1', () => {
    const wrapper = shallowMount(ContactList, {
      propsData: {
        contacts: contacts
      }
    })
    wrapper.vm.filterLetter = 'B'
    expect(wrapper.vm.filteredContacts.length).toBe(1)
  })

  it('should have empty filteredContacts', () => {
    const wrapper = shallowMount(ContactList, {
      propsData: {
        contacts: contacts
      }
    })
    wrapper.vm.filterLetter = 'L'
    expect(wrapper.vm.filteredContacts.length).toBe(0)
  })

  it('should have 2 letters in letters list', () => {
    const wrapper = shallowMount(ContactList, {
      propsData: {
        contacts: contacts
      }
    })
    expect(wrapper.vm.letters.length).toBe(2)
  })
})
