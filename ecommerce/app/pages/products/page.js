"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/Components/Layout";
import withAuth from "@/app/withAuth";
import Card from "@/Components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";

const Products = () => {
  
  const products = useSelector((state)=>state?.products?.data)
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    } 
  }, []);

  return (
    <Layout>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gridGap: "5px",
        }}
      >
        {products?.map((product) => {
          return <Card product={product} key={product._id} />;
        })}
      </div>
    </Layout>
  );
};

export default withAuth(Products);
