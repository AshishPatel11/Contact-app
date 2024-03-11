import { redirect } from "react-router-dom";
import { getUser, insertUser, loginUser } from "../../Storage/user";
import { toast } from "react-toastify";

//Signup action method
export async function signupAction({ request }) {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData.entries())

    if (userData.password !== userData.confirmPassword)
        return { err: { password: "password does not match" } };
    else {
        const { email, password } = userData;
        const response = insertUser({ email, password });
        if (response.error) {
            return { err: { email: response.error } }
        } else {
            return response && (toast.success(response.success) && redirect("/"));
        }
    }
}