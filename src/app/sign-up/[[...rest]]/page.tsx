"use client";

import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const SignUpPage = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const email = user?.emailAddresses[0]?.emailAddress;
      if (email === "amirtursunov2@gmail.com") {
        redirect("/admin");
      }
    }
  }, [isLoaded, user]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <SignUp afterSignUpUrl="/" />
    </div>
  );
};

export default SignUpPage;
