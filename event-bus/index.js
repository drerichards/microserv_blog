const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.post('/events', (req, res) => {
    const event = req.body
    // receives data and passes it to Posts, Comments, Query micros which
    // are listening on the '/events' route
    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)

    res.send({status: 'OK'})
})

app.listen(4005, () => console.log('Port 4005: EBus'))