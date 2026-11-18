import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import ClinicLayout from '../Layouts/ClinicLayout';

const emptyForm = {
    name: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
};

function calculateAge(dateOfBirth) {
    if (!dateOfBirth) return 0;

    const [year, month, day] = dateOfBirth
        .split('T')[0]
        .split('-')
        .map(Number);

    const today = new Date();

    let age = today.getFullYear() - year;

    if (
        today.getMonth() + 1 < month ||
        (today.getMonth() + 1 === month && today.getDate() < day)
    ) {
        age--;
    }

    return age;
}

function getInitials(name) {
    if (!name) return 'PT';

    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

const inputClassName =
    'w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10';

const labelClassName =
    'mb-2.5 block text-sm font-semibold text-slate-700';

export default function Patients({ patients = [] }) {
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);

    const form = useForm(emptyForm);

    const filteredPatients = patients.filter((patient) =>
        `${patient.patient_id} ${patient.name} ${patient.phone} ${patient.email || ''}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const activePatients = patients.filter(
        (patient) => patient.status === 'Active'
    ).length;

    const inactivePatients = patients.length - activePatients;

    function closeModal() {
        setShowModal(false);
        form.reset();
        form.clearErrors();
    }

    function handleSubmit(event) {
        event.preventDefault();

        form.post('/patients', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                form.clearErrors();
                setShowModal(false);
                setSearch('');
            },
        });
    }

    return (
        <ClinicLayout>
            <div className="min-h-screen w-full bg-slate-100 p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    {/* PAGE HEADER */}
                    <div className="mb-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                                        Clinic Management
                                    </span>
                                </div>

                                <h1
                                    style={{
                                        fontSize: '25px',
                                        fontWeight: 750,
                                        letterSpacing: '-0.7px',
                                        color: '#172033',
                                    }}
                                >
                                    Patients
                                </h1>

                                <p
                                    style={{
                                        fontSize: '13px',
                                        color: '#64748b',
                                        marginTop: '4px',
                                    }}
                                >
                                    Manage and view your clinic's registered patients.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="group inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl border border-blue-500 bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-600/30 active:translate-y-0"
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-[17px] font-medium leading-none transition-transform duration-300 group-hover:rotate-90">
                                    +
                                </span>
                                <span>Add New Patient</span>
                            </button>
                        </div>
                    </div>

                    {/* STATISTICS */}
                    <div className="stats-grid patients-stats-grid">
                        {/* TOTAL PATIENTS */}
                        <div className="stat-card">
                            <div className="flex items-center justify-between px-2">
                                <div style={{ paddingLeft: '14px' }}>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Total Patients
                                    </p>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                        {patients.length}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Registered in system
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* ACTIVE PATIENTS */}
                        <div className="stat-card">
                            <div className="flex items-center justify-between px-2">
                                <div style={{ paddingLeft: '14px' }}>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Active Patients
                                    </p>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-600">
                                        {activePatients}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Currently active
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* INACTIVE PATIENTS */}
                        <div className="stat-card">
                            <div className="flex items-center justify-between px-2">
                                <div style={{ paddingLeft: '14px' }}>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Inactive Patients
                                    </p>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-600">
                                        {inactivePatients}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Inactive records
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M8 12h8" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PATIENT DIRECTORY */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {/* DIRECTORY HEADER */}
                        <div className="border-b border-slate-100 px-7 py-8 sm:px-9 sm:py-9">
                            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                                Patient Directory
                                            </h2>
                                            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                                                {patients.length} REGISTERED
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm text-slate-500">
                                            View and manage your clinic's registered patients.
                                        </p>
                                    </div>
                                </div>

                                {/* SEARCH */}
                                <div className="relative w-full xl:max-w-sm">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search name, ID, or phone..."
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    />

                                    <svg
                                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="m20 20-3.5-3.5" />
                                    </svg>

                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() => setSearch('')}
                                            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                                            aria-label="Clear search"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1250px] table-fixed text-left">
                                <colgroup>
                                    <col className="w-[25%]" />
                                    <col className="w-[15%]" />
                                    <col className="w-[14%]" />
                                    <col className="w-[19%]" />
                                    <col className="w-[12%]" />
                                    <col className="w-[15%]" />
                                </colgroup>

                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-8 py-5 text-[14px] font-bold uppercase tracking-wider text-slate-400">
                                            <span className="inline-block translate-x-[40px]">
                                                Patient Information
                                            </span>
                                        </th>
                                        <th className="px-6 py-5 text-center text-[15px] font-bold uppercase tracking-wider text-slate-400">
                                            Patient ID
                                        </th>
                                        <th className="px-6 py-5 text-center text-[15px] font-bold uppercase tracking-wider text-slate-400">
                                            Age / Gender
                                        </th>
                                        <th className="px-6 py-5 text-center text-[15px] font-bold uppercase tracking-wider text-slate-400">
                                            Contact Number
                                        </th>
                                        <th className="px-6 py-5 text-center text-[15px] font-bold uppercase tracking-wider text-slate-400">
                                            Status
                                        </th>
                                        <th className="px-8 py-5 text-center text-[15px] font-bold uppercase tracking-wider text-slate-400">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {filteredPatients.map((patient) => (
                                        <tr
                                            key={patient.id}
                                            className="group transition-colors duration-150 hover:bg-blue-50/40"
                                        >
                                            {/* PATIENT */}
                                            <td className="py-8 pl-10 pr-6">
                                                <div className="flex translate-x-[15px] items-center gap-4">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-sm shadow-blue-600/20">
                                                        {getInitials(patient.name)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-base font-bold leading-6 text-slate-700 transition group-hover:text-blue-500">
                                                            {patient.name}
                                                        </p>
                                                        <p className="mt-2 max-w-[210px] truncate text-sm leading-6 text-slate-400">
                                                            {patient.email || 'No email provided'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* PATIENT ID */}
                                            <td className="px-5 py-8 text-center">
                                                <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs font-bold text-slate-600">
                                                    {patient.patient_id}
                                                </span>
                                            </td>

                                            {/* AGE / GENDER */}
                                            <td className="px-6 py-8 text-center">
                                                <div className="flex flex-col gap-1">
                                                    <span className="whitespace-nowrap text-sm font-bold text-slate-700">
                                                        {calculateAge(patient.date_of_birth)} years
                                                    </span>
                                                    <span className="text-xs text-slate-400">
                                                        {patient.gender}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* CONTACT */}
                                            <td className="px-6 py-8 text-center">
                                                <div className="flex items-center justify-center gap-2.5">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.05 8.95a16 16 0 0 0 6 6l1.32-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69a2 2 0 0 1 1.72 2z" />
                                                        </svg>
                                                    </div>
                                                    <span className="whitespace-nowrap text-sm font-medium text-slate-600">
                                                        {patient.phone}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-8 text-center">
                                                <div className="flex justify-center">
                                                    <span
                                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                                                            patient.status === 'Active'
                                                                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100'
                                                                : 'bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-200'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${
                                                                patient.status === 'Active'
                                                                    ? 'bg-emerald-500'
                                                                    : 'bg-slate-400'
                                                            }`}
                                                        />
                                                        {patient.status}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* ACTION */}
                                            <td className="whitespace-nowrap px-7 py-8 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        alert(`Viewing ${patient.name} is our next step!`)
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition duration-200 hover:border-blue-200 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-600/20"
                                                >
                                                    View Details
                                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="m9 18 6-6-6-6" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* EMPTY STATE */}
                                    {filteredPatients.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-20 text-center">
                                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                        <circle cx="11" cy="11" r="7" />
                                                        <path d="m20 20-3.5-3.5" />
                                                    </svg>
                                                </div>

                                                <p className="mt-4 font-bold text-slate-700">
                                                    {search ? 'No patients found' : 'No patients registered yet'}
                                                </p>

                                                <p className="mt-1 text-sm text-slate-400">
                                                    {search
                                                        ? `No patients found matching "${search}".`
                                                        : 'Register your first patient to get started.'}
                                                </p>

                                                {search && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSearch('')}
                                                        className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700"
                                                    >
                                                        Clear search
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* DIRECTORY FOOTER */}
                        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-7 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 sm:translate-x-[28px]">
                                <span>Showing</span>
                                <span className="font-bold text-slate-800">
                                    {filteredPatients.length}
                                </span>
                                <span>of</span>
                                <span className="font-bold text-slate-800">
                                    {patients.length}
                                </span>
                                <span>patients</span>
                            </p>

                            <div className="flex items-center gap-2 text-sm text-slate-400 sm:relative sm:left-[-40px]">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Patient records are up to date
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ADD PATIENT MODAL */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/65 p-3 backdrop-blur-sm sm:p-6"
                    role="presentation"
                >
                    <div
                        className="my-auto flex max-h-[calc(100vh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_25px_80px_-20px_rgba(15,23,42,0.55)] sm:max-h-[calc(100vh-3rem)]"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="register-patient-title"
                    >
                        {/* PREMIUM MODAL HEADER */}
                        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-6 py-7 sm:px-9 sm:py-8">
                            <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-20 right-1/3 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />

                            <div className="relative flex items-center justify-between gap-4">
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg shadow-slate-950/20 backdrop-blur-sm sm:h-16 sm:w-16">
                                        <svg className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M19 8v6M16 11h6" />
                                        </svg>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200/90">
                                            Patient Management
                                        </p>
                                        <h2
                                            id="register-patient-title"
                                            className="text-xl font-bold tracking-tight text-white sm:text-2xl"
                                        >
                                            Register New Patient
                                        </h2>
                                        <p className="mt-1 text-xs leading-5 text-blue-100/75 sm:text-sm">
                                            Add a new patient to your clinic records.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={form.processing}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-2xl leading-none text-white transition hover:border-white/30 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Close registration form"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* FORM CONTENT */}
                        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                            <div className="overflow-y-auto px-6 py-7 sm:px-9 sm:py-8">
                                <div className="mb-6 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-800">
                                            Patient Information
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-400">
                                            Fields marked with <span className="font-bold text-rose-500">*</span> are required.
                                        </p>
                                    </div>
                                    <span className="hidden rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 sm:inline-flex">
                                        New Record
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-6">
                                    {/* FULL NAME */}
                                    <div>
                                        <label htmlFor="patient-name" className={labelClassName}>
                                            Full Name <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            id="patient-name"
                                            type="text"
                                            name="name"
                                            value={form.data.name}
                                            onChange={(event) => form.setData('name', event.target.value)}
                                            placeholder="Enter patient's full name"
                                            autoComplete="name"
                                            required
                                            className={inputClassName}
                                        />
                                        {form.errors.name && (
                                            <p className="mt-2 text-xs font-medium text-rose-600">
                                                {form.errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* DATE OF BIRTH / GENDER */}
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="patient-date-of-birth" className={labelClassName}>
                                                Date of Birth <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="patient-date-of-birth"
                                                type="date"
                                                name="date_of_birth"
                                                value={form.data.date_of_birth}
                                                onChange={(event) => form.setData('date_of_birth', event.target.value)}
                                                max={new Date().toISOString().split('T')[0]}
                                                required
                                                className={inputClassName}
                                            />
                                            {form.errors.date_of_birth && (
                                                <p className="mt-2 text-xs font-medium text-rose-600">
                                                    {form.errors.date_of_birth}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="patient-gender" className={labelClassName}>
                                                Gender <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="patient-gender"
                                                name="gender"
                                                value={form.data.gender}
                                                onChange={(event) => form.setData('gender', event.target.value)}
                                                required
                                                className={inputClassName}
                                            >
                                                <option value="">Select gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            {form.errors.gender && (
                                                <p className="mt-2 text-xs font-medium text-rose-600">
                                                    {form.errors.gender}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* PHONE / EMAIL */}
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="patient-phone" className={labelClassName}>
                                                Phone Number <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="patient-phone"
                                                type="tel"
                                                name="phone"
                                                value={form.data.phone}
                                                onChange={(event) => form.setData('phone', event.target.value)}
                                                placeholder="09XX XXX XXXX"
                                                autoComplete="tel"
                                                required
                                                className={inputClassName}
                                            />
                                            {form.errors.phone && (
                                                <p className="mt-2 text-xs font-medium text-rose-600">
                                                    {form.errors.phone}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="patient-email" className={labelClassName}>
                                                Email Address
                                            </label>
                                            <input
                                                id="patient-email"
                                                type="email"
                                                name="email"
                                                value={form.data.email}
                                                onChange={(event) => form.setData('email', event.target.value)}
                                                placeholder="patient@example.com"
                                                autoComplete="email"
                                                className={inputClassName}
                                            />
                                            {form.errors.email && (
                                                <p className="mt-2 text-xs font-medium text-rose-600">
                                                    {form.errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* ADDRESS */}
                                    <div>
                                        <label htmlFor="patient-address" className={labelClassName}>
                                            Home Address
                                        </label>
                                        <textarea
                                            id="patient-address"
                                            name="address"
                                            value={form.data.address}
                                            onChange={(event) => form.setData('address', event.target.value)}
                                            rows="3"
                                            placeholder="Enter complete home address"
                                            autoComplete="street-address"
                                            className={`${inputClassName} min-h-[104px] resize-y`}
                                        />
                                        {form.errors.address && (
                                            <p className="mt-2 text-xs font-medium text-rose-600">
                                                {form.errors.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* MODAL FOOTER */}
                            <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/90 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
                                <p className="hidden text-xs text-slate-400 sm:block">
                                    Please review the patient details before saving.
                                </p>

                                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        disabled={form.processing}
                                        className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {form.processing ? (
                                            <>
                                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                                                </svg>
                                                Saving Patient...
                                            </>
                                        ) : (
                                            <>
                                                Save Patient
                                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </ClinicLayout>
    );
}
