import { getUser, insertUser } from "../../Storage/User";

export async function signupAction({ request }) {
    const formData = await request.formData();
    let userData = {};
    for (const [key, value] of formData) {
        userData = { ...userData, [key]: value };
    }
    if (userData.password !== userData.confirmPassword)
        return { err: "password does not match" };
    else {
        const { email, password } = userData;
        const response = insertUser({ email, password });
        if (response.error) {
            throw new Response(response.error);
        } else {
            return response;
        }
    }
}

export async function signinAction({ request }) {
    const formData = await request.formData();
    let user = {}
    for (const [key, value] of formData) {
        user = { ...user, [key]: value }
    }
    const response = getUser(user)
    if (response.error) {
        throw new Response(response.error)
    }
    else {
        return response;
    }
}