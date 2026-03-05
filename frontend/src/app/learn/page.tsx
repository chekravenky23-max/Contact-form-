'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Star, FileText, FileQuestion, GraduationCap, ArrowLeft, Layers, Bookmark, CheckCircle, ClipboardList } from 'lucide-react';
import Link from 'next/link';

const SECTIONS = [
    { id: 'highlights', title: 'Key Highlights', icon: Star, color: 'bg-yellow-500' },
    { id: 'notes', title: 'Daily Brief Notes', icon: FileText, color: 'bg-blue-500' },
    { id: 'summary', title: 'Notes Summary', icon: Layers, color: 'bg-indigo-500' },
    { id: 'qna', title: 'Short Answer Questions', icon: FileQuestion, color: 'bg-rose-500' },
    { id: 'flashcards', title: 'Flash Cards', icon: Bookmark, color: 'bg-orange-500' },
    { id: 'glossary', title: 'Glossary', icon: BookOpen, color: 'bg-emerald-500' },
    { id: 'quizzes', title: 'Quizzes', icon: CheckCircle, color: 'bg-purple-500' },
    { id: 'recommendations', title: 'Recommendations', icon: GraduationCap, color: 'bg-cyan-500' },
    { id: 'assignments', title: 'Assignments', icon: ClipboardList, color: 'bg-pink-500' },
];

export default function LearnPage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [user, setUser] = useState<{ id: string, name: string } | null>(null);

    useEffect(() => {
        // Load user session
        const storedUser = localStorage.getItem('dda_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Setup a default guest session to prevent errors on learning interface
            setUser({ id: 'guest', name: 'Practitioner' });
        }
    }, [router]);

    const logActivity = async (sectionTitle: string) => {
        if (!user) return;
        try {
            await fetch('http://localhost:5000/api/activities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    activityName: `Opened ${sectionTitle}`,
                }),
            });
        } catch (err) {
            console.error('Failed to log activity', err);
        }
    };

    const handleSectionClick = (section: any) => {
        if (activeSection === section.id) {
            setActiveSection(null);
        } else {
            setActiveSection(section.id);
            logActivity(section.title);
        }
    };

    if (!user) return null; // Wait for initial state load

    return (
        <div className="min-h-screen bg-[var(--background)] p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                    <div>
                        <Link href="/about" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-4 font-medium">
                            <ArrowLeft size={16} /> Back to Course Info
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)]">Course Materials</h1>
                        <p className="text-slate-500 mt-2">Welcome back, <span className="text-blue-600 font-semibold">{user.name}</span>! Select a module to continue.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SECTIONS.map((section, idx) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            layout
                            className={`rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${activeSection === section.id ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900' : ''
                                }`}
                        >
                            <button
                                onClick={() => handleSectionClick(section)}
                                className="w-full text-left bg-transparent p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${section.color} shadow-inner`}>
                                        <section.icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-lg">{section.title}</h3>
                                </div>
                                <div className={`transform transition-transform duration-300 ${activeSection === section.id ? 'rotate-180' : ''}`}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeSection === section.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
                                    >
                                        <div className="p-6">
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 gap-2">
                                                This is the content area for <strong>{section.title}</strong>. As an interactive learning section, clicking this card smoothly transitioned to reveal this module's information, and your visit has been recorded in the database!
                                            </p>
                                            <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm font-medium text-sm hover:border-blue-500 hover:text-blue-600 transition-colors">
                                                Explore Module
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
