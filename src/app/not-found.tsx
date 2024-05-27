import Link from "next/link"
import Image from 'next/image'

export default function NotFound() {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 px-4 text-center">
            <div className="max-w-md space-y-4">
                <h1 className="text-8xl font-bold tracking-tighter text-gray-50">404</h1>
                <p className="text-lg font-medium text-gray-400">Oops, the page you are looking for does not exist.</p>
                <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                    href="/"
                >
                    Go back home
                </Link>
            </div>
            <div className="mt-12 max-w-md">
                <Image
                    alt="404 illustration"
                    className="mx-auto"
                    height="300"
                    src="/not-found.webp"
                    style={{
                        aspectRatio: "300/300",
                        objectFit: "cover"
                    }}

                    width="300"
                />
            </div>
        </main>
    )
}