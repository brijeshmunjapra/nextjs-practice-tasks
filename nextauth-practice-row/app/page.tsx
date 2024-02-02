"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const session = useSession()
  useEffect(() => {

    console.log(session, "session")
    if(!session?.data){

      router.replace("/api/auth/signin");
    }

  }, [session]);

  return (
    <main>
      <h1>Login Page</h1>
      <Link href={"/api/auth/signin"}>
        <button>Log In</button>
      </Link>
    </main>
  );
}
