"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import {
  addPost,
  deletePost,
  fetchPosts,
  updatePost,
} from "@/redux/operationSlice";
import { useAppDispatch } from "@/redux/store";
import { Triangle } from "react-loader-spinner";
import { ApiDataStateType, RootState } from "../utils/Types";

export default function Home() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({
    post: "",
  });
  const [reload, setReload] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataTobeEdit, setDataTobeEdit] = useState<ApiDataStateType | null>(
    null
  );
  const apidata = useSelector((state: RootState) => state?.operations?.apiData);
  const isLoading = useSelector(
    (state: RootState) => state?.operations?.isLoading
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (reload) {
      dispatch(fetchPosts());
      setReload(false);
    }
  }, [reload]);

  const handleAPIdelete = (id: string) => {
    dispatch(deletePost(id));
    setReload(true);
  };

  const handleAddPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit && dataTobeEdit) {
      dispatch(updatePost({ id: dataTobeEdit._id, data: input }));
      setIsEdit(false);
    } else {
      dispatch(addPost(input));
    }
    setInput({
      post: "",
    });

    setReload(true);
  };

  const handleEdit = (item: ApiDataStateType) => {
    setIsEdit(true);
    setDataTobeEdit(item);
    setInput({ ...input, post: item.post });
  };

  return (
    <main className={styles.main}>
      <form onSubmit={(e) => handleAddPost(e)} className={styles.form}>
        <input
          type="text"
          placeholder="Type your post"
          onChange={(e) => setInput({ ...input, post: e.target.value })}
          value={input.post}
          required
        />
        <button type="submit">{isEdit ? "Edit" : "Add"}</button>
      </form>
      <div className={styles.list}>
        {isLoading ? (
          <Triangle
            height="100"
            width="100"
            color="rgb(82, 160, 82)"
            ariaLabel="triangle-loading"
            visible={true}
          />
        ) : (
          apidata?.map((item: ApiDataStateType, idx: number) => {
            return (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  borderBottom: "1px solid gray",
                }}
              >
                <p>
                  {idx + 1}. {item.post}
                </p>
                <div>
                  <button
                    style={{ height: "20px", marginRight: "10px" }}
                    onClick={() => handleAPIdelete(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{ height: "20px" }}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
