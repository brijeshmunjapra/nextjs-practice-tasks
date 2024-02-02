"use client";
import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIndata, setLoggedIndata] = useState({});

  const handleLogin = () => {
    try {
      axios
        .post("http://localhost:3000/api/login", { username, password })
        .then((resp) => {
          setLoggedIndata(resp?.data);
          localStorage.setItem("token", resp?.data?.body?.token);
          if (resp?.status === 200) {
            // router.push("/pages/users");
            router.replace('/pages/users');
          }
        });
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', '/login');
        }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.inputLable}>
          Username
        </label>
        <input
          className={styles.login_input}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.inputLable}>
          Password
        </label>
        <input
          type="password"
          className={styles.login_input}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.loginButton} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
