const hostname = 'http://localhost:3000'

async function getClothingTypes() {
    return await fetch(
        hostname + '/queries/clothings', {
            method: 'GET'
        }
    ).then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
        return res.json()
    }).then((data) => data.clothingTypes)
}

async function getStatusTypes() {
    return await fetch(
        hostname + '/queries/statuses', {
            method: 'GET'
        }
    ).then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
        return res.json()
    }).then((data) => {
        return data.statuses
    })
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

async function getJobList() {
    return await fetch(
        hostname + '/maker/jobs', {
            method: 'GET'
        }
    ).then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
        return res.json()
    }).then((data) => data.jobs)
}

async function getUserData(id) {
    const result = await fetch(
        hostname + `/queries/user/${id}`, {
            method: 'GET'
        }
    ).then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
        return res.json()
    })

    return result.user
}

module.exports = {
    registerUser,
    postJob,
    getClothingTypes,
    getJobList,
    getUserData,
    getStatusTypes
}