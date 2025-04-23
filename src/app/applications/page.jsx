"use client"

import { supabase } from '@/utils/supabase/supabase.js'
import React, { useEffect, useState } from 'react'

const Applications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const fetchApplications = async()=>{
      const {data: {user}, error: userError} = await supabase.auth.getUser()
      if(!user || userError){
        alert("Login first before viewing your applications")
        return
      }
  
      setUser(user)
  
      const {data, error} = await supabase.from("applications")
      .select("*, jobs(title, description, skills_required, created_at)").eq("applicant_id", user.id)
  
      if(error){
        alert(error.message)
        return
      }
      else{
        setApplications(data)
      }
  
      setLoading(false)
    }

    fetchApplications()
  }, [])

  
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <h1 className='text-4xl font-bold text-center mb-10 text-gray-200'>
        My Job Applications
      </h1>

      {
        loading ? (
          <p className='text-center text-gray-400'>
            Loading your applications...
          </p>
        ) : applications.length===0 ? (
          <p className='text-center text-gray-400'>
            You haven't applied to any jobs yet.
          </p>
        )
        : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {applications.map((app)=>(
              <div className='border rounded-2xl shadow-sm p-6 hover:shadow-md transition' key={app.id}>
                <h2 className='text-2xl font-semibold text-blue-500 mb-1'>
                  {app.jobs?.title}
                </h2>
                <p className='text-gray-400 text-sm mb-3'>
                  {app.jobs?.description.slice(0, 100)}...
                </p>

                <div className='mb-4'>
                  <p className='text-sm font-medium text-gray-500 mb-1'>
                    Skills Required
                  </p>
                  {/* <div className='flex flex-wrap gap-2'>
                    {app.jobs?.skills_required.map((skill, idx)=>(
                      <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1' key={idx}>
                        {skill || " N/A"}
                      </span>
                    ))}
                    {/* {app.jobs?.skills_required.split(",").map((skill, idx)=>(
                      <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1' key={idx}>
                        {skill || " N/A"}
                      </span>
                    ))} 
                  </div> */}
                </div>

                <div className='mt-4'>
                  <p className='text-sm font-medium text-gray-400 mb-1'>
                    Your Cover Letter: 
                  </p>
                  <p className='bg-gray-900 border p-3 text-sm text-gray-300 rounded-lg'>
                    {app.cover_letter}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default Applications