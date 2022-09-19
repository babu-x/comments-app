import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    userName: '',
    comment: '',
    commentsList: [],
    initialClassName: '',
    date: '',
  }

  onSubmitComment = event => {
    event.preventDefault()
    const {userName, comment} = this.state
    const randomBgColor =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]

    const newComment = {
      id: uuidv4(),
      userName,
      comment,
      isLiked: false,
      initialClassName: randomBgColor,
      date: new Date(),
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      comment: '',
      userName: '',
    }))
  }

  toggleLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const filteredComments = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredComments})
  }

  getUserName = event => {
    this.setState({userName: event.target.value})
  }

  getUserComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {userName, commentsList, comment} = this.state
    const commentsCount = commentsList.length
    return (
      <div className="comments-app">
        <div className="app-container">
          <div className="comments-section">
            <h1 className="heading">Comments</h1>
            <form
              className="form-control"
              onSubmit={this.onSubmitComment}
              onClick={this.addBgColor}
            >
              <p className="heading-des">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                placeholder="Your Name"
                className="input-name"
                onChange={this.getUserName}
                value={userName}
              />
              <div className="textarea-container">
                <textarea
                  rows="7"
                  placeholder="Your Comment"
                  className="textarea-comment"
                  onChange={this.getUserComment}
                  value={comment}
                />
              </div>
              <button type="submit" className="comment-btn">
                Add Comment
              </button>
            </form>
          </div>
          <div className="comments-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-img"
            />
          </div>
        </div>
        <hr className="separator" />
        <div className="comments-counter">
          <button type="button" className="count-comment-btn">
            {commentsCount}
          </button>
          <p className="count-des">Comments</p>
        </div>

        <ul className="ul-container">
          {commentsList.map(eachComment => (
            <CommentItem
              commentDetails={eachComment}
              key={eachComment.id}
              initial={eachComment.userName.slice(0, 1).toUpperCase()}
              toggleLiked={this.toggleLiked}
              onDeleteComment={this.onDeleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
