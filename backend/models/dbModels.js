class User {
    constructor(
        id,
        firstname,
        lastname,
        phone,
        email,
        address,
        postal,
        state
    ) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.phone = phone
        this.email = email
        this.address = address
        this.postal = postal
        this.state = state
    }
}

class Status {

    static Open = new Status(1, "Open")
    static Closed = new Status(2, "Closed")
    static Completed = new Status(3, "Completed")

    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

class Clothing {
    constructor(id, type) {
        this.id = id
        this.type = type
    }
}

module.exports = {
    User,
    Status,
    Clothing
}