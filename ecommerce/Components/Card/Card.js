import { useEffect, useState } from "react";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import { addInCart, fetchCart } from "@/redux/slices/cartSlice";

const Card = ({ product }) => {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const addQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const removeQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    } else {
      setQty(0);
    }
  };

  const addToCart = (name, productId, qty) => {

    const userId = localStorage.getItem("userId");
    if (qty !== 0) {
      dispatch(addInCart({ name, productId, qty, userId }));
      setQty(0);
    }
  };
  return (
    <div className="card">
      <p className="card-title">{product.name}</p>
      <div className="card-desc">
        <p className="small-desc">{product.details}</p>
        <p className="small-desc">{product.price} $</p>
        <p className="small-desc">{product.category}</p>
      </div>
      <div className="card-buttons">
        {qty > 0?<div
          className="go-arrow"
          onClick={() => addToCart(product.name, product._id, qty)}
        >
          Add to Cart
        </div>:" "}

        <div className="qty_btn">
          <button onClick={addQty}> + </button>
          qty: {qty}
          {qty > 0? <button onClick={removeQty}> - </button>: ""}
        </div>
      </div>
    </div>
  );
};

export default Card;
