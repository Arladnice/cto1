import clsx from 'clsx';
import React, {createContext, useContext, useEffect} from 'react';

// Компонент Modal
const Modal = ({show, onHide = null, children, backgroundColor = 'hsla(0,0%,0%,20%)'}) => {

    // Обработка Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onHide && onHide();
        };

        if (show) document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [show, onHide && onHide]);

    if (!show) return null;

    return (
        <div className={clsx(
            'fixed top-0 right-0',
            ' overflow-hidden',
            "flex w-screen h-screen ",
            "items-center ",
            "justify-center",
            'z-1'
        )}>
            {/* backdrop */}
            <div className={`fixed top-0 left-0 w-screen h-screen -z-10`}
                 onClick={onHide && onHide}
                 style={{backgroundColor}}
            ></div>
            {/* Модальное окно */}
            {children}
        </div>
    );
};

export default Modal;