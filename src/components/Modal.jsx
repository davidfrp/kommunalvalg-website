import { useEffect } from 'react';
import ReactDOM from "react-dom";

function Modal(props) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                props.onRequestClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [props]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            props.onRequestClose();
        }
    };

    if (!props.isOpen)
        return null;

    return ReactDOM.createPortal(
        <div className="fixed z-10 before:bg-black before:opacity-20
            before:fixed before:top-0 before:left-0 before:right-0 before:bottom-0"
            onClick={handleOverlayClick}>
            <aside role="dialog" className="fixed bottom-0 z-20 shadow-lg
                max-h-[calc(100vh-2rem)] w-full bg-white 
                overflow-hidden pb-[env(safe-area-inset-bottom)]
                sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2
                sm:bottom-auto sm:max-w-md">
                <header className="p-4 pt-8">
                    <h1 className="text-4xl font-semibold">{props.title}</h1>
                </header>
                <div className="p-4 max-h-[calc(100vh-2rem)] 
                    overflow-hidden overflow-y-auto">
                    {props.children}
                </div>
            </aside>
        </div>,
        document.body
    );
}

export default Modal;
