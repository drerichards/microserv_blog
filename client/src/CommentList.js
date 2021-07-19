import React, { useState, useEffect } from "react"
import axios from "axios"

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([])

  const fetchData = async () => {
    const {data} = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    )
    setComments(data)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderedComments = comments.map(comment => {
    return <li key={comment.id}>{comment.content}</li>
  })

  return <ul>{renderedComments}</ul>
}

export default CommentList