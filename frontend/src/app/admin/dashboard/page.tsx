'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Activity, LogOut } from 'lucide-react';

interface DashboardData {
    totalUsers: number;
    totalActivities: number;
    users: Array<{
        id: string;
        name: string;
        email: string;
        activity_type: string;
        createdAt: string;
        _count: { activities: number };
    }>;
    recentActivities: Array<{
        id: string;
        activityName: string;
        completedAt: string;
        user: { name: string; email: string };
    }>;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check auth
        const token = localStorage.getItem('dda_admin_token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const stats = await response.json();
                    setData(stats);
                } else {
                    setError('Failed to load dashboard data. Ensure backend is running and you are logged in.');
                }
            } catch (err) {
                setError('Connection error. Server may be down.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('dda_admin_token');
        router.push('/admin/login');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading dashboard...</div>;
    }

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm hidden md:flex">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-blue-600">DDA Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl font-medium">
                        <LayoutDashboard size={20} /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl font-medium transition-colors">
                        <Users size={20} /> Practitioners
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl font-medium transition-colors">
                        <Activity size={20} /> Activities
                    </a>
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Overview</h1>
                    <button onClick={handleLogout} className="md:hidden text-slate-500">Logout</button>
                </header>

                {error ? (
                    <div className="bg-red-100/50 text-red-700 dark:text-red-400 p-4 rounded-xl mb-8 border border-red-200 dark:border-red-900/50">{error}</div>
                ) : (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                                    <Users size={32} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Practitioners</p>
                                    <p className="text-3xl font-bold">{data?.totalUsers || 0}</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                                    <Activity size={32} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Activities Logged</p>
                                    <p className="text-3xl font-bold">{data?.totalActivities || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tables Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                            {/* Users Table */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                    <h3 className="text-lg font-bold">Recent Practitioners</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500">
                                            <tr>
                                                <th className="p-4 font-medium">Name</th>
                                                <th className="p-4 font-medium">Email</th>
                                                <th className="p-4 font-medium">Joined</th>
                                                <th className="p-4 font-medium text-right">Activities</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {data?.users && data.users.length > 0 ? (
                                                data.users.slice(0, 5).map((user) => (
                                                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                                        <td className="p-4 font-medium">{user.name}</td>
                                                        <td className="p-4 text-slate-500 dark:text-slate-400">{user.email}</td>
                                                        <td className="p-4 text-slate-500 dark:text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                        <td className="p-4 text-right font-medium text-blue-600 dark:text-blue-400">{user._count.activities}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan={4} className="p-4 text-center text-slate-500">No users found.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                    <h3 className="text-lg font-bold">Recent Activity Log</h3>
                                </div>
                                <div className="p-2">
                                    {data?.recentActivities && data.recentActivities.length > 0 ? (
                                        <div className="max-h-[300px] overflow-y-auto">
                                            <ul className="divide-y divide-slate-100 dark:divide-slate-800 px-4">
                                                {data.recentActivities.map((act) => (
                                                    <li key={act.id} className="py-4 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/20 px-2 rounded-lg transition-colors">
                                                        <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 relative top-1.5 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                <span className="text-slate-900 dark:text-slate-100">{act.user?.name || 'Unknown'}</span> {' '}
                                                                <span className="text-slate-500 dark:text-slate-400">completed</span> {' '}
                                                                <span className="font-semibold text-blue-600 dark:text-blue-400">{act.activityName}</span>
                                                            </p>
                                                            <p className="text-xs text-slate-400 mt-1">
                                                                {new Date(act.completedAt).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="p-6 text-center text-slate-500 text-sm">No recent activity.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
