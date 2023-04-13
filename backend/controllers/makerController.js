const db = require('./dbController')

const list_jobs = async (req, res) => {
    const allJobs = await db.getAllJobs()

    res.send({
        'jobs' : allJobs
    })
}

const send_quotes = async (req, res) => {
    const body = req.body
    await db.createQuotes(
        body.makerId,
        body.jobId,
        body.price,
        body.comments
    ).then((result) => {

        // TODO: send notification to consumer's email

        res.send()
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
}

module.exports = {
    list_jobs,
    send_quotes
}