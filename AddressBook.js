const Validator = require("./validations");

class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        if (!Validator.isValidName(firstName)) {
            throw new Error("Invalid First Name: Must start with capital & have at least 3 characters.");
        }
        if (!Validator.isValidName(lastName)) {
            throw new Error("Invalid Last Name: Must start with capital & have at least 3 characters.");
        }
        if (!Validator.isValidAddress(address)) {
            throw new Error("Invalid Address: Must be at least 4 characters.");
        }
        if (!Validator.isValidAddress(city)) {
            throw new Error("Invalid City: Must be at least 4 characters.");
        }
        if (!Validator.isValidAddress(state)) {
            throw new Error("Invalid State: Must be at least 4 characters.");
        }
        if (!Validator.isValidZip(zip)) {
            throw new Error("Invalid Zip Code: Must be 5 or 6 digits.");
        }
        if (!Validator.isValidPhone(phoneNumber)) {
            throw new Error("Invalid Phone Number: Must be exactly 10 digits.");
        }
        if (!Validator.isValidEmail(email)) {
            throw new Error("Invalid Email Address: Must be in correct format.");
        }

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

module.exports = Contact;

//AddressBook
const Contact = require('./Contact'); // Assuming Contact class is in Contact.js

class AddressBook {
    constructor() {
        this.contacts = []; // Initializes an empty contacts array
    }

    // Create a new Address Book (reset the contacts array)
    createNewAddressBook() {
        this.contacts = []; // Clear the existing contacts
        console.log("New Address Book created successfully.");
    }

    // Add a new contact
    addContact(contact) {
        if (!(contact instanceof Contact)) {
            throw new Error("Invalid contact object.");
        }
        this.contacts.push(contact);
        console.log("Contact added successfully.");
    }

    // List all contacts
    listContacts() {
        return this.contacts;
    }
}

module.exports = AddressBook;

//Validations
class Validator {
    static isValidName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name); // Starts with capital, min 3 chars
    }

    static isValidAddress(value) {
        return /^[a-zA-Z0-9\s]{4,}$/.test(value); // Min 4 chars (alphanumeric & space allowed)
    }

    static isValidZip(zip) {
        return /^\d{5,6}$/.test(zip); // 5 or 6 digit zip code
    }

    static isValidPhone(phone) {
        return /^\d{10}$/.test(phone); // 10 digit phone number
    }

    static isValidEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email); // Standard email pattern
    }
}

module.exports = Validator;