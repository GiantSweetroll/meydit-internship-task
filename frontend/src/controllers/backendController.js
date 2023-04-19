const hostname = 'https://meydit-assignment-wq3yki57wq-ts.a.run.app'
// const hostname = 'http://localhost:3000'

export async function getClothingTypes() {
    return await fetch(
        hostname + '/queries/clothings', {
            method: 'GET'
        }
    ).then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
        return res.json()
    }).then((data) => data.clothingTypes)
}

export async function getStatusTypes() {
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

export async function registerUser(user) {
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

export async function postJob(job) {
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

export async function getJobList() {
    return await fetch(
        hostname + '/maker/jobs', {
            method: 'GET'
        }
    ).then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
        return res.json()
    }).then((data) => data.jobs)
}

export async function getUserData(id) {
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

export async function getJobImages(jobId) {
    const result = await fetch(
        hostname + `/queries/job-images/${jobId}`
    ).then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
        return res.json()
    })
    return result.images
}

export async function sendQuote(quote) {
    await fetch(
        hostname + '/maker/send-quotes', {
            method: 'POST',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(quote)
        }
    )
    .then((res) => {
        if (res.status !== 201 && res.status !== 200) throw new Error(`Error ${res.status}`)
    })
    .catch((err) => {throw err})
}