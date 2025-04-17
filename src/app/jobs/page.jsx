"use client";

import { supabase } from "@/utils/supabase/supabase";
import React, { use, useEffect, useState } from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = (await supabase.from("jobs").select("*"))

      if (error) {
        alert(error.message);
      } else {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-10 text-center ">Available Jobs</h2>

      {loading ? (
        <p className="text-center">Loading jobs....</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="border rounded-xl p-6 shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{job.description.slice(0, 100)}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {jobs.skills_required?.map((skill, idx) => (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1" key={idx}>{skill}</span>
                ))}
              </div>
              <p className="text-xs text-gray-500">Posted On: {job.created_at}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
