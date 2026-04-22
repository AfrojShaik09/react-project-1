import React, { useState } from "react";
import CommentsSection from "../components/CommentsSection";
import "./ProductModal.css";

export default function ProductModal({ product, cart, setCart, onClose }) {
  const [comments, setComments] = useState([
    {
      user: "afroj",
      rating: 4,
      comment: "Great product!",
      likes: 5,
      dislikes: 2,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [replies, setReplies] = useState({});

  const handleAddToCart = () => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, product]);
    } else {
      alert("Already in cart");
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          user: "You",
          rating: newRating,
          comment: newComment,
          likes: 0,
          dislikes: 0,
          replies: [],
        },
      ]);
      setNewComment("");
      setNewRating(5);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>

        <div className="modal-content">
          <div className="modal-left">
            <img src={`/images/${product.imageFilename}`} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p className="brand">{product.brand}</p>
              <p className="category">{product.category}</p>
              <p className="price">${product.price}</p>
              <button className="btn-add-cart" onClick={handleAddToCart}>
                <i className="bi bi-bag-plus"></i> Add to Cart
              </button>
            </div>
          </div>

          <div className="modal-right">
            <p className="description">{product.description}</p>
            <CommentsSection
              comments={comments}
              setComments={setComments}
              replies={replies}
              setReplies={setReplies}
              newComment={newComment}
              setNewComment={setNewComment}
              newRating={newRating}
              setNewRating={setNewRating}
              onSubmitComment={handleCommentSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
