import React, { useState } from "react";
import "./CartModal.css";

export default function CartModal({ cart, setCart, onClose }) {
  const [removingId, setRemovingId] = useState(null);

  const handleRemoveFromCart = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      setRemovingId(null);
    }, 200);
  };

  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const handleCheckout = () => {
    alert(
      `Proceeding to checkout with ${cart.length} item(s). Total: $${totalPrice}`,
    );
    // Add checkout logic here
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="cart-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="bi bi-bag"></i>
              <p>Your cart is empty</p>
              <span>Add items to get started</span>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`cart-item ${removingId === item.id ? "removing" : ""}`}
                >
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-brand">{item.brand}</p>
                    <p className="item-price">${item.price}</p>
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => handleRemoveFromCart(item.id)}
                    title="Remove from cart"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <div className="cart-actions">
              <button className="btn btn-primary" onClick={handleCheckout}>
                <i className="bi bi-credit-card"></i> Checkout
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </>
        )}

        {cart.length === 0 && (
          <div className="cart-footer-empty">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
