import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {
    const [title, setTitle] = useState('')
    const onSubmit = async (e) => {
        // prevents browsers default method of form submission
        e.preventDefault()
        if (title.length > 0) {
            // create Promise for post title action
            await axios.post(
                'http://localhost:4000/posts',
                { title }
            )
            // reset input and confirms action occurred
            setTitle('')
        }
    }

    return <>
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        className="form-control my-2" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
}

export default PostCreate