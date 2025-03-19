// const Validator = require("./Validator"); // Import the Validator class

class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        // Validate First and Last Name
        if (!Validator.isValidName(firstName)) {
            throw new Error("Invalid First Name: Must start with a capital letter and be at least 3 characters long.");
        }
        if (!Validator.isValidName(lastName)) {
            throw new Error("Invalid Last Name: Must start with a capital letter and be at least 3 characters long.");
        }

        // Validate Address, City, and State (minimum 4 characters)
        if (!Validator.isValidAddress(address)) {
            throw new Error("Invalid Address: Must be at least 4 characters long.");
        }
        if (!Validator.isValidAddress(city)) {
            throw new Error("Invalid City: Must be at least 4 characters long.");
        }
        if (!Validator.isValidAddress(state)) {
            throw new Error("Invalid State: Must be at least 4 characters long.");
        }

        // Validate Zip Code (5 or 6 digits)
        if (!Validator.isValidZip(zip)) {
            throw new Error("Invalid Zip Code: Must be 5 or 6 digits.");
        }

        // Validate Phone Number (10 digits)
        if (!Validator.isValidPhone(phoneNumber)) {
            throw new Error("Invalid Phone Number: Must be exactly 10 digits.");
        }

        // Validate Email
        if (!Validator.isValidEmail(email)) {
            throw new Error("Invalid Email Address: Must be in a valid format.");
        }

        // If all validations pass, set the values
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
// const Contact = require("./Contact"); // Import the Contact class


class AddressBook {
    constructor() {
        this.contacts = []; // Initialize an empty contacts array
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

     // Add a new contact after checking for duplicates
     addContact(contact) {
        if (!(contact instanceof Contact)) {
            throw new Error("Invalid contact object.");
        }

        // Check for duplicate using filter()
        const duplicateContacts = this.contacts.filter(
            (c) => c.firstName.toLowerCase() === contact.firstName.toLowerCase() &&
                   c.lastName.toLowerCase() === contact.lastName.toLowerCase()
        );

        if (duplicateContacts.length > 0) {
            throw new Error(`Duplicate contact found: ${contact.firstName} ${contact.lastName}`);
        }

        this.contacts.push(contact);
        console.log("Contact added successfully.");
    }

    // List all contacts
    listContacts() {
        return this.contacts;
    }

    // Find contact by first name or last name
    findContactByName(name) {
        const contact = this.contacts.find(
            (contact) => contact.firstName.toLowerCase() === name.toLowerCase() || contact.lastName.toLowerCase() === name.toLowerCase()
        );
        if (!contact) {
            throw new Error(`No contact found with name: ${name}`);
        }
        return contact;
    }

    // Edit an existing contact's details
    editContact(name, newContactDetails) {
        const contact = this.findContactByName(name); // Find the contact by name
        if (contact) {
            // Update the contact's properties with the new values
            contact.firstName = newContactDetails.firstName || contact.firstName;
            contact.lastName = newContactDetails.lastName || contact.lastName;
            contact.address = newContactDetails.address || contact.address;
            contact.city = newContactDetails.city || contact.city;
            contact.state = newContactDetails.state || contact.state;
            contact.zip = newContactDetails.zip || contact.zip;
            contact.phoneNumber = newContactDetails.phoneNumber || contact.phoneNumber;
            contact.email = newContactDetails.email || contact.email;
            console.log("Contact updated successfully.");
        }
    }

    // Delete a contact by name (first or last name)
    deleteContactByName(name) {
        const index = this.contacts.findIndex(
            (contact) => contact.firstName.toLowerCase() === name.toLowerCase() || contact.lastName.toLowerCase() === name.toLowerCase()
        );
        if (index === -1) {
            throw new Error(`No contact found with name: ${name}`);
        }
        this.contacts.splice(index, 1); // Remove the contact at the found index
        console.log(`Contact with name ${name} deleted successfully.`);
    }

    // Find people by City
    findContactsByCity(city) {
        const contactsInCity = this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());

        // Map to get only names
        const names = contactsInCity.map(contact => `${contact.firstName} ${contact.lastName}`);

        // Reduce to get count
        const count = contactsInCity.reduce(count => count + 1, 0);

        return { names, count };
    }

    // Find people by State
    findContactsByState(state) {
        const contactsInState = this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase());

        // Map to get only names
        const names = contactsInState.map(contact => `${contact.firstName} ${contact.lastName}`);

        // Reduce to get count
        const count = contactsInState.reduce(count => count + 1, 0);

        return { names, count };
    }

    // Get the count of contacts using Reduce function
    getContactCount() {
        return this.contacts.reduce((count, contact) => count + 1, 0); // Count each contact
    }
}

module.exports = AddressBook;


//Validations
class Validator {
    static isValidName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name); // Starts with capital, min 3 chars
    }

    static isValidAddress(value) {
        return /^[a-zA-Z0-9\s]{2,}$/.test(value); // Min 4 chars (alphanumeric & space allowed)
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



//For testing
// const Contact = require("./Contact");
// const AddressBook = require("./AddressBook");


try {
    const myAddressBook = new AddressBook();

    // Adding some contacts
    myAddressBook.addContact(new Contact("John", "Doe", "123 Main St", "New York", "NY", "10001", "9876543210", "john@example.com"));
    myAddressBook.addContact(new Contact("Alice", "Smith", "456 Elm St", "Los Angeles", "CA", "90001", "1234567890", "alice@example.com"));
    myAddressBook.addContact(new Contact("Bob", "Johnson", "789 Oak St", "New York", "NY", "10002", "2345678901", "bob@example.com"));

    // Search by City
    const citySearch = myAddressBook.findContactsByCity("New York");
    console.log(`Contacts in New York: ${citySearch.names.join(", ")} (Total: ${citySearch.count})`);

    // Search by State
    const stateSearch = myAddressBook.findContactsByState("CA");
    console.log(`Contacts in California: ${stateSearch.names.join(", ")} (Total: ${stateSearch.count})`);

} catch (error) {
    console.error("Error:", error.message);
}
