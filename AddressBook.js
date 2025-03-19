class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        if (!firstName || !lastName || !email) {
            throw new Error("First name, last name, and email are required.");
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


class AddressBook {
    constructor() {
        this.contacts = []; // Store contacts in an array
    }

    
}


