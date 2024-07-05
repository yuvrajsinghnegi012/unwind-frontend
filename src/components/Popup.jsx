import{ useState } from 'react';

function Popup() {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <div className={`flex items-center justify-center text-[.85rem] md:[.9rem] lg:[.95rem] ${ isOpen ? "h-screen " : ''}`}>
            <div className="flex flex-col items-center justify-center">
                <button onClick={openPopup} className={`border-[2px] text-orange-500 cursor-pointer rounded-3xl border-orange-500 ${isOpen ? "hidden ": "block "} font-semibold py-2 px-4`}>
                    Demo Credentials
                </button>
                {isOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-8 max-w-sm w-full">
                            <div className="flex justify-end">
                                <button onClick={closePopup} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-4">
                                <p className="text-lg font-semibold">Demo Credentials</p>
                                <p className="mt-2">Email: humpy01@gmail.com</p>
                                <p>Password: Hello@123</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Popup;
