"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function PostLogin() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const email = user.emailAddresses[0]?.emailAddress;
      if (email === "amir@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [isLoaded, user, router]);

  return <p className="text-center mt-10">Redirecting...</p>;
}
