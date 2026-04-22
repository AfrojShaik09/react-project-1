import React from "react";
import "./Button.css";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
  size = "md",
  loading = false,
  icon = null,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {loading ? (
        <>
          <span className="spinner-small"></span>
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && <i className={`bi bi-${icon}`}></i>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
