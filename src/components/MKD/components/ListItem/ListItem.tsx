import React from 'react';
import clsx from "clsx";
import {IconCheck} from "@/components/MKD/components/Icons.tsx";
import {setStyle} from "@/lib/dom.ts";
import './style.css';

interface ListItemProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    blocked?: boolean;
    accepted?: boolean;
    hidden?: boolean,
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const ListItem = ({
                      checked,
                      onChange,
                      disabled = false,
                      blocked = false,
                      accepted = false,
                      children = null,
                      className = '',
                      style,
                      hidden = false,
                  }: ListItemProps) => {

    return (!hidden && <div
        className={clsx(
            'parent',
            'flex flex-row ',
            'items-center ',
            'text-[11px]',
            checked && 'checked',
            disabled && 'disabled',
            blocked && 'blocked',
            accepted && 'accepted',
            'w-full h-[24px] pt-[5px] pb-[6px] pl-[12px] pr-[10px] gap-[10px]',
            'select-none',
            className
        )}
        style={{...style}}
        onClick={() => !accepted && !blocked && !disabled && onChange(!checked)}
    >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
             className={clsx(
                 checked && 'checked',
                 disabled && 'disabled',
                 blocked && 'blocked',
                 accepted && 'accepted',
                 'w-[12px] h-[12px]',
                 'content-center justify-items-center',
                 'rounded-[4px] cursor-pointer ',
             )}
             role="switch"
             aria-checked={checked}
        >
            <rect x="0.5" y="0.5" width="11" height="11" rx="3.5" strokeWidth="1" stroke="#000" fill='#ffffff'/>
            <path d="M3 5.81818L5.7 8L9 4" stroke="#006FBA" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div>{children}</div>
    </div>);
};

export default ListItem;