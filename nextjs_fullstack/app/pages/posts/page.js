
"use client"
import React from "react";
import Layout from "@/app/Components/Layout";
import withAuth from "@/app/withAuth";

const Posts = () => {
  return (
    <Layout>
      <div>Posts</div>
    </Layout>
  );
};

export default withAuth(Posts);
