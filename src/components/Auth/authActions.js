import { redirect } from "react-router-dom";
import { getUser, insertUser, loginUser } from "../../Storage/user";

//Signup action method
export async function signupAction({ request }) {
    const formData = await request.formData();
    let userData = {};
    for (const [key, value] of formData) {
        userData = { ...userData, [key]: value };
    }
    if (userData.password !== userData.confirmPassword)
        return { err: { password: "password does not match" } };
    else {
        const { email, password } = userData;
        const response = insertUser({ email, password });
        if (response.error) {
            return { err: { email: response.error } }
        } else {
            return response && (alert(response.success) || redirect("/"));
        }
    }
}

//Signin action method
export async function signinAction({ request }) {
    const formData = await request.formData();
    let user = {}
    for (const [key, value] of formData) {
        user = { ...user, [key]: value }
    }
    const response = getUser(user)
    if (response.error) {
        return { err: { email: response.error } }
    }
    else {
        loginUser(response.user.email, response.user.userId)
        return response;
    }
}