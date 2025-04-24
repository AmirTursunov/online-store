"use client";
import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="mt-5">
        <SignIn afterSignInUrl="/post-login" />
      </div>
    </div>
  );
};

export default Login;
