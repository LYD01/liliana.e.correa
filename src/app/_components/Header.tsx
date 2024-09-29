"use client"
import { header } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import { Menu } from "./Menu/Menu";
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(0);
    const handleMenuButonClick = function () {
        isMenuOpen === 1 ? setIsMenuOpen(0) : setIsMenuOpen(1);
    }

    return (
        <header className="sticky ml-2 top-10">
            <div className="absolute">
                <div className="opacity-99" >
                    <button onClick={handleMenuButonClick} id="menu-button"
                        className=" rounded w-[3rem] h-[3rem] gap-1 flex items-center flex-col-reverse">
                        <Image
                            className="h-full w-full rounded-[50%]"
                            src="/img/LEC-mural.jpg"
                            height={30} width={30} alt="Lilianan Logo"
                        />
                        <label htmlFor="#menu-button" className="block text-white h-full cursor-pointer">Menu</label>
                    </button>
                </div >
                <div className={`rounded bg-blue-500 w-[10rem] z-10 ${isMenuOpen === 1 ? "block" : "hidden"}`}>
                    <ul className=" flex flex-col gap-1 select-text text-white">
                        <li className="w-full">
                            <Link href="/" className="flex items-center justify-between py-4 pl-1 pr-4 hover:bg-blue-600"
                                onClick={() => setIsMenuOpen(0)}>
                                <Image className="w-8 h-8" src={`/icons/home_24dp_FILL0_wght400_GRAD0_opsz24.svg`} alt="navigate to home us page" height={10} width={10} />
                                Home
                            </Link>
                        </li>
                        <li className="">
                            <Link
                                onClick={() => setIsMenuOpen(0)}
                                href="/about" className="flex items-center justify-between py-4 pl-1 pr-4 hover:bg-blue-600">
                                <Image className="w-8 h-8" src={`/icons/person_24dp_FILL0_wght400_GRAD0_opsz24.svg`} alt="navigate to about us page" height={10} width={10} />
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setIsMenuOpen(0)}
                                href="/works/" className="flex items-center justify-between py-4 pl-1 pr-4 hover:bg-blue-600">
                                <Image className="w-8 h-8" src={`/icons/article_24dp_FILL0_wght400_GRAD0_opsz24.svg`} alt="navigate to about liliana's creative works page" height={10} width={10} />
                                Works
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setIsMenuOpen(0)}
                                href="/contact-us" className="flex items-center justify-between py-4 pl-1 pr-4 hover:bg-blue-600 ">
                                <Image className="w-8 h-8" src={`/icons/mail_24dp_FILL0_wght400_GRAD0_opsz24.svg`} alt="navigate to about liliana's contact us page" height={10} width={10} /> Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header >
        // <header>
        //     <Menu />
        // </header>

    );
}
