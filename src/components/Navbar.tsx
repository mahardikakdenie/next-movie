"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchModal from "./Modal/search-modal";

const menus = [
    {
        key: 'menu',
        label: 'Menu',
    },
    {
        key: 'category',
        label: 'Category',
    },
    {
        key: 'account',
        label: 'Account',
    }
];

const Navbar = () => {
    const currentMenu = 'menu';
    const [isOpenSearchVisible, setIsOpenSearchVisible] = useState<boolean>(false);

    return (
        <header className="p-3 border-b relative">
            <div className="p-5 flex justify-center sm:justify-between gap-10 sticky">
                <div className="flex items-center justify-center">
                    <Link href="/">
                        <Image src="/next.svg" width={180} height={300} alt="" />
                    </Link>
                </div>
                <div className="w-[50%] relative hidden sm:block">
                    <input type="text" className="border w-full p-4 rounded-md" placeholder="Search Movie" onFocus={() => setIsOpenSearchVisible(true)} />
                </div>
                <div className="gap-5 items-center hidden sm:flex">
                    {
                        menus && menus.map(menu => (
                            <div key={menu.key}>
                                <Link href={menu.key}>
                                    <span className={`text-md ${currentMenu === menu.key ? 'font-bold' : ''}`}>{menu.label}</span>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            <SearchModal isOpen={isOpenSearchVisible} onClose={() => setIsOpenSearchVisible(false)} />
        </header>
    );
};
export default Navbar;
