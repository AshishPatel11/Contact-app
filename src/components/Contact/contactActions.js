import { read, utils } from "xlsx";
import { insertContact, insertContacts, updateContact } from "../../Storage/Contact";
import { redirect } from "react-router-dom";

export async function addContactAction({ request }) {
    const formData = await request.formData();
    let ContactData = {};
    for (const [key, value] of formData) {
        ContactData = { ...ContactData, [key]: value };
    }
    if (ContactData.image.name) {
        ContactData.image = await readImage(ContactData.image)
    }
    else
        ContactData.image = null
    ContactData.userId = Number(ContactData.userId)
    ContactData.phone = Number(ContactData.phone)
    const response = insertContact(ContactData)
    if (response.error) {
        throw new Response(response.error);
    } else {
        return response;
    }
}

const readImage = (image) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(image);
});

export async function editContactAction({ request }) {
    const formData = await request.formData();
    let ContactData = {};
    for (const [key, value] of formData) {
        ContactData = { ...ContactData, [key]: value };
    }
    if (ContactData.image.name) {
        ContactData.image = await readImage(ContactData.image)
    }
    else
        ContactData.image = null
    ContactData.userId = Number(ContactData.userId)
    ContactData.contactId = Number(ContactData.contactId)
    ContactData.phone = Number(ContactData.phone)
    const response = updateContact(ContactData)
    if (response.error) {
        throw new Response(response.error);
    } else {
        return response;
    }
}

export async function importContactAction({ request }) {
    const formData = await request.formData();
    let file = {};
    for (const [key, value] of formData) {
        file = { ...file, [key]: value };
    }
    const arrayBuffer = await file.sheet.arrayBuffer()
    let workbook = read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let contacts = utils.sheet_to_json(worksheet)

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