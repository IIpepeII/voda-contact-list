import contactsJson from '../assets/contacts.json'
import Contact from '../models/Contact'

export default class ContactService {
  contactsUrl = '../assets/contacts.json'

  getContacts () {
    let contacts = []
    contactsJson.forEach(contact => {
      contacts.push(new Contact(contact.id, contact.name, contact.email, contact.phoneNumber))
    })
    return contacts
  }
}
