import { read, utils } from "xlsx";
import { insertContact, insertContacts, updateContact } from "../../Storage/Contact";
import { redirect } from "react-router-dom";

//Insert new contact action method
export async function addContactAction({ request }) {
    const formData = await request.formData();
    let contactData = {};
    for (const [key, value] of formData) {
        contactData = { ...contactData, [key]: value };
    }
    if (contactData.image.name) {
        contactData.image = await readImage(contactData.image)
    }
    else
        contactData.image = null
    contactData.userId = Number(contactData.userId)
    contactData.phone = Number(contactData.phone)
    const response = insertContact(contactData)
    if (response.error) {
        throw new Response(response.error);
    } else {
        return response;
    }
}

//reads image and returns base64 string promise
const readImage = (image) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(image);
});

//Edit Conatact action method
export async function editContactAction({ request }) {
    const formData = await request.formData();
    let contactData = {};
    for (const [key, value] of formData) {
        contactData = { ...contactData, [key]: value };
    }
    if (contactData.image.name) {
        contactData.image = await readImage(contactData.image)
    }
    else
        contactData.image = null
    contactData.userId = Number(contactData.userId)
    contactData.contactId = Number(contactData.contactId)
    contactData.phone = Number(contactData.phone)
    const response = updateContact(contactData)
    if (response.error) {
        throw new Response(response.error);
    } else {
        return response;
    }
}

//importing contact action method
export async function importContactAction({ request }) {
    const formData = await request.formData();
    let file = {};
    for (const [key, value] of formData) {
        file = { ...file, [key]: value };
    }
    const arrayBuffer = await file.sheet.arrayBuffer()
    let workbook = read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const contacts = utils.sheet_to_json(worksheet)

    const newContacts = contacts.map(contact => {
        const validContact = {}
        for (const key in contact) {
            validContact[key.toLowerCase()] = contact[key]
        }
        return validContact
    })
    const response = insertContacts(newContacts)
    return response && redirect("/home")
}