"use client"
import { useEffect, useState } from "react";

export default function ProductDetail({params}) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    async function fetchData() {
      if (params.PostId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.PostId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        }
      }
    }
    fetchData();
  }, [params.PostId]);
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Post Details</h1>
      <p>ID: {post.id}</p>
      <p>Title: {post.title}</p>
      <p>Body: {post.body}</p>
    </div>
  );
  }