import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Package, Code, ArrowRight, Check, Terminal, Linkedin } from 'lucide-react';
import Link from 'next/link';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="relative group h-full">
        <div className="absolute -inset-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
        <div className="relative p-6 space-y-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-200 h-full flex flex-col">
            <div className="p-3 inline-flex rounded-lg bg-zinc-800 self-start">
                <Icon className="w-6 h-6 text-zinc-100" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
            <p className="text-zinc-400 leading-relaxed flex-grow">{description}</p>
        </div>
    </div>
);

const Benefit = ({ children }) => (
    <div className="flex items-center gap-2 text-zinc-400">
        <Check className="w-5 h-5 text-green-500" />
        <span>{children}</span>
    </div>
);

const ChainSafeLanding = () => {
    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
                    <div className="text-center space-y-8">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
                            ChainSafe
                        </h1>
                        <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto">
                            Automatically add optional chaining to your JavaScript & TypeScript code.
                            Prevent null reference errors and enhance code reliability.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/chainsafe/app">
                                <Button className="h-12 px-8 text-lg bg-white hover:bg-zinc-200 text-black border-0">
                                    Try Online Editor
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <a href="https://marketplace.visualstudio.com/items?itemName=dasariumamahesh.chainsafe"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button
                                    className="h-12 px-8 text-lg bg-zinc-800 hover:bg-zinc-700 text-white">
                                    Get VS Code Extension
                                    <Code className="ml-2 w-5 h-5" />
                                </Button>
                            </a>
                            <a href="https://www.npmjs.com/package/chainsafe"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button
                                    className="h-12 px-8 text-lg bg-zinc-800 hover:bg-zinc-700 text-white">
                                    Install from NPM
                                    <Package className="ml-2 w-5 h-5" />
                                </Button>
                            </a>
                        </div>

                        <div className="pt-8 flex justify-center gap-8 text-sm">
                            <Benefit>Real-time transformation</Benefit>
                            <Benefit>Multiple integration options</Benefit>
                            <Benefit>Open source</Benefit>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-black/30">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Multiple Ways to Use
                        </h2>
                        <p className="text-lg text-zinc-400">
                            Choose the integration that best fits your workflow
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Terminal}
                            title="Web Editor"
                            description="Transform your code instantly with our web-based editor. Features live preview and diff view."
                        />
                        <FeatureCard
                            icon={Package}
                            title="NPM Package"
                            description="Integrate directly into your build process. Available on NPM for easy installation."
                        />
                        <FeatureCard
                            icon={Code}
                            title="VS Code Extension"
                            description="Transform code directly in your editor with our powerful VS Code extension."
                        />
                    </div>
                </div>
            </div>

            {/* Code Demo Section */}
            <div className="py-24">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            See the Transformation
                        </h2>
                        <p className="text-lg text-zinc-400">
                            Watch how ChainSafe automatically adds optional chaining
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Before Code Example */}
                        <div className="relative group rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 opacity-10 group-hover:opacity-20 transition-opacity duration-200"></div>
                            <div className="relative p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-red-400">Before</h3>
                                    <div className="flex gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    </div>
                                </div>
                                <pre className="bg-zinc-800 p-4 rounded-lg overflow-x-auto">
                                    <code className="text-sm font-mono text-zinc-100">
                                        {`const user = getUser();
const address = user.profile.address;
const city = address.city;
console.log(city);`}
                                    </code>
                                </pre>
                            </div>
                        </div>

                        {/* After Code Example */}
                        <div className="relative group rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 opacity-10 group-hover:opacity-20 transition-opacity duration-200"></div>
                            <div className="relative p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-green-400">After</h3>
                                    <div className="flex gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    </div>
                                </div>
                                <pre className="bg-zinc-800 p-4 rounded-lg overflow-x-auto">
                                    <code className="text-sm font-mono text-zinc-100">
                                        {`const user = getUser();
const address = user?.profile?.address;
const city = address?.city;
console.log(city);`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-zinc-800">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="flex space-x-6">
                            <a href="https://github.com/dasariumamahesh/chainsafe-website"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-white transition-colors">
                                <Github className="h-6 w-6" />
                            </a>
                            <a href="https://www.npmjs.com/package/chainsafe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-white transition-colors">
                                <Package className="h-6 w-6" />
                            </a>
                            <a href="https://www.linkedin.com/in/umamaheshdasari/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-white transition-colors">
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div>
                        <p className="text-zinc-400">
                            Built with ❤️ by Dasari Uma Mahesh
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChainSafeLanding;