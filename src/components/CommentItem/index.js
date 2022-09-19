// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, initial, toggleLiked, onDeleteComment} = props
  const {
    id,
    isLiked,
    userName,
    comment,
    initialClassName,
    date,
  } = commentDetails

  const formattedDate = formatDistanceToNow(date)

  const onLiked = () => {
    toggleLiked(id)
  }

  const onDelete = () => {
    onDeleteComment(id)
  }

  const toggleLikeText = isLiked ? 'liked-name' : 'like-name'

  const toggleLikeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li>
      <div className="user-comment-container">
        <div className={`initial-container ${initialClassName}`}>
          <p className="initial">{initial}</p>
        </div>
        <div className="user-comment">
          <div className="user-and-time-container">
            <h1 className="user-name">{userName}</h1>
            <p className="comment-time">{formattedDate} ago</p>
          </div>
          <div>
            <p className="user-comment-des">{comment}</p>
          </div>
        </div>
      </div>
      <div className="like-del-container">
        <div className="like-container">
          <img
            src={toggleLikeImage}
            alt="like"
            className="like-img"
            onClick={onLiked}
          />
          <span className={`like-name ${toggleLikeText}`}>Like</span>
        </div>
        <button type="button" className="delete-btn" onClick={onDelete}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
      <hr className="separator-for-comment" />
    </li>
  )
}

export default CommentItem
