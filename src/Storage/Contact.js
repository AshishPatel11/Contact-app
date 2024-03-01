import { redirect } from "react-router-dom";
import { currentUser } from "./User";
const key = "contacts"

//Insert new contact
export function insertContact(contact) {
    const contacts = getContacts();
    contact.contactId = Math.floor(100000 + Math.random() * 900000)
    if (isUnique(contact.phone, contact.userId)) {
        contacts.push(contact);
        localStorage.setItem(key, JSON.stringify(contacts))
        return { success: "Contact Added", contact: contact } && redirect("/home")
    }
    else
        return { error: "Contact Already Exist!" }
}

//Get contacts if not given specific contact id return all contact
export function getContacts(contactId) {
    if (contactId) {
        const contacts = getContacts()
        return contacts.find(contact => contact.contactId === contactId) || null
    }
    return JSON.parse(localStorage.getItem(key)) ?? []
}

//Check if contact is unique
function isUnique(phone, userId) {
    const contacts = getContacts()
    return !contacts.find(contact => contact.phone === phone && contact.userId === userId) ?? false;
}

//Update contact
export function updateContact(contact) {
    const contacts = getContacts();
    const index = contacts.findIndex(con => con.contactId === contact.contactId)
    console.log(contact)
    if (contact.image === null) contact.image = contacts[index].image
    contacts.splice(index, 1, contact)
    localStorage.setItem(key, JSON.stringify(contacts))
    return { success: "Contact Edited", contact: contact } && redirect("/home")
}


//Delete contact
export function deleteContact(contactId) {
    const contacts = getContacts();
    const index = contacts.findIndex(con => con.contactId === contactId)
    contacts.splice(index, 1)
    localStorage.setItem(key, JSON.stringify(contacts))
    return { success: "Contact Deleted", contact: contactId }

}

//Get the currently login user's contact
export function userContacts() {
    const contacts = getContacts();
    const user = currentUser();
    const userContacts = contacts.filter(contact => contact.userId === user.userId)
    return userContacts
}

//Insert contact from the imported excel
export function insertContacts(contacts) {
    const allContacts = getContacts()
    const newContacts = contacts.map(contact => {
        return ({ ...contact, userId: currentUser().userId, contactId: Math.floor(100000 + Math.random() * 900000) })
    })
    allContacts.push(...newContacts)
    localStorage.setItem(key, JSON.stringify(allContacts))
    return { success: "Contacts Added", contacts: newContacts };
}