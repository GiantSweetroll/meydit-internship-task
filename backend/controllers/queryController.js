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

module.exports = {
    get_all_clothing_types
}