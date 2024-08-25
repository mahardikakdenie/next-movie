'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import SearchModal from './Modal/search-modal';

const menus = [
	{
		key: '/',
		label: 'Menu',
	},
	{
		key: 'category',
		label: 'Category',
	},
	{
		key: 'account',
		label: 'Account',
	},
];

interface NavLinks {
}
const NavLinks: React.FC<NavLinks> = () => {

	const [currentMenu, setCurrentMenu] = useState<string>('menu');
	const isMenuActive = (key: string): string => {
		let className = '';
		if (currentMenu === key) {
			className = 'font-bold';
		}
		return className;
	};

	return (
		menus && menus.map((menu, index) => (
			<div key={index}>
				<Link href={menu.key} onClick={() => setCurrentMenu(menu.key)}>
					<span className={`text-[15px] hover:font-bold ${isMenuActive(menu.key)}`}>
						{menu.label}
					</span>
				</Link>
			</div>
		))
	);
};

const Navbar = () => {
	const [isOpenSearchVisible, setIsOpenSearchVisible] =
		useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	return (
		<header className='p-3 border-b relative'>
			<div className='p-5 flex justify-center sm:justify-between gap-10 sticky'>
				<div className='flex items-center justify-center'>
					<Link href='/'>
						<Image
							src='/next.svg'
							width={150}
							height={100}
							alt=''
						/>
					</Link>
				</div>
				<div className='w-[50%] relative hidden sm:block'>
					<input
						value={search}
						type='text'
						className='border w-full p-4 rounded-md'
						placeholder='Search Movie'
						onFocus={() => setIsOpenSearchVisible(true)}
						onInput={() => setSearch('')}
					/>
				</div>
				<div className='gap-5 items-center hidden sm:flex'>
					<NavLinks />
				</div>
			</div>
			<SearchModal
				isOpen={isOpenSearchVisible}
				onClose={() => setIsOpenSearchVisible(false)}
			/>
		</header>
	);
};
``;
export default Navbar;
