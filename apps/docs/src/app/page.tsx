'use client';

import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
            FMP Node Wrapper
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-4">
            Choose the library that fits your needs
          </p>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            A comprehensive Node.js ecosystem for the Financial Modeling Prep API
          </p>
        </div>

        {/* Main Library Selection */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {/* FMP Node API */}
          <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <CardTitle className="text-3xl text-neutral-900 dark:text-white">
                FMP Node API
              </CardTitle>
              <CardDescription className="text-lg text-neutral-600 dark:text-neutral-300">
                Core API wrapper for direct FMP API access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Complete TypeScript support
                </div>
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  All FMP endpoints covered
                </div>
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Built-in validation & error handling
                </div>
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Modular design for flexibility
                </div>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900 p-3 rounded-lg">
                <code className="text-sm text-neutral-800 dark:text-neutral-200">
                  npm install fmp-node-api
                </code>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Link
                href="/docs/api"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View API Documentation →
              </Link>
            </CardFooter>
          </Card>

          {/* FMP Tools */}
          <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-800">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <CardTitle className="text-3xl text-neutral-900 dark:text-white">FMP Tools</CardTitle>
              <CardDescription className="text-lg text-neutral-600 dark:text-neutral-300">
                AI tools for Vercel AI SDK and LLM integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Vercel AI SDK integration
                </div>
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Ready-to-use AI tools
                </div>
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Multi-platform AI support
                </div>
                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Chatbot & assistant ready
                </div>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900 p-3 rounded-lg">
                <code className="text-sm text-neutral-800 dark:text-neutral-200">
                  npm install fmp-tools
                </code>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Link
                href="/docs/tools"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                View Tools Documentation →
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-2xl text-neutral-900 dark:text-white text-center">
              Why Choose FMP Node Wrapper?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                  High Performance
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Optimized for speed and efficiency
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">Type Safe</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Full TypeScript support throughout
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔧</div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">Easy to Use</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Simple, intuitive API design
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🤖</div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">AI Ready</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Built-in AI tool integrations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
