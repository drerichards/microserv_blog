const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.post('/events', async (req, res) => {
    const {type, data} = req.body

    if (type === 'commentCreated') {
        // receives comment from data and updates status after moderation
        const status = data.content.includes('orange') ? 'rejected' : 'approved'

        // return data as event back to EBus to notify subscribed micros of status update
        await axios.post('http://localhost:4005/events', {
            type: 'commentModerated',
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status
            }
        })
    }
    // must send back response or request will hang
    res.send({ status: 'OK' })
})

app.listen(4003, () => console.log('Port 4003: Moderation'))