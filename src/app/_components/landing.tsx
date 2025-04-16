import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Zap, Database } from "lucide-react";

export default async function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Navigation */}
            <header className="container mx-auto py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Bot className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold">AgentFlow</span>
                </div>
                <nav className="hidden md:flex space-x-6 items-center">
                    <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
                    <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</Link>
                    <Button asChild>
                        <Link href="/api/auth/signin">Log In</Link>
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Button asChild>
                        <Link href="/api/auth/signin">Log In</Link>
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto py-20 text-center">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl mb-6">
                    Automate your workflow with <span className="text-blue-600">intelligent agents</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Create, manage, and deploy AI-powered automation agents without writing a single line of code.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="text-lg px-8">
                        <Link href="/api/auth/signin">Get Started</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-lg px-8">
                        <Link href="#how-it-works" className="flex items-center">
                            Learn More <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Feature Section */}
            <section id="features" className="bg-gray-50 py-20">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Visual Workflow Builder</h3>
                                <p className="text-gray-600">
                                    Drag and drop interface to create powerful automation workflows without coding.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                                    <Bot className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">AI-Powered Agents</h3>
                                <p className="text-gray-600">
                                    Intelligent agents that can understand and process your emails, messages, and data.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                                    <Database className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Seamless Integrations</h3>
                                <p className="text-gray-600">
                                    Connect with your favorite tools and services without complex setup.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="container mx-auto py-20">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="rounded-full bg-blue-600 text-white text-xl font-bold h-12 w-12 flex items-center justify-center mx-auto mb-6">
                            1
                        </div>
                        <h3 className="text-xl font-bold mb-2">Create an Agent</h3>
                        <p className="text-gray-600">
                            Define what triggers your agent and what actions it should take.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="rounded-full bg-blue-600 text-white text-xl font-bold h-12 w-12 flex items-center justify-center mx-auto mb-6">
                            2
                        </div>
                        <h3 className="text-xl font-bold mb-2">Design the Workflow</h3>
                        <p className="text-gray-600">
                            Build your workflow with our intuitive visual editor.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="rounded-full bg-blue-600 text-white text-xl font-bold h-12 w-12 flex items-center justify-center mx-auto mb-6">
                            3
                        </div>
                        <h3 className="text-xl font-bold mb-2">Activate and Monitor</h3>
                        <p className="text-gray-600">
                            Turn on your agent and watch it automate your tasks.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to automate your workflow?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of users who are saving time with our powerful automation platform.
                    </p>
                    <Button asChild size="lg" variant="secondary" className="text-blue-600 bg-white hover:bg-gray-100 text-lg px-8">
                        <Link href="/api/auth/signin">Get Started Now</Link>
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-6 md:mb-0">
                            <Bot className="h-8 w-8 text-blue-400" />
                            <span className="text-2xl font-bold">AgentFlow</span>
                        </div>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-gray-300 hover:text-white">Privacy Policy</Link>
                            <Link href="#" className="text-gray-300 hover:text-white">Terms of Service</Link>
                            <Link href="#" className="text-gray-300 hover:text-white">Contact</Link>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-400">
                        <p>© {new Date().getFullYear()} AgentFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}