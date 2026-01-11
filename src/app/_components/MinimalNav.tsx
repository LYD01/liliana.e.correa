"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

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
                            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded ${
                                isModalRoute ? 'text-xs' : 'text-sm'
                            } ${
                                currentPath === "/"
                                    ? "text-grey-900 font-bold underline underline-offset-4"
                                    : "text-grey-700 hover:text-grey-900 font-normal"
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/contact-us"
                            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded ${
                                isModalRoute ? 'text-xs' : 'text-sm'
                            } ${
                                currentPath === "/contact-us"
                                    ? "text-grey-900 font-bold underline underline-offset-4"
                                    : "text-grey-700 hover:text-grey-900 font-normal"
                            }`}
                        >
                            Contact
                        </Link>
                        {/* Theme Toggle Button - HIDDEN BUT DO NOT DELETE
                            This component provides theme switching functionality.
                            It's currently hidden but the functionality is still active.
                            To show it again, remove the 'hidden' class below. */}
                        <div className="pt-2 hidden">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile: Navigation bar at bottom */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    {/* Solid background, full width, no gaps */}
                    <div className="bg-white dark:bg-grey-900 border-t border-grey-300 dark:border-grey-700 transition-colors duration-200">
                        <div className="flex items-center justify-center gap-6 py-3">
                            <Link
                                href="/"
                                className={`text-sm transition-colors ${
                                    currentPath === "/"
                                        ? "text-grey-900 font-bold underline underline-offset-4"
                                        : "text-grey-600 font-normal"
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/contact-us"
                                className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 rounded ${
                                    currentPath === "/contact-us"
                                        ? "text-grey-900 font-bold underline underline-offset-4"
                                        : "text-grey-700 font-normal"
                                }`}
                            >
                                Contact
                            </Link>
                            {/* Theme Toggle Button - HIDDEN BUT DO NOT DELETE
                                This component provides theme switching functionality.
                                It's currently hidden but the functionality is still active.
                                To show it again, remove the 'hidden' class below. */}
                            <div className="hidden">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
