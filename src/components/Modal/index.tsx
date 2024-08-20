import React from 'react';
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    trailerUrl: string;
    nameMovie: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, trailerUrl, nameMovie = '' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-7xl relative">
                <div className='flex justify-between p-5'>
                    <div>
                        <h3 className='text-xl font-bold'>Trailler {nameMovie}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    <iframe
                        className='rounded-lg'
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${trailerUrl}`}
                        title="Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                    <div className='flex justify-end mt-5'>
                        <button 
                            className='border p-2 bg-indigo-600 text-white font-bold border-indigo-600 rounded-lg hover:bg-indigo-400' 
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
