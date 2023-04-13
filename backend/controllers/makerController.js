const db = require('./dbController')

const list_jobs = async (req, res) => {
    const allJobs = await db.getAllJobs()

    // group result based on id (job id)
    const filteredJobs = {}

    allJobs.map((job, index) => {
        const id = job.id
        if (id in filteredJobs) {
            // append image
            filteredJobs[id].images = [
                ...filteredJobs[id].images,
                job.imgStr
            ]
        } else {
            // add to filteredJobs dictionary
            const {imgStr, ...obj} = job
            const images = imgStr === null? [] : [imgStr]
            filteredJobs[id] = {
                ...obj,
                images: images
            }
        }
    })

    res.send({
        'jobs' : Object.values(filteredJobs)
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