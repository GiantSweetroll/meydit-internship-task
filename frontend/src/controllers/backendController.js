const hostname = 'http://localhost:3000'

async function getClothingTypes() {
    const result = await fetch(
        hostname + '/queries/clothings', {
            method: 'GET'
        }
    ).then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
        return res.json()
    })

    return result.clothingTypes
}

async function registerUser(user) {
    const result = await fetch(
        hostname + '/auth/register', {
            method: 'POST',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(user)
        }
    ).then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
        return res.json()
    }).catch((err) => {throw err})

    return result
}

async function postJob(job) {
    await fetch(
        hostname + '/consumer/job', {
            method: 'POST',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(job)
        }
    )
    .then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
    })
    .catch((err) => {throw err})
}

module.exports = {
    registerUser,
    postJob,
    getClothingTypes
}