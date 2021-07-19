const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body

    // receives data from EBus and decides what to 
    // do with it depending on the event type
    if (type === 'postCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }

    if (type === 'commentCreated') {
        // when new commentCreated event, pass the comment 
        // to Query micro so that it can immed show moderation status
        const { id, content, postId, status } = data
        const post = posts[postId]
        post.comments.push({ id, content, status, postId })
    }

    if (type === 'commentUpdated') {
        const {id, content, postId, status} = data
        const post = posts[postId]
        const commentToUpdate = post.comments.find(comm => comm.id === id)
        commentToUpdate.status = status
        commentToUpdate.content = content
    }

    res.send({ status: 'OK' })
})

app.listen(4002, () => console.log('Port 4002: Query'))