"use client";
import { supabase } from "@/utils/supabase/supabase";
import React, { useEffect, useState } from "react";

const Post = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills_required: "",
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const getUser = async()=>{
      const {data: {user}, error} = await supabase.auth.getUser()

      if(!user){
        alert("Please login first")
      }
      else{
        setUser(user)
      }
    }

    getUser();
  },[])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePostJob = async () => {
    if (!form.title || !form.description || !form.skills_required) {
      alert("kindly fill all the fields");
      return;
    }
    setLoading(true);

    const { title, description, skills_required } = form;

    const { error } = await supabase.from("jobs").insert([
      {
        title,
        description,
        skills_required: skills_required
          .split(",")
          .map((skilll) => skilll.trim()),
        posted_by: user.id, //"3c60e69c-4084-4f8f-bf72-3e525012a8f4"
      },
    ]);

    setLoading(false);

    setForm({
      title:"",
      description: "",
      skills_required: ""
    })

    if (error) {
      alert(error.message);
    } else {
      alert("Job Posted successfully");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
        Post a New Job
      </h2>
      <div className="grid gap-5">
        <input
          type="text"
          placeholder="Job Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Skills Required(Comma Separated)"
          name="skills_required"
          value={form.skills_required}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer"
          onClick={handlePostJob}
        >
          {loading ? "Posting..!" : "Post Job"}
        </button>
      </div>
    </div>
  );
};

export default Post;
