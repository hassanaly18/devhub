"use client";

import { supabase } from "@/utils/supabase/supabase";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ApplyJob = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserAndJob = async () => {
      //get id of user from auth
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert("Please Login first");
        return;
      }

      setUser(user);

      //get profile id of the user
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();
      if (!profile) {
        alert("Profile not found");
        return;
      }
      setProfileId(profile?.id);

      //get job details
      const { data: jobData } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();
      setJob(jobData);
    };

    fetchUserAndJob();
  }, [id]);

  const handlelApply = async () => {
    setLoading(true);

    const { error } = await supabase.from("applications").insert([
      {
        job_id: id,
        applicant_id: profileId,
        cover_letter: coverLetter,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    } else {
      alert("Application submitted successfully");
      setCoverLetter("");
    }
  };

  if (!job)
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading Job info...!!
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-4">{job?.title}</h2>
      <p className="text-gray-300 mb-6">{job?.description}</p>

      <h3 className="text-xl font-semibold mb-4">Write your Cover Letter</h3>
      <textarea
        rows={6}
        placeholder="Why are you a great fit gor this job?"
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        className="w-full border rounded p-4 mb-4"
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-800 transition cursor-pointer"
        onClick={handlelApply}
        disabled={loading}
      >
        {loading ? "Applying..." : "Apply Now!"}
      </button>
    </div>
  );
};

export default ApplyJob;
