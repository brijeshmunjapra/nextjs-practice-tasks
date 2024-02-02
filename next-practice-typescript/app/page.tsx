"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { PostType } from "./types/types";

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [post, setPost] = useState<PostType>({
    id: 0,
    desc: "",
    isDone: false,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [postToBeEdit, setPostToBeEdit] = useState<PostType | null>(null);

  let lastId: number = posts[posts.length - 1]?.id
    ? Number(posts[posts.length - 1]?.id)
    : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPost({ id: lastId + 1, desc: e.target.value, isDone: false });
  };

  const handleAdd = () => {
    if (post.desc !== "") {
      setPosts([...posts, post]);
      setPost({ ...post, desc: "", isDone: false });
    }
  };

  const handleDelete = (id: number) => {
    const temp = posts.filter((post) => post.id !== id);
    setPosts([...temp]);
  };

  const selectEdit = (id: number) => {
    setIsEdit(true);
    const temp = posts.filter((post) => post.id === id)[0];
    setPostToBeEdit(temp);
    setPost(temp);
  };

  const handleEdit = () => {
    const updatedPosts = posts?.map((p) => {
      if (p.id === postToBeEdit?.id) {
        return { ...p, desc: post.desc };
      }
      return p;
    });
    setPosts(updatedPosts);
    setIsEdit(false);
    setPost({ ...post, desc: "", isDone: false });
  };

  return (
    <main className={styles.main}>
      <div>
        <input
          placeholder="Add your task"
          onChange={handleChange}
          value={post.desc}
        />
        {isEdit ? (
          <button onClick={handleEdit}>Edit</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
      <div>
        {posts.map((post, idx) => (
          <div key={post.id}>
            <p>
              <span>{idx + 1}. </span>
              <span> </span>
              {post.desc}
            </p>
            <p>{post.isDone ? "Done" : "Pending"}</p>
            <button onClick={() => handleDelete(post.id)}>Remove</button>
            <button
              onClick={() => {
                selectEdit(post.id);
                setIsEdit(true);
              }}
            >
              edit
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
