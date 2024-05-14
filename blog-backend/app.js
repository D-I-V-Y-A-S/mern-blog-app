require('dotenv').config()            //dev dependency 
const mongoose=require('mongoose')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500

const cors = require('cors')                               //cross origin resource sharing for accessing resource from another domain.
// app.use(cors({origin:'http://localhost:5173'}))
app.use(cors())
app.use(express.json())
const blogRouter = require('./router/blogRouter')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully'))

app.use('/api/v1/blogs', blogRouter)
app.use(express.urlencoded({extended:true}))
app.listen(PORT,console.log(`Server started running on http://localhost:${PORT}/api/v1/blogs`))

// 1.npm init -y
// 2.npm install express --save-dev nodemon --save-dev dotenv cors mongoose multer
// 3.package.json ->scripts->start:'nodemon app.js',
// 4.npm start