'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';

const ResumePage = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/documents/resume.pdf';
        link.download = 'UmaMahesh_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/developer">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Portfolio
                        </Button>
                    </Link>
                    <Button onClick={handleDownload} className="gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                    </Button>
                </div>
            </header>

            {/* PDF Viewer */}
            <main className="container mx-auto px-4 py-6 h-[calc(100vh-4rem)]">
                <iframe
                    src="/documents/resume.pdf"
                    className="w-full h-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                    style={{ backgroundColor: 'white' }}
                />
            </main>
        </div>
    );
};

export default ResumePage;