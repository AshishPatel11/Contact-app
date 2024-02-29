import { redirect } from "react-router-dom";

const key = "contacts"

export function insertContact(contact) {
    const contacts = getContacts();
    contact.contactId = Date.now()
    if (isUnique(contact.phone, contact.userId)) {
        contacts.push(contact);
        localStorage.setItem(key, JSON.stringify(contacts))
        return { success: "Contact Added", contact: contact } && redirect("/home")
    }
    else
        return { error: "Contact Already Exist!" }
}

export function getContacts() {
    return JSON.parse(localStorage.getItem(key)) ?? []
}

function isUnique(phone, userId) {
    const contacts = getContacts()
    return !contacts.find(contact => contact.phone === phone && contact.userId === userId) ?? false;
}

export function getContact(contactId) {
    const contacts = getContacts()
    return contacts.find(contact => contact.contactId === contactId) || null
}

export function updateContact(contact) {
    const contacts = getContacts();
    const index = contacts.findIndex(con => con.contactId === contact.contactId)
    console.log(contact)
    if (contact.image === null) contact.image = contacts[index].image
    contacts.splice(index, 1, contact)
    localStorage.setItem(key, JSON.stringify(contacts))
    return { success: "Contact Edited", contact: contact } && redirect("/home")
}
export function deleteContact(contactId) {

    const contacts = getContacts();
    const index = contacts.findIndex(con => con.contactId === contactId)
    contacts.splice(index, 1)
    localStorage.setItem(key, JSON.stringify(contacts))
    return { success: "Contact Deleted", contact: contactId }

}