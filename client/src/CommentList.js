import React from "react"

const CommentList = ({ comments }) => {
  const renderedComments = comments.map(comment => {
    return <li style={{fontSize: '.85rem'}} key={comment.id}>{comment.content}</li>
  })

  return <ul>{renderedComments}</ul>
}

export default CommentList
