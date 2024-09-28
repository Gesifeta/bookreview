import { users } from '../data/usersdb.js'
import { books } from '../data/booksdb.js';

// check if user exists
export function userExists(email) {
    const doesExist = users.filter((user) => user.email === email)
    return doesExist.length > 0 ? true : false;
}
//check if book exists
export function bookExists(isbn) {
    const doesExist = Object.values(books).filter((book) => book.ISBN=== isbn)
    return doesExist.length > 0 ? true : false;
}

//authenticate user
export function authenticateUser(email, password) {
    const user = users.filter((user) => user.email === email && user.password === password)
    return user.length > 0 ? true : false;
}