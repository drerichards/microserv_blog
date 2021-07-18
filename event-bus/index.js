const express = require('express')
const cors = require('cors')
const {
    randomBytes
} = require('crypto')

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())

