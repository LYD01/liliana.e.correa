"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MinimalNav() {
    const currentPath = usePathname();
    const isModalRoute = currentPath?.startsWith('/works/');

    return (
        <>
            {/* Desktop: Left sidebar navigation */}
            <nav className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 bg-transparent pointer-events-none w-40">
                <div className="h-full flex flex-col items-start justify-start pointer-events-auto w-full">
                    <div className={`flex flex-col gap-5 px-6 pt-8 ${
                        isModalRoute ? 'pt-6' : ''
                    }`}>
                        {/* Navigation links - vertical stack */}
                        <Link
                            href="/"
                            className={`transition-colors ${
                                isModalRoute ? 'text-xs' : 'text-sm'
                            } ${
                                currentPath === "/"
                                    ? "text-white font-bold underline underline-offset-4"
                                    : "text-gray-400 hover:text-white font-normal"
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/contact-us"
                            className={`transition-colors ${
                                isModalRoute ? 'text-xs' : 'text-sm'
                            } ${
                                currentPath === "/contact-us"
                                    ? "text-white font-bold underline underline-offset-4"
                                    : "text-gray-400 hover:text-white font-normal"
                            }`}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile: Navigation bar at bottom */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    {/* Solid background, full width, no gaps */}
                    <div className="bg-gray-900 border-t border-gray-700/30">
                        <div className="flex items-center justify-center gap-8 py-3">
                            <Link
                                href="/"
                                className={`text-sm transition-colors ${
                                    currentPath === "/"
                                        ? "text-white font-bold underline underline-offset-4"
                                        : "text-gray-400 font-normal"
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/contact-us"
                                className={`text-sm transition-colors ${
                                    currentPath === "/contact-us"
                                        ? "text-white font-bold underline underline-offset-4"
                                        : "text-gray-400 font-normal"
                                }`}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
