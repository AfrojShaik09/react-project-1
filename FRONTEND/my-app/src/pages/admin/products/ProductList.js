import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiFillStar,
  AiOutlineStar,
  AiFillLike,
  AiFillDislike,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { deleteProduct } from "../../../services/deleteProduct-service";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchProducts } from "../../../services/getProducts-service";
import SearchByName from "../../../components/searchByName";
import { useAuth } from "../../../components/AuthContext";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortAscending, setSortAscending] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [replies, setReplies] = useState({});
  const [searchResults, setSearchResults] = useState(null);
  const [cart, setCart] = useState([]);
  const {role} = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    console.log("Refresh button clicked");
    try {
      const productList = await fetchProducts();
      console.log("Fetched Products:", productList);
      if (productList) {
        setProducts(productList);
        console.log("State updated with products");
        setSearchResults(null);
        setCurrentPage(1);
      } else {
        console.error("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteProduct(id);

        if (response && response.updatedProducts) {
          setProducts(response.updatedProducts);
        } else {
          throw new Error("Invalid response from server.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product. Please try again.");
      }
    }
  };

  const renderProducts = searchResults || products;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = renderProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(renderProducts.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  const handleSortByDate = () => {
    const sortedProducts = [...products].sort((a, b) =>
      sortAscending
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );
    setProducts(sortedProducts);
    setSortAscending(!sortAscending);
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setComments([
      {
        user: "afroj",
        rating: 4,
        comment: "Great product!",
        likes: 5,
        dislikes: 2,
        replies: [],
      },
      {
        user: "shaik",
        rating: 5,
        comment: "Highly recommend!",
        likes: 3,
        dislikes: 7,
        replies: [],
      },
    ]);
    setShowModal(true);
  };

  const handleAddToCart = () => {
    if (!cart.some((item) => item.id === selectedProduct.id)) {
      setCart([...cart, selectedProduct]);
      setShowCartModal(true);
    } else {
      alert("Product is already in the cart!");
    }
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleLikeDislike = (index, type) => {
    const updatedComments = [...comments];
    if (type === "like") {
      updatedComments[index].likes += 1;
    } else if (type === "dislike") {
      updatedComments[index].dislikes += 1;
    }
    setComments(updatedComments);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      user: "Anyone",
      rating: newRating,
      comment: newComment,
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    setComments([...comments, newEntry]);
    setNewComment("");
    setNewRating(5);
  };

  const handleReplySubmit = (commentIndex, replyText) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.push({
      user: "Anyone",
      reply: replyText,
      likes: 0,
      dislikes: 0,
    });
    setComments(updatedComments);
    setReplies({
      ...replies,
      [commentIndex]: "",
    });
  };

  const renderRatingStars = (rating, setRating) => {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{ cursor: "pointer" }}
          >
            {star <= rating ? (
              <AiFillStar style={{ color: "gold" }} />
            ) : (
              <AiOutlineStar />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row mb-3">
        
        <div className="col-12 col-md-6 d-flex flex-wrap mb-2">
        {role === "admin" && <Link
            className="btn btn-primary mb-2 me-2"
            to="/admin/products/create"
            role="button"
          >
            Create Product
          </Link>
}
          <button
            type="button"
            className="btn btn-primary mb-2 me-2"
            onClick={loadProducts}
          >
            Refresh
          </button>
          <div className="col-12 col-md-6">
            <SearchByName setSearchResults={setSearchResults} />
          </div>
        </div>

        <div className="col-12 d-flex justify-content-end align-items-center">
          <AiOutlineShoppingCart
            size={30}
            className="cursor-pointer mt-1"
            onClick={() => setShowCartModal(true)}
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th className="d-none d-sm-table-cell">Name</th>
            <th className="d-none d-lg-table-cell">Brand</th>
            <th className="d-none d-lg-table-cell">Category</th>
            <th className="d-none d-lg-table-cell">Price</th>
            <th className="d-none d-lg-table-cell">
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={handleSortByDate}
              >
                Created At{" "}
                {sortAscending ? (
                  <i className="bi bi-arrow-up"></i>
                ) : (
                  <i className="bi bi-arrow-down"></i>
                )}
              </button>
            </th>
            <th>Image</th>
            {role === "admin" && <th>Action</th> }
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={index} onClick={() => handleRowClick(product)}>
              <td>{product.id}</td>
              <td className="d-none d-sm-table-cell">{product.name}</td>
              <td className="d-none d-lg-table-cell">{product.brand}</td>
              <td className="d-none d-lg-table-cell">{product.category}</td>
              <td className="d-none d-lg-table-cell">${product.price}</td>
              <td className="d-none d-lg-table-cell">
                {product.createdAt?.slice(0, 10)}
              </td>
              <td>
                <img
                  src={`/images/${product.imageFilename}`}
                  alt={product.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </td>
              {role === "admin" && <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <Link to={`/admin/products/edit/${product.id}`}>
                  <button type="button" className="btn btn-warning me-2">
                    Edit
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td> }
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {showModal && selectedProduct && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content rounded shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={`/images/${selectedProduct.imageFilename}`}
                    alt={selectedProduct.name}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                  <p>
                    <strong>Category:</strong> {selectedProduct.category}
                  </p>
                  <p>
                    <strong>Price:</strong> ${selectedProduct.price}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {selectedProduct.createdAt?.slice(0, 10)}
                  </p>
                  <p>{selectedProduct.description}</p>
                </div>
                <h5 className="mt-4">Ratings & Reviews</h5>
                <div className="mb-3">
                  <strong>Average Rating:</strong>{" "}
                  {[...Array(4)].map((_, i) => (
                    <AiFillStar key={i} style={{ color: "gold" }} />
                  ))}{" "}
                  ☆ (4.5)
                </div>
                <h6 className="mt-4">User Comments</h6>
                <div className="mb-3">
                  {comments.map((comment, idx) => (
                    <div key={idx} className="border rounded p-3 mb-3">
                      <p className="mb-1">
                        <strong>{comment.user}</strong>{" "}
                        <span className="text-muted small">
                          - {new Date().toLocaleDateString()}
                        </span>
                      </p>
                      <p className="mb-1">
                        Rating:{" "}
                        {[...Array(comment.rating)].map((_, i) => (
                          <AiFillStar key={i} style={{ color: "gold" }} />
                        ))}
                      </p>
                      <p className="mb-2">{comment.comment}</p>
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn btn-link text-decoration-none p-0 me-3"
                          onClick={() => handleLikeDislike(idx, "like")}
                          style={{
                            color: comment.likes > 0 ? "green" : "gray",
                          }}
                        >
                          <AiFillLike className="me-1" />
                          {comment.likes}
                        </button>
                        <button
                          type="button"
                          className="btn btn-link text-decoration-none p-0"
                          onClick={() => handleLikeDislike(idx, "dislike")}
                          style={{
                            color: comment.dislikes > 0 ? "red" : "gray",
                          }}
                        >
                          <AiFillDislike className="me-1" />
                          {comment.dislikes}
                        </button>
                      </div>
                      <div className="mt-3">
                        <h6>Replies:</h6>
                        {comment.replies.map((reply, replyIndex) => (
                          <div
                            key={replyIndex}
                            className="border rounded p-2 mb-2 bg-light"
                          >
                            <strong>{reply.user}</strong>: {reply.reply}
                          </div>
                        ))}
                        <div className="d-flex mt-2">
                          <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Reply..."
                            value={replies[idx] || ""}
                            onChange={(e) =>
                              setReplies({
                                ...replies,
                                [idx]: e.target.value,
                              })
                            }
                          />
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleReplySubmit(idx, replies[idx])}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleCommentSubmit}>
                  <div className="mb-3">
                    <label>Your Rating:</label>
                    {renderRatingStars(newRating, setNewRating)}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="comment" className="form-label">
                      Comment:
                    </label>
                    <textarea
                      id="comment"
                      className="form-control"
                      rows="3"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit Comment
                  </button>
                </form>
              </div>
              <div className="modal-footer bg-light">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddToCart()}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCartModal && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
            zIndex: 1050,
          }}
          onClick={() => setShowCartModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "500px", width: "90%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content"
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
              }}
            >
              <div
                className="modal-header"
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "15px 20px",
                  borderBottom: "2px solid #0056b3",
                }}
              >
                <h5 className="modal-title">Your Cart</h5>
                <button
                  type="button"
                  className="btn-close"
                  style={{
                    color: "#fff",
                    background: "transparent",
                    border: "none",
                    fontSize: "16px",
                  }}
                  onClick={() => setShowCartModal(false)}
                >
                  &times;
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  padding: "20px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  backgroundColor: "#f8f9fa",
                }}
              >
                {cart.length === 0 ? (
                  <p className="text-center text-muted">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-3"
                      style={{
                        borderBottom: "1px solid #e9ecef",
                        paddingBottom: "10px",
                      }}
                    >
                      <div>
                        <strong>{item.name}</strong> - ${item.price}
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div
                className="modal-footer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px 20px",
                  backgroundColor: "#e9ecef",
                }}
              >
                <div>
                  <strong>Total: </strong>$
                  {cart
                    .reduce((total, item) => total + item.price, 0)
                    .toFixed(2)}
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => setShowCartModal(false)}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-success">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
