import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="w-full max-w-full mx-auto flex justify-between bg-white p-4 items-center">
        <h1 className="text-2xl font-bold text-blue-600">DevHub</h1>
        <nav className="space-x-6 text-gray-700">
          <Link href="/">Home</Link>
          <Link href="profile">Profile</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </nav>
      </header>
  )
}

export default Navbar