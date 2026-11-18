import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navigation = [
    {
        label: 'OVERVIEW',
        items: [
            { name: 'Dashboard', icon: '▦', href: '/' },
        ],
    },
    {
        label: 'MANAGEMENT',
        items: [
            { name: 'Patients', icon: '♙', href: '/patients' },
            { name: 'Appointments', icon: '▣', href: null },
            { name: 'Medical Records', icon: '▤', href: null },
        ],
    },
    {
        label: 'ADMINISTRATION',
        items: [
            { name: 'Users & Roles', icon: '♧', href: null },
            { name: 'Reports', icon: '▥', href: null },
            { name: 'Settings', icon: '⚙', href: null },
        ],
    },
];

export default function ClinicLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();

    const currentPath = url.split('?')[0];

    const activeItem = navigation
        .flatMap((group) => group.items)
        .find((item) => item.href === currentPath);

    const activePage = activeItem?.name || 'Dashboard';

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="clinic-layout">

            {/* ==========================================
                SIDEBAR
            ========================================== */}
            <aside
                className={`sidebar ${sidebarOpen ? 'open' : ''}`}
                aria-label="Main navigation"
            >

                {/* BRAND */}
                <div className="sidebar-brand">
                    <div className="brand-icon">+</div>

                    <div className="brand-info">
                        <div className="brand-name">
                            MediCare
                        </div>

                        <div className="brand-subtitle">
                            Clinic Management
                        </div>
                    </div>
                </div>

                {/* NAVIGATION */}
                <div className="sidebar-navigation">

                    {navigation.map((group) => (
                        <div
                            className="sidebar-group"
                            key={group.label}
                        >
                            <p className="sidebar-label">
                                {group.label}
                            </p>

                            <nav className="sidebar-menu">
                                {group.items.map((item) => {

                                    const isActive =
                                        item.href === currentPath;

                                    if (item.href) {
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`sidebar-link ${
                                                    isActive ? 'active' : ''
                                                }`}
                                                onClick={closeSidebar}
                                            >
                                                <span className="sidebar-icon">
                                                    {item.icon}
                                                </span>

                                                <span className="sidebar-link-text">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        );
                                    }

                                    return (
                                        <button
                                            key={item.name}
                                            type="button"
                                            className="sidebar-link sidebar-link-disabled"
                                            disabled
                                        >
                                            <span className="sidebar-icon">
                                                {item.icon}
                                            </span>

                                            <span className="sidebar-link-text">
                                                {item.name}
                                            </span>

                                            <span className="sidebar-coming-soon">
                                                Soon
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    ))}

                </div>

                {/* SIDEBAR FOOTER */}
                <div className="sidebar-bottom">
                    <div className="sidebar-profile">

                        <div className="profile-avatar">
                            AD
                        </div>

                        <div className="profile-details">
                            <p className="profile-name">
                                Administrator
                            </p>

                            <p className="profile-role">
                                System Admin
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ==========================================
                MAIN CONTENT
            ========================================== */}
            <main className="main-content">

                {/* TOPBAR */}
                <header className="topbar">

                    {/* LEFT SIDE */}
                    <div className="topbar-left">

                        <button
                            type="button"
                            className="mobile-menu-button"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label="Toggle navigation"
                            aria-expanded={sidebarOpen}
                        >
                            ☰
                        </button>

                        <div className="breadcrumb-area">

                            <strong className="topbar-page-title">
                                {activePage}
                            </strong>

                            <p className="topbar-breadcrumb">
                                MediCare Clinic
                                <span>/</span>
                                {activePage}
                            </p>

                        </div>
                    </div>

                    {/* CENTER SEARCH */}
                    <div className="topbar-search">

                        <span
                            className="search-icon"
                            aria-hidden="true"
                        >
                            ⌕
                        </span>

                        <input
                            type="search"
                            placeholder="Search anything..."
                            aria-label="Search"
                        />

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="topbar-actions">

                        <span className="topbar-date">
                            {new Date().toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>

                        <button
                            type="button"
                            className="topbar-button"
                            aria-label="Notifications"
                        >
                            ♧
                        </button>

                        <div
                            className="profile-avatar topbar-avatar"
                            aria-label="Administrator profile"
                        >
                            AD
                        </div>

                    </div>

                </header>

                {/* PAGE CONTENT */}
                <div className="page-content">
                    {children}
                </div>

            </main>

            {/* MOBILE SIDEBAR OVERLAY */}
            {sidebarOpen && (
                <button
                    type="button"
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                    aria-label="Close navigation"
                />
            )}

        </div>
    );
}