"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/redux/slices/cartSlice";
import { logoutAction } from "@/redux/slices/authSlice";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  let userId;
  let userName;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
    userName = localStorage.getItem("userName");
  }

  const cartDetails = useSelector((state) => state?.cart?.data);
  const isProductAdded = useSelector((state) => state?.cart?.isProductAdded);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, [pathname]);

  useEffect(() => {
    dispatch(fetchCart({ userId }));
  }, [isProductAdded]);

  const logoutClick = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      dispatch(logoutAction());
      router.replace("/");
    }
  };

  return (
    <div className="navbar_main">
      <h1>Ecommerce Demo</h1>
      <div className="navbar_right">
        {!token && (
          <Link href={"/pages/login"}>
            <button>Login</button>
          </Link>
        )}
        {token && (
          <>
              <p>Welcome, {userName}!</p>
            <Link href={"/pages/cart"}>
              <Badge
                badgeContent={cartDetails.length ? cartDetails.length : "!"}
                color="secondary"
                sx={{ marginLeft: "20px", marginRight: "20px" }}
              >
                <ShoppingCartIcon />
              </Badge>
            </Link>
            <Link href={"/pages/orders"}>
             <button>Your Orders</button>
             </Link>
            <button onClick={logoutClick}>LogOut</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
