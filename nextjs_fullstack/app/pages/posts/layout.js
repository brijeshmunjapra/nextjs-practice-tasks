"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function postsLayout({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      push("/");
      return;
    }

    setIsSuccess(true);
  }, [push]);

  if (!isSuccess) {
    return <p>Loading...</p>;
  }

  return <main>{children}</main>;
}
