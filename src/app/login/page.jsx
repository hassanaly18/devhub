"use client";

import { supabase } from "@/utils/supabase/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("You're successfully logged in!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full border p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
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

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <a className="text-blue-600" href="/signup">
            Sign Up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
