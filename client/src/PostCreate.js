/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react'
import axios from 'axios'

export default () => {
    const [title, setTitle] = useState('')
    const onSubmit = async (e) => {
        // prevents browsers default method of form submission
        e.preventDefault()

        // create Promise for post title action and store result in var
        const res = await axios.post(
            'http://localhost:4000/posts',
            { title }
        )
        // reset input and confirms action occurred
        setTitle('')
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
                        className="form-control" />
                </div>
                <button className="btn-primary">Submit</button>
            </form>
        </div>
    </>
}