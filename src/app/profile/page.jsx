"use client";

import { supabase } from "@/utils/supabase/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profiles = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    bio: "",
    role: "",
    skills: "",
    github_url: "",
    portfolio_url: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user1 }} = await supabase.auth.getUser();


     console.log(data)
      if (!user1) {
        alert("Kindly login first..!");
        // router.push("/login");
      } else {
        setUser(user1);

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          alert(error.message);
        } else if (data) {
          setForm({
            full_name: data.full_name || " ",
            bio: data.bio || " ",
            skills: data.skills?.join(",") || " ",
            github_url: data.github_url || " ",
            portfolio_url: data.portfolio_url || " ",
          });
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Complete Your Profile
      </h2>

      <div>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="max-w-4xl p-3 border rounded"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          className="max-w-4xl p-3 border rounded"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          className="max-w-4xl p-3 border rounded"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={form.skills}
          onChange={handleChange}
          className="max-w-4xl p-3 border rounded"
        />
        <input
          type="text"
          name="github_url"
          placeholder="Github Link"
          value={form.github_url}
          onChange={handleChange}
          className="max-w-4xl p-3 border rounded"
        />
        <input
          type="text"
          name="portfolio_url"
          placeholder="Portfolio Link"
          value={form.portfolio_url}
          onChange={handleChange}
          className="max-w-4xl p-3 border rounded"
        />
      </div>
    </div>
  );
};

export default Profiles;
