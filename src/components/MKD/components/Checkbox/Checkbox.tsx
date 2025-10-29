import React from 'react';
import clsx from "clsx";
import './style.css';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean, e: React.MouseEvent<SVGElement, MouseEvent>) => void;
    disabled?: boolean;
    blocked?: boolean;
    accepted?: boolean;
    hidden?: boolean,
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Checkbox = ({
                      checked,
                      onChange,
                      disabled = false,
                      blocked = false,
                      accepted = false,
                      className = '',
                      style,
                      hidden = false,
                  }: CheckboxProps) => {

    return (!hidden &&
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
             className={
                 clsx(
                     'custom-checkbox',
                     checked && 'checked',
                     disabled && 'disabled',
                     blocked && 'blocked',
                     accepted && 'accepted',
                     'w-[12px] h-[12px]',
                     'content-center justify-items-center',
                     'rounded-[4px] cursor-pointer ',
                     className)
             }
             style={{...style}}
             role="switch"
             aria-checked={checked}
             onClick={(e) => !accepted && !blocked && !disabled && onChange(!checked, e)}
        >

            <rect x="0.5" y="0.5" width="11" height="11" rx="3.5" strokeWidth="1" stroke="#000" fill='#ffffff'/>
            <path d="M3 5.81818L5.7 8L9 4" stroke="#006FBA" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>);
};

export default Checkbox;