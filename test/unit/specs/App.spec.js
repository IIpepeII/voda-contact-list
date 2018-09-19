import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import { VIEWS } from '@/constants/constants.js'

describe('App.vue', () => {
  let wrapper
  let selected

  beforeEach(() => {
    wrapper = shallowMount(App, {})
    selected = { id: 1, name: 'Robert Smith', email: 'robertsmith@gmail.com', phoneNumber: '+36709876543' }
  })

  it('should render Contacts title correctly', () => {
    wrapper.vm.appState = VIEWS.default
    expect(wrapper.find('.page-title').text()).toBe('Contacts')
  })

  it('should render Add new contact title correctly', () => {
    wrapper.vm.appState = VIEWS.profileAdd
    wrapper.vm.selectedContact = null
    expect(wrapper.find('.page-title').text()).toBe(`Add new contact`)
  })

  it('should render Contact profile title correctly ', () => {
    wrapper.vm.appState = VIEWS.profile
    wrapper.vm.selectedContact = selected
    expect(wrapper.find('.page-title').text()).toBe(`${selected.name}'s Profile`)
  })

  it('should show alert', () => {
    wrapper.vm.showAlert('show alert')
    expect(wrapper.find('.alert').isVisible()).toBe(true)
  })
})
