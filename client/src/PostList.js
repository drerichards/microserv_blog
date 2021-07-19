/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react'
import CommentList from './CommentList'
import CommentCreate from './CommentCreate'
import axios from 'axios'

export default () => {
    const [posts, setPosts] = useState({})

    const getPosts = async () => {
        const { data } = await axios.get('http://localhost:4002/posts')
        setPosts(data)
    }

    // runs only once when component first displayed
    useEffect(() => {
        getPosts()
    }, [])

    const renderedPosts = Object.values(posts).map(
        post => (
            <div
                key={post.id}
                className="card"
                style={{ width: '30%', marginBottom: '20px' }}
            >
                <div className="card-body">
                    <h5 className="text-capitalize" style={{ fontSize: '1rem' }}>{post.title}</h5>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId ={post.id}/>
                </div>
            </div>
        )
    )

    return <>
        <div className='d-flex flex-row flex-wrap justify-content-between'>{renderedPosts}</div>
    </>
}
