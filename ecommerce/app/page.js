"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, null, window.location.href);
    };
  }, []);
  return <main className={styles.main}>
    <h1>Please login...</h1>
  </main>;
}
