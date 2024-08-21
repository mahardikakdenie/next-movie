import React from 'react';
import Image from 'next/image';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface ModalHeader {
	onClose: () => void;
}

const Header: React.FC<ModalHeader> = ({ onClose }) => {
	return (
		<div className='flex justify-between p-5'>
			<div>
				<h3 className='font-bold'>Search Modal</h3>
			</div>
			<button
				onClick={onClose}
				className='text-gray-600 hover:text-gray-900'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<path d='M6 18L18 6M6 6l12 12' />
				</svg>
			</button>
		</div>
	);
};

const SearchModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
	return (
		isOpen && (
			<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
				<div className='bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-7xl relative'>
					<Header onClose={onClose} />
					<div className='p-4'>
						<div className='px-6 relative sm:block'>
							<input
								type='text'
								className='border w-full p-4 rounded-md'
								placeholder='Search Movie'
							/>
						</div>
						<div className='flex justify-end mt-5'>
							<button
								className='border border-indigo-600 px-5 py-2 text-slate-700 font-bold rounded-lg hover:text-indigo-400'
							>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default SearchModal;
