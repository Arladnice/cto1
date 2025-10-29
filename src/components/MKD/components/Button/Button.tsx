import React, {CSSProperties, FC, ReactNode, useEffect} from "react";
import clsx from "clsx";
import {IStyledColor} from "./button.types.ts";
import styles from "./button.styles.ts";
import {setStyle} from "@/lib/dom.ts";
import {IconLoader} from "../Icons.tsx";

const SIZE = {
    default: {
        'M': {
            '': `h-[28px] py-[6px] px-[15px]`,
            'L': `h-[28px] py-[6px] pl-[10px] pr-[15px]`,
            'R': `h-[28px] py-[6px] pl-[15px] pr-[10px]`,
            'LR': `h-[28px] py-[6px] pl-[10px] pr-[10px]`,
        },
        'S': {
            '': `h-[24px] py-[4px] px-[15px]`,
            'L': `h-[24px] py-[4px] pl-[10px] pr-[15px]`,
            'R': `h-[24px] py-[4px] pl-[10px] pr-[10px]`,
            'LR': `h-[24px] py-[4px] pl-[10px] pr-[10px]`
        },
    },
    forModal: {
        'M': {
            '': `h-[38px] py-[6px] px-[15px]`,
            'L': `h-[38px] py-[6px] px-[15px]`,
            'R': `h-[38px] py-[6px] px-[15px]`,
            'LR': `h-[38px] py-[6px] px-[15px]`
        },
        'S': {
            '': `h-[30px] py-[4px] px-[15px]`,
            'L': `h-[30px] py-[4px] px-[15px]`,
            'R': `h-[30px] py-[4px] px-[15px]`,
            'LR': `h-[30px] py-[4px] px-[15px]`
        }
    },
}

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    type?: "primary" | "outlined" | "secondary" | "subtle" | "forModal";
    color?: "blue" | "gray" | "green" | "red";
    className?: string;
    onClick: (e:any) => void;
    loading?: boolean;
    disabled?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    size?: "M" | "S";
    style?: CSSProperties;
}

const getStyleItem = (type: string, colorScheme: string, field: string, mod: string = '', imp = false) => {
    const style = styles?.[type]?.[colorScheme]?.[field] as IStyledColor;
    let _imp = (imp ? '!important' : '');
    //language=css
    return `.${type}-${colorScheme}${mod} {
        ${style.bg ? 'background-color:' + style.bg + _imp + ';' : ''}
        ${style.text ? 'color:' + style.text + _imp + ';' : ''}
        ${style.border ? `box-shadow: inset 0 0 0 1px ${style.border + _imp};` : ''}
    }
    `;
}
const getStyleIcon = (type: string, colorScheme: string, field: string, mod: string = '', imp = false) => {
    const style = styles?.[type]?.[colorScheme]?.[field] as IStyledColor;
    let _imp = (imp ? '!important' : '');
    //language=css
    return `
        .${type}-${colorScheme}${mod} svg path.icon-fill {
            ${style.icon ? 'fill:' + style.icon + _imp + ';' : ''}
        }

        .${type}-${colorScheme}${mod} svg path.icon-stroke {
            ${style.icon ? 'stroke:' + style.icon + _imp + ';' : ''}
        }
    `;
}

const Button: FC<ButtonProps> = ({
                                     type = 'primary',
                                     color = 'blue',
                                     onClick,
                                     className = '',
                                     loading = false,
                                     disabled = false,
                                     size = 'M',
                                     iconLeft = null, iconRight = null,
                                     children,
                                     style = {},
                                 }) => {

    useEffect(() => {
        //language=css
        setStyle(`
            ${getStyleItem(type, color, 'default', '')}
            ${getStyleItem(type, color, 'hover', ':hover')}
            ${getStyleItem(type, color, 'active', ':active')}
            ${getStyleItem(type, color, 'disabled', ':disabled', true)}
            ${getStyleItem(type, color, 'loading', '.loading')}
            ${getStyleIcon(type, color, 'default', '')}
            ${getStyleIcon(type, color, 'loading', '.loading')}
            ${getStyleIcon(type, color, 'disabled', '.disabled')}
        `, `btn-${type}-${color}`)
    }, []);

    const posLR = (iconLeft ? 'L' : '') + (iconRight ? 'R' : '');
    const subType = type == 'forModal' ? 'forModal' : 'default';

    // const style = styles?.[type]?.[color]?.[field] as IStyledColor;

    const slot = {
        left: loading && iconLeft ? <IconLoader/> : iconLeft ? iconLeft : '',
        center: !iconLeft && !iconRight && loading ? <IconLoader/> : children,
        right: loading && !iconLeft && iconRight ? <IconLoader/> : iconRight ? iconRight : '',
    };

    return <button
        onClick={(e)=>onClick(e)}
        className={clsx(
            `${type}-${color}`,
            SIZE[subType][size][posLR] ?? '',
            'flex flex-row ',
            'items-center',
            'rounded-[6px]',
            'text-[11px]',
            'gap-[8px]',
            className,
            loading && 'loading',
            disabled && 'disabled'
        )}
        disabled={disabled}
        style={style}
    >
        {slot.left}
        <div className="w-[100%] justify-items-center">
            {slot.center}
        </div>
        {slot.right}
    </button>;
};

export default Button;