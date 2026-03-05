'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Assume success, set admin token/session in localStorage
                const data = await response.json();
                localStorage.setItem('dda_admin_token', data.adminId || 'auth-token');
                router.push('/admin/dashboard');
            } else {
                setError('Invalid admin credentials.');
            }
        } catch (err) {
            setError('Could not connect to the server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-blue-600 p-8 text-center">
                    <Lock className="w-12 h-12 text-white/90 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white tracking-wide">Admin Portal</h1>
                    <p className="text-blue-200 text-sm mt-1">Dhyana Dharma Ashram</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center shadow-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="admin"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors disabled:opacity-70 flex justify-center mt-2"
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
