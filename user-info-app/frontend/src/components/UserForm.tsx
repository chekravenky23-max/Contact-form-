import { useState } from 'react';
import axios from '../api';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        pincode: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post('/submissions', formData);
            setStatus('success');
            setMessage('Your information has been successfully submitted!');
            setFormData({ name: '', phone: '', email: '', address: '', pincode: '' });
        } catch (error: any) {
            setStatus('error');
            setMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">User Registration</h1>
                <p className="text-gray-400 text-lg">Please fill out the form below to register your details.</p>
            </div>

            <div className="glass-panel">
                {status === 'success' ? (
                    <div className="text-center py-12">
                        <CheckCircle2 className="w-20 h-20 text-secondary mx-auto mb-6 animate-pulse" />
                        <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                        <p className="text-gray-300 mb-8">{message}</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="btn-primary inline-flex items-center justify-center w-auto px-8"
                        >
                            Submit Another Response
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label-text">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="label-text">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="label-text">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="label-text">Complete Address</label>
                                <textarea
                                    name="address"
                                    required
                                    rows={3}
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="input-field resize-none"
                                    placeholder="123 Main St, Apartment 4B"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="label-text">Pincode / Zip Code</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    required
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    className="input-field w-full md:w-1/2"
                                    placeholder="V5K 0A1"
                                />
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-xl">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">{message}</p>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="btn-primary flex justify-center items-center h-14"
                            >
                                {status === 'loading' ? (
                                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="mt-8 text-center">
                <Link to="/admin/login" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Admin Area
                </Link>
            </div>
        </div>
    );
}
