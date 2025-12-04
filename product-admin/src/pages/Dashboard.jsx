import React, { useMemo, useState } from 'react'
import { employees as sampleEmployees } from '../Sample-data'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Navbar'
import Cards from '../components/DashboardCards'
import EmployeeTable from '../components/EmployeeTable'


export default function Dashboard(){
const [employees] = useState(sampleEmployees)
const totals = useMemo(()=>({
total: employees.length,
active: employees.filter(e=>e.status==='Active').length,
avgAttendance: (employees.reduce((s,e)=>s+e.attendance,0)/employees.length).toFixed(1)
}),[employees])


return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6">
    <Topbar />
    <h1 className="text-2xl font-semibold mb-4">Employee Dashboard</h1>
    <Cards totals={totals} />
    <div className="mt-6">
    <EmployeeTable employees={employees} />
    </div>
    </div>
    </div>
)
}