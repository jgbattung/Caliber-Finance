"use client"

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div className='text-white'>Not sign in</div>
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-bold">User Session Info</h2>
      <p><strong>Name:</strong> {session.user?.name}</p>
      <p><strong>Email:</strong> {session.user?.email}</p>
      <p><strong>Provider:</strong> {session.user?.provider}</p>
      <p><strong>User ID:</strong> {session.user?.id}</p>
      {session.user?.image && (
        <img 
          src={session.user.image} 
          alt="Profile" 
          className="w-20 h-20 mt-4 rounded-full"
        />
      )}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

export default Dashboard