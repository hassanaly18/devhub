import supabase from '@/utils/supabase/supabase';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'

const JobsCrud = () => {

    const [jobs, setJobs] = useState([]);
    const [title, setTitle] = useState("")

    const fetchJobs = async()=>{
        const {data, error} = await supabase.from("jobs").select("*")

        if(error){
            alert(error.message)
            return
        }
        else{
            setJobs(data)
        }
    }

    useEffect(()=>{
        fetchJobs();
    }, [])
  return (
    <div>JobsCrud</div>
  )
}

export default JobsCrud