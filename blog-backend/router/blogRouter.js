const express = require('express')
const router = express.Router()

//multer
const upload = require('../middleware/multer')

//controller
const { getAllblog, addblog, updateblog, deleteblog } = require('../Controller/blogController')
const { validateID } = require('../Controller/validateController')
const {  getPostImage } = require('../Controller/displayImageController')


//crud
router.route('/').get(getAllblog).delete(deleteblog)
router.route('/validate').post(validateID)

//image
router.get('/images/:fileName', getPostImage)
router.route('/toUpload/image').post(upload.single('blogImage'), addblog)
router.route('/').patch(upload.single('blogImage'), updateblog)

module.exports = router
