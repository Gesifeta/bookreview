import { users } from '../data/usersdb.js'

// check if user exists
export function userExists(email) {
    const doesExist = users.filter((user) => user.email === email)
    return doesExist.length > 0 ? true : false;
}

//authenticate user
export function authenticateUser(email, password) {
    const user = users.filter((user) => user.email === email && user.password === password)
    return user.length > 0 ? true : false;
}