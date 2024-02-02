import { useState } from "react";
import styles from "../app/page.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addOperation,
  deleteOperation,
  updateOperation,
} from "@/redux/operationSlice";
import { RootState } from "@/utils/Types";

type Props = {};

function BasicOps({}: Props) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [post, setPost] = useState<string>("");
  const [itemTobeEdit, setItemToBeEdit] = useState<string>("");
  const data = useSelector((state: RootState) => state?.operations?.data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(updateOperation({ itemTobeEdit, post }));
    } else {
      if (post !== "") {
        dispatch(addOperation(post));
      }
    }
    setPost("");
    setIsEdit(false);
  };

  const handleDelete = (item: string) => {
    dispatch(deleteOperation(item));
  };

  const handleUpdate = (item: string) => {
    setIsEdit(true);
    setPost(item);
    setItemToBeEdit(item);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Add Post"
          type="text"
          onChange={handleChange}
          value={post}
        />
        {isEdit ? (
          <button type="submit">Edit</button>
        ) : (
          <button type="submit">Add</button>
        )}
      </form>
      <div className={styles.list}>
        {data.map((item) => {
          return (
            <li key={item} className={styles.li}>
              {item}
              <button onClick={() => handleDelete(item)}>Remove</button>
              <button onClick={() => handleUpdate(item)}>update</button>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default BasicOps;
