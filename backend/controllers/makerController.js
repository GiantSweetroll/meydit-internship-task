const db = require('./dbController')
const mailer = require('./nodemailerController')

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
    ).then(async (result) => {

        res.send()

        const jobDetails = await db.getJobDetail(body.jobId)
        const userDetails = await db.getUserById(jobDetails.userId)

        await mailer.sendMail({
            from: '"Meyd.it" <no-reply@meydit.com>', // sender address
            to: `"${userDetails.email}"`, // list of receivers
            subject: "Quotations", // Subject line
            text: `Hello ${userDetails.firstname},\n\nHere are the quotations from the job you posted:\nPrice: A$${body.price}\nComments:\n${body.comments}`, // plain text body
        }).then((_) => {
            console.log(`Email sent to ${userDetails.email}`)
        }).catch(e => console.log(e))
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
}

module.exports = {
    list_jobs,
    send_quotes
}