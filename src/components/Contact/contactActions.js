import { insertContact } from "../../Storage/Contact";

export async function addContactAction({ request }) {
    const formData = await request.formData();
    let ContactData = {};
    for (const [key, value] of formData) {
        ContactData = { ...ContactData, [key]: value };
    }
    console.log(ContactData)
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