import React, { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if (content.length > 0) {

            await axios.post(
                `http://localhost:4001/posts/${postId}/comments`,
                { content }
            )
            setContent('')
        }
    }

    return <>
        <hr />
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <div class="input-group input-group-sm mb-3">
                    <input
                        value={content}
                        placeholder='New Comment'
                        onChange={e => setContent(e.target.value)}
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                    />
                </div>
            </div>
            <button className="btn btn-primary btn-sm">Submit</button>
        </form>
    </>
}

export default CommentCreate