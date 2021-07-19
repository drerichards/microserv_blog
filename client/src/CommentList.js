import React from "react"

const CommentList = ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let content

    if (comment.status === 'approved') {
      content = comment.content
    }

    if (comment.status === 'pending') {
      content = <em>Comment awaiting approval</em>
    }

    if (comment.status === 'rejected') {
      content = <em>Comment not approved</em>
    }

    return <li style={{fontSize: '.85rem'}} key={comment.id}>{content}</li>
  })

  return <ul>{renderedComments}</ul>
}

export default CommentList
