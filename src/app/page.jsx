"use client"

import JobsCrud from "@/components/JobsCrud";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-between px-4 py-12">

      <section className="text-center mt-10">
        <h2 className="text-4xl text-gray-800 md:text-5xl font-extrabold leading-tight">
          Find Javascript Jobs <br />
          or Get Discovered
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
          DevHub connects developers with job opportunities. <br />
          Whether you're looking for a job or want to showcase your skills,{" "}
          <br />
          DevHub is the place to be.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/jobs">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200 cursor-pointer">
              Browse Jobs
            </button>
          </Link>
          <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200 cursor-pointer">
            Join Now
          </button>
          </Link>
        </div>
      </section>

      <section className="mt-16 w-full max-w-5xl px-4">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Why DevHub?
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border bg-gray-200 rounded-xl shadow-sm text-center">
            <h4 className="text-lg font-semibold text-blue-600 mb-2">
              For Developers
            </h4>
            <p className="text-gray-600">
              Showcase your skills and get discovered by top companies. <br />
              Create a profile, upload your resume, and let employers find you.
            </p>
          </div>

          <div className="p-6 border bg-gray-200 rounded-xl shadow-sm text-center">
            <h4 className="text-lg font-semibold text-blue-600 mb-2">
              For Recruiters
            </h4>
            <p className="text-gray-600">
              Post job listings and find the right candidates for your team. <br />
              Access a pool of talented developers actively looking for jobs.
            </p>
          </div>

          <div className="p-6 border bg-gray-200 rounded-xl shadow-sm text-center">
            <h4 className="text-lg font-semibold text-blue-600 mb-2">
              For JS Devs
            </h4>
            <p className="text-gray-600">
              Focused exclusively on JavaScript jobs, 
              ensuring you find the right opportunities in your field. <br />
              Join a community of like-minded developers.
            </p>
          </div>
        </div>
      </section>

      <JobsCrud/>

      <footer className="w-full mt-24 border-t py-0 text-center text-gray-500 text-sm mb-0 ">
        {new Date().getFullYear()} DevHub, Made for JS Devs
      </footer>
    </main>
  );
}
