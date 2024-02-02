"use client";

import {
  decreaseQty,
  deleteFromCart,
  emptyTheCart,
  fetchCart,
  increaseQty,
} from "@/redux/slices/cartSlice";
import { useEffect, useState } from "react";
import withAuth from "@/app/withAuth";
import { useDispatch, useSelector } from "react-redux";
import "../../../Components/Card/Card.css";
import Layout from "@/Components/Layout";
import Modal from "@mui/material/Modal";
import { createOrder } from "@/redux/slices/orderSlice";
import { useRouter } from "next/navigation";

const Cart = () => {
  let userId;
  const dispatch = useDispatch();
  const router = useRouter();
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cartDetails = useSelector((state) => state?.cart?.data);
  const isOrderCreated = useSelector((state) => state?.order?.isOrderCreated);
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(fetchCart({ userId }));
    }
    setReload(false);
  }, [reload]);

  useEffect(() => {
    if (isOrderCreated) {
      dispatch(emptyTheCart({ userId }));
    }
  }, [isOrderCreated]);

  const removeFromCart = (productId) => {
    dispatch(deleteFromCart({ productId }));
    setReload(true);
  };

  const incerQty = (productId) => {
    dispatch(increaseQty({ productId }));
    setReload(true);
    dispatch(fetchCart({ userId }));
  };

  const decreQty = (productId, qty) => {
    if (qty === 1) {
      dispatch(deleteFromCart({ productId }));
    } else {
      dispatch(decreaseQty({ productId }));
    }
    setReload(true);
    dispatch(fetchCart({ userId }));
  };

  const totalPrice = () => {
    let sum = 0;

    for (const item of cartDetails || []) {
      sum += Number(item?.price) * Number(item?.qty);
    }
    return sum;
  };

  const generateOrder = () => {
    dispatch(
      createOrder({ userId, items: cartDetails, totalPrice: totalPrice() })
    );
    setOpen(false);
  };

  return (
    <Layout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gridGap: "5px",
        }}
      >
        {cartDetails?.map((product) => (
          <div className="card-cart" key={product.name}>
            <p className="card-title">{product.name}</p>
            <p className="small-desc">{product.details}</p>
            <p className="small-desc">{product.price}</p>
            <p className="small-desc">{product.category}</p>
            <div className="qty_btn">
              <button onClick={() => incerQty(product._id)}> + </button>
              {product.qty}
              <button onClick={() => decreQty(product._id, product.qty)}>
                {" "}
                -{" "}
              </button>
            </div>
            <button
              className="remove-item"
              onClick={() => removeFromCart(product?._id)}
            >
              Remove Item
            </button>
          </div>
        ))}
      </div>
      <div className="price-details">
        <h2>Price Details</h2>
        {cartDetails?.map((product) => {
          return (
            <div className="product-price" key={product?._id}>
              <span>{product?.name}</span>
              <span>
                {product?.price} X {product?.qty} ={" "}
                {product?.price * product?.qty} $
              </span>
            </div>
          );
        })}
        <div className="product-price">
          <span>Total</span>
          <span>{totalPrice()} $</span>
        </div>

        <button onClick={handleOpen}>Checkout</button>
        <Modal open={open}>
          <div className="payment-modal">
            <h1>Checkout Page</h1>
            <div>
              <p>Payment Options</p>
            </div>
            <button onClick={generateOrder}>Pay</button>
            <button onClick={handleClose}>Discart</button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default withAuth(Cart);
