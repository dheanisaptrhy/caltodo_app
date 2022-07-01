const express = require('express')
const cors = require('cors')
const app = express()

const router = require('./src/routes')
const port = 3700

app.use(express.json())
app.use(cors())
app.use('/api/v1/', router)

app.listen(port, ()=> console.log(`Server run on port ${port}`))