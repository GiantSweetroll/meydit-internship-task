const dbController = require('../controllers/dbController')

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

module.exports = {
    get_all_clothing_types,
    get_user,
    get_all_status_types
}