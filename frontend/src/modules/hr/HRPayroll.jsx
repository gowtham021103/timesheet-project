import { useEffect, useState } from "react";
import { getPayroll, createPayroll, getEmployees } from "../../api/api";

export default function HRPayroll() {
    const [payrolls, setPayrolls] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        employee: "",
        month: "",
        basic_salary: "",
        bonus: 0,
        deductions: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [payRes, empRes] = await Promise.all([getPayroll(), getEmployees()]);
        setPayrolls(payRes.data);
        setEmployees(empRes.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPayroll(formData);
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert("Failed to create payroll");
        }
    };

    return (
        <div className="table-container">
            <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Payroll Management</h2>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        background: '#00445E',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Generate Payroll
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Month</th>
                        <th>Basic</th>
                        <th>Bonus</th>
                        <th>Deductions</th>
                        <th>Net Salary</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payrolls.map((p) => (
                        <tr key={p.id}>
                            <td>{p.employee_name}</td>
                            <td>{p.month}</td>
                            <td>${p.basic_salary}</td>
                            <td>${p.bonus}</td>
                            <td>${p.deductions}</td>
                            <td style={{ fontWeight: 'bold' }}>${p.net_salary}</td>
                            <td>
                                <span className={`status-badge ${p.status === 'Paid' ? 'active' : 'leave'}`}>
                                    {p.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div className="modal" style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '400px' }}>
                        <h3>Generate Payroll</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <select
                                required
                                value={formData.employee}
                                onChange={e => setFormData({ ...formData, employee: e.target.value })}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            >
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.username}</option>
                                ))}
                            </select>

                            <input
                                type="date"
                                required
                                value={formData.month}
                                onChange={e => setFormData({ ...formData, month: e.target.value })}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />

                            <input
                                type="number"
                                placeholder="Basic Salary"
                                required
                                value={formData.basic_salary}
                                onChange={e => setFormData({ ...formData, basic_salary: e.target.value })}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="number"
                                    placeholder="Bonus"
                                    value={formData.bonus}
                                    onChange={e => setFormData({ ...formData, bonus: e.target.value })}
                                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Deductions"
                                    value={formData.deductions}
                                    onChange={e => setFormData({ ...formData, deductions: e.target.value })}
                                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="submit" style={{ flex: 1, background: '#00445E', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Generate</button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, background: '#ef4444', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
