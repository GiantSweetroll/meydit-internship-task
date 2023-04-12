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

module.exports = {
    User
}