import React from 'react'
import { UsersTable } from './UsersTable'

const UsersContent = () => {
  return (
    <div className="px-24 py-12 w-full">
            <div className='w-full flex items-center justify-center mb-12 bg-primary text-white py-16 rounded-lg'>
                <h2 className='text-3xl font-bold'>USERS</h2>
            </div>
            <UsersTable />
        </div>
  )
}

export default UsersContent