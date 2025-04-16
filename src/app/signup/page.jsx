"use client";

import { supabase } from "@/utils/supabase/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert("Signed Up Successfully");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full border p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>

        <input
          className="w-full p-2 border rounded mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 cursor-pointer" onClick={handleSignup}>
            Sign Up
        </button>

        <p className="text-sm mt-4 text-center">
            Already have an account? <a className="text-blue-600" href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
