const key = "contacts"

export function insertContact(contact) {
    const contacts = getContacts();
    contact.contactId = Date.now()
    if (isUnique(contact.phone, contact.userId)) {
        contacts.push(contact);
        localStorage.setItem(key, JSON.stringify(contacts))
        return { success: "Contact Added", contact: contact }
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