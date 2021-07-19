const express = require('express')
const cors = require('cors')
const {
    randomBytes
} = require('crypto')
const axios = require('axios')

const app = express()
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => res.send(commentsByPostId[req.params.id] || []))

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { content } = req.body

    // if no list of comments associated with the post ID, create empty array
    const comments = commentsByPostId[req.params.id] || []

    comments.push({ id, content, status: 'pending' })

    commentsByPostId[req.params.id] = comments

    await axios.post('http://localhost:4005/events', {
        type: 'commentCreated',
        data: {
            id,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    console.log('Event comment received', req.body.type)
    const { type, data } = req.body

    if (type === 'commentModerated') {
        const { postId, id, status, content } = data

        // find the comment by id to update its status
        const comments = commentsByPostId[postId]
        const commentToUpdate = comments.find(comm => comm.id === id)
        commentToUpdate.status = status

        // emit that an update event occurred to EBus
        await axios.post('http://localhost:4005/events', {
            type: 'commentUpdated',
            data: {
                id,
                content,
                postId,
                status
            }
        })
    }

    res.send({ status: 'OK' })
})

app.listen(4001, () => console.log('Port 4001: Comments'))