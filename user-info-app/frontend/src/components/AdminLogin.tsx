import { useState } from 'react';
import axios from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/admin/login', { username, password });
            localStorage.setItem('adminToken', response.data.token);
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Admin Gateway</h1>
                <p className="text-gray-400">Secure access to the management dashboard.</p>
            </div>

            <div className="glass-panel text-left">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="label-text">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field pl-11"
                                placeholder="admin"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label-text">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field pl-11"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex justify-center items-center h-12"
                        >
                            {loading ? (
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-8 text-center">
                <Link to="/" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Return to Application Form
                </Link>
            </div>
        </div>
    );
}
