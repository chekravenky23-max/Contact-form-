import { useEffect, useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import { Users, LogOut, Download, LayoutDashboard, Clock } from 'lucide-react';

interface Submission {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    pincode: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/admin/submissions');
            setSubmissions(response.data.submissions);
            setTotalCount(response.data.totalCount);
        } catch (err: any) {
            if (err.response?.status === 401) {
                handleLogout();
            } else {
                setError('Failed to fetch data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const downloadCSV = () => {
        const headers = ['ID', 'Name', 'Phone', 'Email', 'Address', 'Pincode', 'Date Submitted'];
        const csvContent = [
            headers.join(','),
            ...submissions.map(s => [
                s.id,
                `"${s.name}"`,
                `"${s.phone}"`,
                `"${s.email}"`,
                `"${s.address.replace(/"/g, '""')}"`,
                `"${s.pincode}"`,
                `"${new Date(s.createdAt).toLocaleString()}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `submissions_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface/50 p-6 rounded-3xl border border-white/5">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center">
                        <LayoutDashboard className="w-8 h-8 mr-3 text-primary" />
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400 mt-1">Manage and view all incoming submissions</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={downloadCSV}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors flex items-center"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-colors flex items-center border border-red-500/20"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </button>
                </div>
            </div>

            {error ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
                    {error}
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-primary/20 to-blue-900/20 border border-primary/20 p-6 rounded-3xl shadow-lg flex items-center space-x-6">
                            <div className="bg-primary/20 p-4 rounded-2xl text-primary">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Submissions</p>
                                <h3 className="text-4xl font-bold text-white mt-1">{totalCount}</h3>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-secondary/20 to-emerald-900/20 border border-secondary/20 p-6 rounded-3xl shadow-lg flex items-center space-x-6">
                            <div className="bg-secondary/20 p-4 rounded-2xl text-secondary">
                                <Clock className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">Recent Activity</p>
                                <h3 className="text-xl font-bold text-white mt-1 text-left">
                                    {submissions.length > 0
                                        ? new Date(submissions[0].createdAt).toLocaleDateString()
                                        : 'No data'}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="glass-panel p-0 overflow-hidden">
                        <div className="p-6 border-b border-white/5 bg-white/5">
                            <h2 className="text-xl font-semibold text-white">Recent Entries</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-300">
                                <thead className="bg-black/20 text-gray-400 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-4 rounded-tl-lg">Info</th>
                                        <th className="px-6 py-4">Contact</th>
                                        <th className="px-6 py-4">Location</th>
                                        <th className="px-6 py-4 rounded-tr-lg">Submitted</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {submissions.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-white">{sub.name}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">ID: #{sub.id}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-white">{sub.email}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">{sub.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate" title={sub.address}>
                                                <div className="text-white truncate">{sub.address}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">{sub.pincode}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm">
                                                    {new Date(sub.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-0.5">
                                                    {new Date(sub.createdAt).toLocaleTimeString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {submissions.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                                No submissions found yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
