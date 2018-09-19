import Home from '@/App'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/:contactId',
    name: 'contactId',
    component: Home,
    props: true
  }
]
