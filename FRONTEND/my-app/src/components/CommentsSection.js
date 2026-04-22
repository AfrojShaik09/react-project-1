import React, { useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import RatingStars from "../components/RatingStars";
import Button from "../components/common/Button";
import "./CommentsSection.css";

export default function CommentsSection({
  comments,
  setComments,
  replies,
  setReplies,
  newComment,
  setNewComment,
  newRating,
  setNewRating,
  onSubmitComment,
}) {
  const [expandedReplies, setExpandedReplies] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);

  const handleLikeDislike = (index, type) => {
    const updated = [...comments];
    updated[index][type === "like" ? "likes" : "dislikes"] += 1;
    setComments(updated);
  };

  const handleReplySubmit = (index) => {
    if (!replies[index] || !replies[index].trim()) return;

    const updated = [...comments];
    updated[index].replies.push({
      user: "You",
      reply: replies[index],
      likes: 0,
      dislikes: 0,
    });

    setComments(updated);
    setReplies({ ...replies, [index]: "" });
    setReplyingTo(null);
  };

  return (
    <div className="comments-section">
      <h4>Comments ({comments.length})</h4>

      <div className="comments-list">
        {comments.map((comment, idx) => (
          <div key={idx} className="comment-item">
            <div className="comment-header">
              <strong>{comment.user}</strong>
              <RatingStars rating={comment.rating} size="sm" />
            </div>

            <p className="comment-text">{comment.comment}</p>

            <div className="comment-footer">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLikeDislike(idx, "like")}
              >
                <AiFillLike /> {comment.likes}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLikeDislike(idx, "dislike")}
              >
                <AiFillDislike /> {comment.dislikes}
              </Button>

              {comment.replies.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setExpandedReplies({
                      ...expandedReplies,
                      [idx]: !expandedReplies[idx],
                    })
                  }
                >
                  {expandedReplies[idx] ? "Hide" : "Show"} (
                  {comment.replies.length})
                </Button>
              )}

              {replyingTo !== idx && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReplyingTo(idx)}
                >
                  Reply
                </Button>
              )}
            </div>

            {expandedReplies[idx] && (
              <div className="replies">
                {comment.replies.map((reply, i) => (
                  <div key={i} className="reply">
                    <strong>{reply.user}:</strong> {reply.reply}
                  </div>
                ))}
              </div>
            )}

            {replyingTo === idx && (
              <div className="reply-form-inline">
                <input
                  type="text"
                  placeholder="Write reply..."
                  value={replies[idx] || ""}
                  onChange={(e) =>
                    setReplies({ ...replies, [idx]: e.target.value })
                  }
                  autoFocus
                />
                <div className="reply-actions">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleReplySubmit(idx)}
                    disabled={!replies[idx] || !replies[idx].trim()}
                  >
                    Send
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplies({ ...replies, [idx]: "" });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmitComment} className="new-comment">
        <label>Your Rating</label>
        <RatingStars
          rating={newRating}
          onChange={setNewRating}
          clickable
          size="lg"
          showLabel
        />

        <textarea
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
          maxLength="500"
        />

        <div className="form-footer">
          <span>{newComment.length}/500</span>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!newComment.trim()}
          >
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
}
