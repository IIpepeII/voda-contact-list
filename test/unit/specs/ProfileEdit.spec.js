import { shallowMount } from '@vue/test-utils'
import ContactProfileEdit from '@/components/ProfileEdit.vue'

describe('ContactProfileEdit.vue', () => {
  let contact
  let wrapper

  beforeEach(() => {
    contact = { id: 1, name: 'Robert Smith', email: 'robertsmith@gmail.com', phoneNumber: '+36709876543' }
    wrapper = shallowMount(ContactProfileEdit, {
      propsData: {
        contact: contact
      }
    })
  })

  it('should not have an error when name value is filled', () => {
    wrapper.vm.profile.name = 'John Doe'
    wrapper.vm.validateForm('', '')
    expect(wrapper.vm.errors.nameError).toBe(false)
  })

  it('should not have an error when email is valid', () => {
    wrapper.vm.profile.email = 'robertsmith@email.com'
    wrapper.vm.validateForm('', '')
    expect(wrapper.vm.errors.emailError).toBe(false)
  })

  it('should not have an error when phone value filled', () => {
    wrapper.vm.profile.phoneNumber = '+36709876543'
    wrapper.vm.validateForm('', '')
    expect(wrapper.vm.errors.phoneError).toBe(false)
  })

  it('should have an error when name value is empty', () => {
    wrapper.vm.profile.name = ''
    wrapper.vm.validateForm('', '')
    expect(wrapper.vm.errors.nameError).toBe(true)
  })

  it('should have an error when email is invalid', () => {
    wrapper.vm.profile.email = 'robertsmith@email.c'
    wrapper.vm.validateForm('', '')
    expect(wrapper.vm.errors.emailError).toBe(true)
  })

  it('should have an error when phone value empty', () => {
    wrapper.vm.profile.phoneNumber = ''
    wrapper.vm.validateForm('', '')
    expect(wrapper.vm.errors.phoneError).toBe(true)
  })

  it('should prepopulate name input field', () => {
    let nameVal = wrapper.find('input[type="text"]').element.value
    expect(nameVal).toBe(contact.name)
  })

  it('should prepopulate email input field', () => {
    let nameVal = wrapper.find('input[type="email"]').element.value
    expect(nameVal).toBe(contact.email)
  })

  it('should prepopulate phone input field', () => {
    let nameVal = wrapper.find('input[type="tel"]').element.value
    expect(nameVal).toBe(contact.phoneNumber)
  })
})
