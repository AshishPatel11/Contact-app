const key = "users"
const login = "loggedIn"

//Insert new user
export function insertUser(user) {
    const userData = getUserData()
    user.userId = Date.now()
    if (isUnique(user.email)) {
        userData.push(user);
        localStorage.setItem(key, JSON.stringify(userData))
        return { success: "Registration Successful", user: user }
    }
    else
        return { error: "Email Already Exist!" }
}

//Fetch all user data
export function getUserData() {
    return JSON.parse(localStorage.getItem(key)) ?? []
}

//Login user
export function getUser(user) {
    const userData = getUserData();
    const userFound = userData.find(users => users.email === user.email && users.password === user.password)
    if (userFound) return { success: "Login successful", user: userFound }
    else return { error: "Invalid Credentials!" }
}

//Set User login session
export function loginUser(email, userId) {
    localStorage.setItem(login, JSON.stringify({ email: email, userId: userId }))
}

//Check user is unique or not
function isUnique(email) {
    const userData = getUserData()
    return !userData.find(user => user.email === email) ?? false;
}

//Get current user
export function currentUser() {
    return JSON.parse(localStorage.getItem(login)) ?? null
}

//Logout user
export function logoutUser() {
    localStorage.removeItem(login)
    return true
}