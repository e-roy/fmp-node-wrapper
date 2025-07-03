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
        <h1 className="text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
          FMP Node Wrapper Documentation
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
          A comprehensive Node.js wrapper for the Financial Modeling Prep API
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/docs/getting-started" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                  🚀 Quick Start
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  Get started with the FMP API wrapper in minutes.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-blue-600 dark:text-blue-400 hover:underline">
                  Get Started →
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/docs/api" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                  📚 API Reference
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  Complete API documentation and examples.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-blue-600 dark:text-blue-400 hover:underline">
                  View API Docs →
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/docs/examples" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                  💡 Examples
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  Practical code samples and use cases.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-blue-600 dark:text-blue-400 hover:underline">
                  View Examples →
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/docs/api/stock" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                  📊 Stock Data
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  Real-time and historical stock data endpoints.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-blue-600 dark:text-blue-400 hover:underline">
                  Stock Endpoints →
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/docs/api/financial" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                  💰 Financial Data
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  Financial statements and ratios endpoints.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-blue-600 dark:text-blue-400 hover:underline">
                  Financial Endpoints →
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/docs/api/forex" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                  💱 Forex Data
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  Foreign exchange rates and currency data.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-blue-600 dark:text-blue-400 hover:underline">
                  Forex Endpoints →
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/docs/api/crypto" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                  🪙 Crypto Data
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  Cryptocurrency quotes and historical data.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-blue-600 dark:text-blue-400 hover:underline">
                  Crypto Endpoints →
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/docs/api/etf" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                  📈 ETF Data
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  ETF quotes, profiles, and holdings data.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-blue-600 dark:text-blue-400 hover:underline">
                  ETF Endpoints →
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/docs/api/market" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                  📊 Market Data
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-300">
                  Market performance, hours, and sector data.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-blue-600 dark:text-blue-400 hover:underline">
                  Market Endpoints →
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-neutral-900 dark:text-white">
                ⚡ Installation
              </CardTitle>
              <CardDescription className="text-neutral-600 dark:text-neutral-300">
                Install the package and start building.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <code className="bg-neutral-950 dark:bg-neutral-900 text-white p-2 rounded text-sm block">
                pnpm add fmp-node-api
              </code>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-2xl text-neutral-900 dark:text-white">
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                  ✅ TypeScript Support
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Full TypeScript support with comprehensive type definitions
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                  🔄 Consistent API
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Uniform response format across all endpoints
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                  🛡️ Error Handling
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Built-in error handling and retry mechanisms
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                  ⚡ Performance
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Optimized for high-performance applications
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                  🌐 Multi-Asset Support
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Stocks, forex, crypto, ETFs, bonds, and more
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                  📊 Market Data
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Real-time market performance and sector data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
