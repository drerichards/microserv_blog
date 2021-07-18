const express = require('express')
const cors = require('cors')
const {
    randomBytes
} = require('crypto')

const app = express()

// makes sure to add bodyParser so that when sends back JSON data that 
// req.body can be parsed and shown correctly
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())

// stores every post created
const posts = {}

// gets all created posts
app.get('/posts', (req, res) => {
    // when a request for posts is made, send back posts object
    res.send(posts)
})

// creates new posts
app.post('/posts', (req, res) => {
    // created random ID of 4 bytes
    const id = randomBytes(4).toString('hex')
    const {
        title
    } = req.body

    // create KV in posts object. key will equal random ID
    posts[id] = {
        id,
        title
    }

    // send back server confirmation that a resource has been added
    // send back created post
    res.status(201).send(posts[id])
})

app.listen(4000, () => console.log('Port 4000'))