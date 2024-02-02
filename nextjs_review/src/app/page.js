
'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    }
    fetchData();
  }, []);


  return (
    <div>
    <h1>List of Posts</h1>
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/${post.id}`}>
            
              {post.id}: {post.title}
            
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
}
