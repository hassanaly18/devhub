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
      <h2 className="text-3xl font-bold mb-8 text-center ">Available Jobs</h2>

      {loading ? (
        <p>Loading jobs....</p>
      ) : (
        <div>
          {jobs.map((job) => (
            <div key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description.slice(0, 100)}</p>
              <div>
                {jobs.skills_required?.map((skill, idx) => (
                  <span >{skill}</span>
                ))}
              </div>
              <p>{job.created_at}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
