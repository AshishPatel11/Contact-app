
export async function addContactAction({ request }) {
    const formData = await request.formData();
    let userData = {};
    for (const [key, value] of formData) {
        userData = { ...userData, [key]: value };
    }
    const image = userData.image
    const reader = new FileReader()
    if (image)
        reader.readAsDataURL(image)
    reader.addEventListener('load', () => {
        console.log(reader.result)
    });
    return null
}
