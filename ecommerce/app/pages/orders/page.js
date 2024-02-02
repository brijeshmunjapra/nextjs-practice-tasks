"use client";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  let userId;
  const dispatch = useDispatch();

  const orders = useSelector((state) => state?.order?.data);
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(fetchOrders({ userId }));
    }
  }, []);
  return (
    <div>
      {orders?.map((order) => {
        return <div key={order?._id}>{order?.totalPrice}</div>;
      })}
    </div>
  );
};

export default Orders;
