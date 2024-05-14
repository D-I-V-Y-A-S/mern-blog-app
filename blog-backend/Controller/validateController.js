const data = require('../Data/blogData')
const blogModel = require('../Model/blogModel')

const validateID = async (request, response) => {

    try {
        const givenID = request.body.ID
        const matchingblog = await blogModel.findOne({ blogID: givenID })
        if (matchingblog) {
            return response.status(200).json(matchingblog)
        }
        else {
            return response.status(404).send({ message: "Invalid blog Number" })
        }
    }
    catch (error) {
        return response.status(409).send({ message: error.message })
    }
}

module.exports = { validateID }