
import { FaStar, FaTag, FaShoppingCart } from "react-icons/fa";
import "./ProductCard.css";

export default function ProductCard({ image, name, price, rating }) {
  return (
    <div className="card">
      <img className="card__image" src={image} alt={name} />

      <div className="card__body">
        <h2 className="card__name">{name}</h2>

        <p className="card__price">
          <FaTag /> ${price}
        </p>

        <p className="card__rating">
          <FaStar /> {rating}
        </p>

        <button className="card__button">
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}
