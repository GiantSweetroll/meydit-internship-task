const dbController = require('../controllers/dbController')
const fs = require('fs')
const path = require('path');
const imageDir = './images'

const check_images_dir_exists = (jobId) => {
    const folderPath = path.join(imageDir, jobId.toString())
    fs.mkdirSync(folderPath, { recursive: true})

    return folderPath
}

const get_all_clothing_types = async (req, res) => {
    const result = await dbController.getAllClothingTypes()
        .catch((err) => {
            console.log(err)
            return res.sendStatus(500)
        })
    
    res.send({
        'clothingTypes' : result
    })
}

const get_all_status_types = async (req, res) => {
    const result = await dbController.getAllStatus()
        .catch((err) => {
            console.log(err)
            return res.sendStatus(500)
        })
    
    res.send({
        'statuses' : result
    })
}

const get_user = async (req, res) => {
    const userId = req.params.id

    const result = await dbController.getUserById(userId)
        .catch((err) => {
            console.log(err)
            return res.sendStatus(500)
        })

    const { hashedPassword, ...newResult } = result
    
    res.send({
        'user' : newResult
    })
}

const get_job_images = async (req, res) => {
    const jobId = req.params.id

    if (jobId === undefined || jobId === 'undefined') return res.status(400).send({
        status: 400,
        data: 'Job ID not specified'
    })

    // get image blobs from db
    const result = await dbController.getJobImages(jobId)

    // const folderPath = check_images_dir_exists(jobId)   // check if images directory exists

    // for (var i = 0; i < result.length; i++) {
    //     const base64 = Buffer.from( result[i].imgStr, 'binary' ).toString('base64')
    //     fs.writeFileSync(
    //         path.join(folderPath, `${i}.txt`),
    //         base64
    //         // 'base64'
    //     )
    // }

    // res.send('hello')

    // res.send({
    //     'images' : result.map((img) => {
    //         const base64 = Buffer.from( img.imgStr, 'binary' ).toString('base64')
    //         return {
    //         id: img.id,
    //         imgStr: base64
    //     }})
    // })

    res.send({
        'images' : result
    })

    // TODO: Clean up images
}

module.exports = {
    get_all_clothing_types,
    get_user,
    get_all_status_types,
    get_job_images
}