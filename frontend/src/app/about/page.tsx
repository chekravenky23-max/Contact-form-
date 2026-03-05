'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function AboutCourse() {
    const router = useRouter();
    const handleStartLearning = () => {
        router.push('/learn');
    };

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col items-center p-8 pt-24 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <main className="z-10 max-w-5xl w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex flex-col md:flex-row items-center justify-between gap-12 mb-16"
                >
                    {/* Profile Image Area */}
                    <div className="flex-shrink-0 relative group order-1 md:order-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-blue-400 to-indigo-600 shadow-2xl">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-900 relative bg-white dark:bg-slate-800">
                                <Image
                                    src="/images/ramu_master.jpg"
                                    alt="Ramu Master"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 192px, 256px"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left order-2 md:order-none">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-sm font-semibold tracking-wide mb-6">
                            <BookOpen size={16} /> Course Overview
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
                            Teachers Training Course By Ramu Master
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto md:mx-0">
                            Enhance your teaching skills with deep dharma principles and advanced methodologies designed specifically for modern educators by Ramu Master.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="glass p-8 md:p-12 rounded-3xl w-full shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-500"></div>
                    <h2 className="text-2xl font-bold mb-4">What you will learn:</h2>
                    <ul className="space-y-4 mb-10 text-slate-700 dark:text-slate-300">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span> Core meditation principles for classroom focus.
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span> How to integrate ethical teaching (Dharma) in daily subjects.
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span> Creating a balanced emotional environment for students.
                        </li>
                    </ul>

                    <div className="flex justify-center mt-12">
                        <button
                            onClick={handleStartLearning}
                            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full text-lg shadow-lg hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all active:scale-95"
                        >
                            Start Learning Now
                        </button>
                    </div>
                </motion.div>
            </main>

        </div>
    );
}
