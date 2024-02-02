"use client";
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "@/redux/slices/authSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginState = useSelector((state) => state?.auth?.data);

  useEffect(() => {
    if (loginState?.token) {
      router.replace("/pages/products");
    }
  }, [loginState]);

  const handleLogin = () => {
    dispatch(loginAction({ username, password }));
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
