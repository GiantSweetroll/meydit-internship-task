const db = require('./dbController')

const post_job = async (req, res) => {
    const body = req.body

    await db.postJob(body)
        .then((result) => {
            res.send()
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
}

module.exports = {
    post_job
}