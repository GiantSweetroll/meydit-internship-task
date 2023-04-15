const hostname = 'http://localhost:3000'

async function getClothingTypes() {
    const result = await fetch(
        hostname + '/queries/clothings', {
            method: 'GET'
        }
    ).then(res => res.json())

    return result.clothingTypes
}

async function registerUser(user) {
    await fetch(
        hostname + '/auth/register', {
            method: 'POST',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(user)
        }
    )
}

async function postJob(job) {
    await fetch(
        hostname + '/consumer/job', {
            method: 'POST',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(job)
        }
    )
}

module.exports = {
    registerUser,
    postJob,
    getClothingTypes
}