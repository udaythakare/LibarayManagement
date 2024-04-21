import React from 'react'
import { getAllEntries } from '@/actions/studentAction'
import BarcodeScanner from './BarcodeScanner'

const page = async () => {
  const entries = await getAllEntries()
  return (
    <div className='text-white' >
      <BarcodeScanner />

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-slate-600">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="px-4 py-2">Student Library ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2">In Time</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, index) => (
              <tr key={index} className="bg-slate-600 text-slate-200 hover:bg-slate-400">
                <td className="border px-4 py-2">{e.studentId}</td>
                <td className="border px-4 py-2">{e.name}</td>
                <td className="border px-4 py-2">{e.branch}</td>
                <td className="border px-4 py-2">{e.time}</td>
                <td className="border px-4 py-2">{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default page
