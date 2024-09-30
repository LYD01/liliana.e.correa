"use client"
import { header } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MENU_ITEMS } from "../_constants";
import { usePathname } from "next/navigation";
// import { Menu } from "./Menu/Menu";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const currentPath = usePathname();

    const handleMenuButtonClick = function () {
        setIsMenuOpen(prevState => !prevState);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky ml-2 top-10 z-30" ref={menuRef}>
            <div className="absolute">
                <div className="opacity-99" >
                    <button onClick={handleMenuButtonClick} id="menu-button"
                        className=" rounded w-[3rem] h-[3rem] gap-1 flex items-center flex-col-reverse">
                        <Image
                            className="h-full w-full rounded-[50%]"
                            src="/img/LEC-mural.jpg"
                            height={30} width={30} alt="Lilianan Logo"
                        />
                        <label htmlFor="#menu-button" className="block text-white h-full cursor-pointer">Menu</label>
                    </button>
                </div >
                <div className={`rounded bg-blue-500 w-[10rem] z-10 ${isMenuOpen ? "block" : "hidden"}`}>
                    <ul className=" flex flex-col  select-text text-white">
                        {MENU_ITEMS.map((item) => (
                            <li key={item.href} className="w-full">
                                <Link
                                    href={item.href}
                                    className={`flex items-center justify-between py-4 pl-1 pr-4 ${currentPath === item.href ? 'bg-blue-600' : 'hover:bg-blue-600'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Image className="w-8 h-8" src={item.icon} alt={`Navigate to ${item.label} page`} height={10} width={10} />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header >
        // <header>
        //     <Menu />
        // </header>

    );
}
