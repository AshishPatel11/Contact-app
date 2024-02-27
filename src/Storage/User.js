const key = "users"
export function insertUser(user) {
    const userData = getUserData()
    if (isUnique(user.email)) {
        userData.push(user);
        localStorage.setItem(key, JSON.stringify(userData))
        return { success: "Registration Successfull" }
    }
    else
        return { error: "Email Already Exist!" }
}
export function getUserData() {
    return JSON.parse(localStorage.getItem(key)) ?? []
}

function isUnique(email) {
    const userData = getUserData()
    return !userData.find(user => user.email === email) ?? false;
}
export function getUser(user) {
    const userData = getUserData();
    const userFound = userData.find(users => users.email === user.email && users.password === user.password)
    if (userFound) return { success: "Login successfull", user: userFound }
    else return { error: "Invalid Credentials!" }
}