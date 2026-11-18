import ClinicLayout from '../Layouts/ClinicLayout';

const appointments = [
    { initials: 'JD', name: 'John Doe', type: 'General Consultation', time: '09:00 AM', status: 'Completed' },
    { initials: 'MS', name: 'Maria Santos', type: 'Dental Checkup', time: '10:30 AM', status: 'Pending' },
    { initials: 'RC', name: 'Robert Cruz', type: 'Follow-up Visit', time: '11:30 AM', status: 'Pending' },
    { initials: 'AL', name: 'Anna Lopez', type: 'General Consultation', time: '01:00 PM', status: 'Completed' },
];

const patients = [
    { id: 'PT-001', name: 'John Doe', gender: 'Male', age: 32, date: 'Nov 11, 2026', status: 'Active' },
    { id: 'PT-002', name: 'Maria Santos', gender: 'Female', age: 27, date: 'Nov 11, 2026', status: 'Active' },
    { id: 'PT-003', name: 'Robert Cruz', gender: 'Male', age: 45, date: 'Nov 10, 2026', status: 'Active' },
    { id: 'PT-004', name: 'Anna Lopez', gender: 'Female', age: 36, date: 'Nov 09, 2026', status: 'Active' },
];

function StatCard({ icon, color, label, value, trend }) {
    return (
        <div className="stat-card">
            <div className="stat-top">
                <div className={`stat-icon ${color}`}>{icon}</div>
                <span className="stat-trend">{trend}</span>
            </div>
            <p className="stat-label">{label}</p>
            <h2 className="stat-value">{value}</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <ClinicLayout>
            <section className="dashboard-content">

                <div className="dashboard-heading">
                    <div>
                        <h1>Good morning, Administrator! 👋</h1>
                        <p>Here's what's happening at your clinic today.</p>
                    </div>

                    <button className="primary-button">
                        + New Appointment
                    </button>
                </div>

                {/* STATISTICS */}
                <div className="stats-grid">
                    <StatCard icon="♙" color="blue" label="Total Patients" value="1,284" trend="+12.5%" />
                    <StatCard icon="▣" color="cyan" label="Today's Appointments" value="24" trend="+8.2%" />
                    <StatCard icon="✓" color="green" label="Completed Consultations" value="18" trend="+5.4%" />
                    <StatCard icon="◷" color="orange" label="Pending Appointments" value="06" trend="Today" />
                </div>

                {/* APPOINTMENTS AND ACTIVITY */}
                <div className="dashboard-grid">

                    <section className="panel">
                        <div className="panel-header">
                            <div>
                                <h3 className="panel-title">Today's Appointments</h3>
                                <p className="panel-subtitle">
                                    Your clinic's appointment schedule
                                </p>
                            </div>
                            <a href="#appointments" className="panel-link">
                                View all →
                            </a>
                        </div>

                        <div className="appointment-list">
                            {appointments.map((appointment) => (
                                <div className="appointment-item" key={appointment.name}>
                                    <div className="patient-avatar">
                                        {appointment.initials}
                                    </div>

                                    <div className="appointment-info">
                                        <h4>{appointment.name}</h4>
                                        <p>{appointment.type}</p>
                                    </div>

                                    <span className="appointment-time">
                                        {appointment.time}
                                    </span>

                                    <span className={`status-badge ${
                                        appointment.status === 'Completed'
                                            ? 'status-completed'
                                            : 'status-pending'
                                    }`}>
                                        {appointment.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="panel">
                        <div className="panel-header">
                            <div>
                                <h3 className="panel-title">Recent Activity</h3>
                                <p className="panel-subtitle">Latest clinic updates</p>
                            </div>
                        </div>

                        <div className="activity-list">
                            <div className="activity-item">
                                <span className="activity-dot" />
                                <div>
                                    <p>New patient registered</p>
                                    <span>Maria Santos · 10 minutes ago</span>
                                </div>
                            </div>

                            <div className="activity-item">
                                <span className="activity-dot" />
                                <div>
                                    <p>Appointment completed</p>
                                    <span>John Doe · 35 minutes ago</span>
                                </div>
                            </div>

                            <div className="activity-item">
                                <span className="activity-dot" />
                                <div>
                                    <p>New appointment scheduled</p>
                                    <span>Robert Cruz · 1 hour ago</span>
                                </div>
                            </div>

                            <div className="activity-item">
                                <span className="activity-dot" />
                                <div>
                                    <p>Patient record updated</p>
                                    <span>Anna Lopez · 2 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* RECENT PATIENTS */}
                <section className="panel">
                    <div className="panel-header">
                        <div>
                            <h3 className="panel-title">Recent Patients</h3>
                            <p className="panel-subtitle">
                                Recently registered clinic patients
                            </p>
                        </div>

                        <a href="/patients" className="panel-link">
                            View all →
                        </a>
                    </div>

                    <div className="table-wrapper">
                        <table className="patient-table">
                            <thead>
                                <tr>
                                    <th>Patient ID</th>
                                    <th>Patient Name</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Registration Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {patients.map((patient) => (
                                    <tr key={patient.id}>
                                        <td>{patient.id}</td>
                                        <td className="patient-name">{patient.name}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.date}</td>
                                        <td>
                                            <span className="status-badge status-completed">
                                                {patient.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <footer style={{
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontSize: 11,
                    padding: '28px 0 10px'
                }}>
                    © 2026 MediCare Clinic Management System. All rights reserved.
                </footer>

            </section>
        </ClinicLayout>
    );
}

export default Dashboard;