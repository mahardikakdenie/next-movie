'use client'; // Add this directive
import React from 'react';
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    trailerUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, trailerUrl }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl relative">
                <button
                    onClick={() => onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                <div className="p-4">
                    <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailerUrl}`}
                        title="Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Modal;
