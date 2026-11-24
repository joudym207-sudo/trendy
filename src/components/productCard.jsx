import { useState } from "react";
import {
  FaStar,
  FaTag,
  FaShoppingCart,
  FaPercent,
  FaCheckCircle,
  FaBox,
  FaTags
} from "react-icons/fa";
import "./ProductCard.css";

export default function ProductCard({
  image,
  name,
  price,
  rating,
  discount,
  brand,
  availability,
  category
}) {
 
  const [showMore, setShowMore] = useState(false);

  return (
  <div className="card">

    {/* Discount percentage */}
    <span className="card__discount">
      <FaPercent /> {discount}% OFF
    </span>

    {/* Product image */}
    <img className="card__image" src={image} alt={name} />

    {/* Product information */}
    <div className="card__body">

      {/* Product name */}
      <h2 className="card__name">{name}</h2>

      {/* Product price */}
      <p className="card__price">
        <FaTag /> ${price}
      </p>

      {/* Product rating */}
      <p className="card__rating">
        <FaStar /> {rating}
      </p>

      {/* Read More / Read Less button */}
      <button
        className="card__read-more"
        onClick={() => setShowMore(!showMore)}
      >
        {/* Change button text depending on showMore state */}
        {showMore ? "Read Less" : "Read More"}
      </button>

      {/* Show extra information only when showMore is true */}
      {showMore && (
        <div className="card__extra-info">

          {/* Product brand */}
          <p className="card__brand">
            <FaCheckCircle /> {brand || "Unknown Brand"}
          </p>

          {/* Product category */}
          <p className="card__category">
            <FaTags /> {category}
          </p>

          {/* Product availability status */}
          <p className="card__availability">
            <FaBox /> {availability}
          </p>

        </div>
      )}

      {/* Add to Cart button */}
      <button className="card__button">
        <FaShoppingCart /> Add to Cart
      </button>

    </div>
  </div>
);
}