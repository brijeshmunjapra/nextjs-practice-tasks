"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/app/Components/Layout";
import withAuth from "@/app/withAuth";
import { useRouter } from "next/navigation";
import Card from "@/app/Components/Card";
import styles from "../login/Login.module.css";

const Users = () => {
  const [data, setData] = useState([]);

  const router = useRouter();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((data) => setData(data?.data));
  }, []);

  const logoutClick = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };

  return (
    <Layout>
      <button onClick={logoutClick} className={styles.logoutButton}>
        LogOut
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gridGap: "5px",
        }}
      >
        {data?.map((user) => {
          return <Card user={user} key={user.id} />;
        })}
      </div>
    </Layout>
  );
};

export default withAuth(Users);
