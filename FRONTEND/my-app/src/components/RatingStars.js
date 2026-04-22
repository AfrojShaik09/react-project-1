import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./RatingStars.css";

export default function RatingStars({
  rating = 0,
  onChange,
  clickable = false,
  size = "md",
  showLabel = false,
}) {
  const [hoverRating, setHoverRating] = React.useState(0);

  const displayRating = hoverRating || rating;

  const handleClick = (star) => {
    if (clickable && onChange) {
      onChange(star);
    }
  };

  const handleMouseEnter = (star) => {
    if (clickable) {
      setHoverRating(star);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const getRatingLabel = (value) => {
    if (value === 0) return "";
    if (value === 1) return "Poor";
    if (value === 2) return "Fair";
    if (value === 3) return "Good";
    if (value === 4) return "Very Good";
    if (value === 5) return "Excellent";
  };

  return (
    <div
      className={`rating-stars rating-${size} ${clickable ? "clickable" : ""}`}
    >
      <div className="stars-wrapper">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${star <= displayRating ? "active" : ""}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            title={`Rate ${star} star${star !== 1 ? "s" : ""}`}
            disabled={!clickable}
          >
            {star <= displayRating ? (
              <AiFillStar className="star-icon filled" />
            ) : (
              <AiOutlineStar className="star-icon" />
            )}
          </button>
        ))}
      </div>
      {showLabel && (
        <span className="rating-label">{getRatingLabel(rating)}</span>
      )}
    </div>
  );
}
