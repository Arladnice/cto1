import React, { CSSProperties, useEffect, useRef, useState } from 'react';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    style?: CSSProperties;
    size?: number;
    color?: string | null;
    isInheritStyle?: boolean;
}

const stroke = (isInheritStyle) => ({ className: isInheritStyle ? 'icon-stroke' : '' });
const fill = (isInheritStyle) => ({ className: isInheritStyle ? 'icon-fill' : '' });

export const IconChevronLeft = ({
    className,
    style,
    size = 16,
    color = '#73858F',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg
            width={size}
            height={size}
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <path
                {...stroke(inh)}
                d='M9.5 11L6.5 8L9.5 5'
                stroke={color}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </div>
);

export const IconChevronRight = ({
    className,
    style,
    size = 16,
    color = '#73858F',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg
            width={size}
            height={size}
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <path
                {...stroke(inh)}
                d='M6.5 11L9.5 8L6.5 5'
                stroke={color}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </div>
);

export const IconRightArrow = ({
    className,
    style,
    size = 7,
    color = '#B3BDC2',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width='4' height='7' viewBox='0 0 4 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...fill(inh)}
                d='M0.146447 0.146447C0.341709 -0.0488155 0.658216 -0.0488155 0.853478 0.146447L3.85348 3.14645C4.04874 3.34171 4.04874 3.65822 3.85348 3.85348L0.853478 6.85348C0.658216 7.04874 0.341709 7.04874 0.146447 6.85348C-0.0488155 6.65822 -0.0488155 6.34171 0.146447 6.14645L2.79293 3.49996L0.146447 0.853478C-0.0488155 0.658216 -0.0488155 0.341709 0.146447 0.146447Z'
                fill={color}
            />
        </svg>
    </div>
);

export const IconChevronDown = ({
    className,
    style,
    size = 16,
    color = '#73858F',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M11 6.5L8 9.5L5 6.5'
                stroke={color}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </div>
);

export const IconChevronUp = ({
    className,
    style,
    size = 16,
    color = '#99A6AD',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M5 9.5L8 6.5L11 9.5'
                stroke={color}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </div>
);

export const IconCalendar = ({
    className,
    style,
    size = 16,
    color = '#002033',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...fill(inh)}
                d='M5 8.18182C4.911 8.18182 4.824 8.15516 4.74999 8.10521C4.67599 8.05527 4.61831 7.98428 4.58425 7.90122C4.55019 7.81816 4.54128 7.72677 4.55865 7.6386C4.57601 7.55042 4.61887 7.46943 4.6818 7.40586C4.74474 7.34229 4.82492 7.299 4.91221 7.28146C4.9995 7.26392 5.08998 7.27292 5.17221 7.30733C5.25443 7.34173 5.32471 7.39999 5.37416 7.47474C5.42361 7.54949 5.45 7.63737 5.45 7.72727C5.45 7.84783 5.40259 7.96344 5.3182 8.04869C5.23381 8.13393 5.11935 8.18182 5 8.18182ZM2.75 8.18182C2.661 8.18182 2.574 8.15516 2.49999 8.10521C2.42599 8.05527 2.36831 7.98428 2.33425 7.90122C2.30019 7.81816 2.29128 7.72677 2.30865 7.6386C2.32601 7.55042 2.36887 7.46943 2.4318 7.40586C2.49474 7.34229 2.57492 7.299 2.66221 7.28146C2.7495 7.26392 2.83998 7.27292 2.92221 7.30733C3.00443 7.34173 3.07472 7.39999 3.12416 7.47474C3.17361 7.54949 3.2 7.63737 3.2 7.72727C3.2 7.84783 3.15259 7.96344 3.0682 8.04869C2.98381 8.13393 2.86935 8.18182 2.75 8.18182ZM2.75 6.36364C2.661 6.36364 2.574 6.33698 2.49999 6.28703C2.42599 6.23709 2.36831 6.1661 2.33425 6.08304C2.30019 5.99998 2.29128 5.90859 2.30865 5.82041C2.32601 5.73224 2.36887 5.65125 2.4318 5.58768C2.49474 5.52411 2.57492 5.48082 2.66221 5.46328C2.7495 5.44574 2.83998 5.45474 2.92221 5.48915C3.00443 5.52355 3.07472 5.58181 3.12416 5.65656C3.17361 5.73131 3.2 5.81919 3.2 5.90909C3.2 6.02964 3.15259 6.14526 3.0682 6.2305C2.98381 6.31575 2.86935 6.36364 2.75 6.36364ZM5 6.36364C4.911 6.36364 4.824 6.33698 4.74999 6.28703C4.67599 6.23709 4.61831 6.1661 4.58425 6.08304C4.55019 5.99998 4.54128 5.90859 4.55865 5.82041C4.57601 5.73224 4.61887 5.65125 4.6818 5.58768C4.74474 5.52411 4.82492 5.48082 4.91221 5.46328C4.9995 5.44574 5.08998 5.45474 5.17221 5.48915C5.25443 5.52355 5.32471 5.58181 5.37416 5.65656C5.42361 5.73131 5.45 5.81919 5.45 5.90909C5.45 6.02964 5.40259 6.14526 5.3182 6.2305C5.23381 6.31575 5.11935 6.36364 5 6.36364ZM1.85 0.909091H2.3V0.454545C2.3 0.333993 2.34741 0.218377 2.4318 0.133133C2.51619 0.0478895 2.63065 0 2.75 0C2.86935 0 2.98381 0.0478895 3.0682 0.133133C3.15259 0.218377 3.2 0.333993 3.2 0.454545V0.909091H6.8V0.454545C6.8 0.333993 6.84741 0.218377 6.9318 0.133133C7.01619 0.0478895 7.13065 0 7.25 0C7.36935 0 7.48381 0.0478895 7.5682 0.133133C7.65259 0.218377 7.7 0.333993 7.7 0.454545V0.909091H8.15C8.50804 0.909091 8.85142 1.05276 9.10459 1.30849C9.35777 1.56422 9.5 1.91107 9.5 2.27273V8.63636C9.5 8.99802 9.35777 9.34487 9.10459 9.6006C8.85142 9.85633 8.50804 10 8.15 10H1.85C1.49196 10 1.14858 9.85633 0.895406 9.6006C0.642232 9.34487 0.5 8.99802 0.5 8.63636V2.27273C0.5 1.91107 0.642232 1.56422 0.895406 1.30849C1.14858 1.05276 1.49196 0.909091 1.85 0.909091ZM1.4 8.63636C1.4 8.75692 1.44741 8.87253 1.5318 8.95778C1.61619 9.04302 1.73065 9.09091 1.85 9.09091H8.15C8.26935 9.09091 8.38381 9.04302 8.4682 8.95778C8.55259 8.87253 8.6 8.75692 8.6 8.63636V4.54545H1.4V8.63636ZM1.4 3.63636H8.6V2.27273C8.6 2.15217 8.55259 2.03656 8.4682 1.95132C8.38381 1.86607 8.26935 1.81818 8.15 1.81818H7.7V2.27273C7.7 2.39328 7.65259 2.5089 7.5682 2.59414C7.48381 2.67938 7.36935 2.72727 7.25 2.72727C7.13065 2.72727 7.01619 2.67938 6.9318 2.59414C6.84741 2.5089 6.8 2.39328 6.8 2.27273V1.81818H3.2V2.27273C3.2 2.39328 3.15259 2.5089 3.0682 2.59414C2.98381 2.67938 2.86935 2.72727 2.75 2.72727C2.63065 2.72727 2.51619 2.67938 2.4318 2.59414C2.34741 2.5089 2.3 2.39328 2.3 2.27273V1.81818H1.85C1.73065 1.81818 1.61619 1.86607 1.5318 1.95132C1.44741 2.03656 1.4 2.15217 1.4 2.27273V3.63636ZM7.25 6.36364C7.161 6.36364 7.074 6.33698 6.99999 6.28703C6.92599 6.23709 6.86831 6.1661 6.83425 6.08304C6.80019 5.99998 6.79128 5.90859 6.80865 5.82041C6.82601 5.73224 6.86887 5.65125 6.9318 5.58768C6.99474 5.52411 7.07492 5.48082 7.16221 5.46328C7.2495 5.44574 7.33998 5.45474 7.42221 5.48915C7.50443 5.52355 7.57471 5.58181 7.62416 5.65656C7.67361 5.73131 7.7 5.81919 7.7 5.90909C7.7 6.02964 7.65259 6.14526 7.5682 6.2305C7.48381 6.31575 7.36935 6.36364 7.25 6.36364ZM7.25 8.18182C7.161 8.18182 7.074 8.15516 6.99999 8.10521C6.92599 8.05527 6.86831 7.98428 6.83425 7.90122C6.80019 7.81816 6.79128 7.72677 6.80865 7.6386C6.82601 7.55042 6.86887 7.46943 6.9318 7.40586C6.99474 7.34229 7.07492 7.299 7.16221 7.28146C7.2495 7.26392 7.33998 7.27292 7.42221 7.30733C7.50443 7.34173 7.57471 7.39999 7.62416 7.47474C7.67361 7.54949 7.7 7.63737 7.7 7.72727C7.7 7.84783 7.65259 7.96344 7.5682 8.04869C7.48381 8.13393 7.36935 8.18182 7.25 8.18182Z'
                fill={color}
                fillOpacity='0.3'
            />
        </svg>
    </div>
);

export const IconPlus = ({ className, style, size = 16, color = 'white', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path {...stroke(inh)} d='M8 3V13' stroke={color} strokeLinecap='round' strokeLinejoin='round' />
            <path {...stroke(inh)} d='M3 8L13 8' stroke={color} strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    </div>
);

export const IconFilter = ({
    className,
    style,
    size = 16,
    color = '#B3BDC2',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M7.4 0H0.6C0.544772 0 0.5 0.0447715 0.5 0.1V0.917157C0.5 0.970201 0.521071 1.02107 0.558579 1.05858L3.47071 3.97071C3.48946 3.98946 3.5 4.0149 3.5 4.04142V6.75858C3.5 6.84767 3.60771 6.89229 3.67071 6.82929L4.47071 6.02929C4.48946 6.01054 4.5 5.9851 4.5 5.95858V4.04142C4.5 4.0149 4.51054 3.98946 4.52929 3.97071L7.44142 1.05858C7.47893 1.02107 7.5 0.970201 7.5 0.917157V0.1C7.5 0.0447715 7.45523 0 7.4 0Z'
                fill={color}
            />
        </svg>
    </div>
);

export const IconColumn = ({
    className,
    style,
    size = 16,
    color = '#002033',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M9.16667 0.499512H12.5C13.0523 0.499512 13.5 0.947227 13.5 1.49951V12.5004C13.5 13.0527 13.0523 13.5004 12.5 13.5004H9.16667M9.16667 0.499512V13.5004M9.16667 0.499512H4.83333M9.16667 13.5004H4.83333M4.83333 13.5004H1.5C0.947715 13.5004 0.5 13.0527 0.5 12.5004V1.49951C0.5 0.947227 0.947715 0.499512 1.5 0.499512H4.83333M4.83333 13.5004V0.499512'
                stroke={color}
                strokeOpacity='0.3'
                strokeLinecap='round'
            />
        </svg>
    </div>
);

export const IconZoom = ({ className, style, size = 16, color = '#B3BDC2', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle {...stroke(inh)} cx='5.5' cy='5.5' r='3' stroke={color} />
            <path
                {...fill(inh)}
                d='M9.14645 9.85355C9.34171 10.0488 9.65829 10.0488 9.85355 9.85355C10.0488 9.65829 10.0488 9.34171 9.85355 9.14645L9.14645 9.85355ZM7.14645 7.85355L9.14645 9.85355L9.85355 9.14645L7.85355 7.14645L7.14645 7.85355Z'
                fill={color}
            />
        </svg>
    </div>
);

export const IconUnsorted = ({
    className,
    style,
    size = 16,
    color = 'white',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <mask id='path-1-inside-1_3644_1967' fill={color}>
                <path d='M7 1.19209e-07V1H0V0L7 1.19209e-07Z' />
                <path d='M5 4V3H0V4H5Z' />
                <path d='M8 7V6L0 6V7L8 7Z' />
            </mask>
            <path {...fill(inh)} d='M7 1.19209e-07V1H0V0L7 1.19209e-07Z' fill={color} />
            <path {...fill(inh)} d='M5 4V3H0V4H5Z' fill={color} />
            <path {...fill(inh)} d='M8 7V6L0 6V7L8 7Z' fill={color} />
            <path
                {...fill(inh)}
                d='M7 1V2H8V1H7ZM7 1.19209e-07H8V-1H7V1.19209e-07ZM0 1H-1V2H0V1ZM0 0L1.70299e-08 -1H-1V0H0ZM5 3H6V2H5V3ZM5 4V5H6V4H5ZM0 3V2H-1V3H0ZM0 4H-1V5H0V4ZM8 6H9V5H8V6ZM8 7V8H9V7H8ZM0 6L-5.96046e-08 5H-1V6H0ZM0 7H-1V8H5.96046e-08L0 7ZM8 1V1.19209e-07H6V1H8ZM0 2H7V1.19209e-07H0V2ZM-1 0V1H1V0H-1ZM7 -1L1.70299e-08 -1L-1.70299e-08 1L7 1V-1ZM4 3V4H6V3H4ZM0 4H5V2H0V4ZM1 4V3H-1V4H1ZM5 3H0V5H5V3ZM7 6V7H9V6H7ZM5.96046e-08 7L8 7V5L-5.96046e-08 5L5.96046e-08 7ZM1 7V6H-1V7H1ZM8 6L-5.96046e-08 6L5.96046e-08 8L8 8V6Z'
                fill={color}
                mask='url(#path-1-inside-1_3644_1967)'
            />
        </svg>
    </div>
);

export const IconDesc = ({ className, style, size = 16, color = 'white', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <mask id='path-1-inside-1_3644_10397' fill={color}>
                <path d='M3.2 7V6L0 6V7H3.2Z' />
                <path d='M5.6 3V4L0 4V3L5.6 3Z' />
                <path d='M8 4.76837e-07V1L0 1V0L8 4.76837e-07Z' />
            </mask>
            <path {...fill(inh)} d='M3.2 7V6L0 6V7H3.2Z' fill={color} />
            <path {...fill(inh)} d='M5.6 3V4L0 4V3L5.6 3Z' fill={color} />
            <path {...fill(inh)} d='M8 4.76837e-07V1L0 1V0L8 4.76837e-07Z' fill={color} />
            <path
                {...fill(inh)}
                d='M3.2 6V5H4.2V6H3.2ZM3.2 7H4.2V8H3.2V7ZM0 6H-1V5H3.72529e-08L0 6ZM0 7V8H-1V7H0ZM5.6 4H6.6V5L5.6 5V4ZM5.6 3L5.6 2H6.6V3H5.6ZM0 4L-4.25747e-08 5H-1V4H0ZM0 3H-1V2L8.51495e-08 2L0 3ZM8 1H9V2H8V1ZM8 4.76837e-07V-1H9V4.76837e-07H8ZM0 1L-5.96046e-08 2H-1V1H0ZM0 0H-1V-1H5.96046e-08L0 0ZM4.2 6V7H2.2V6H4.2ZM3.72529e-08 5L3.2 5V7L-3.72529e-08 7L3.72529e-08 5ZM-1 7V6H1V7H-1ZM3.2 8H0V6H3.2V8ZM4.6 4V3H6.6V4H4.6ZM4.25747e-08 3L5.6 3V5L-4.25747e-08 5L4.25747e-08 3ZM1 3V4H-1V3H1ZM5.6 4L-8.51495e-08 4L8.51495e-08 2L5.6 2L5.6 4ZM7 1V4.76837e-07H9V1H7ZM5.96046e-08 4.76837e-07L8 9.53674e-07V2L-5.96046e-08 2L5.96046e-08 4.76837e-07ZM1 0V1H-1V0H1ZM8 1L-5.96046e-08 1L5.96046e-08 -1L8 -1V1Z'
                fill={color}
                mask='url(#path-1-inside-1_3644_10397)'
            />
        </svg>
    </div>
);

export const IconAsc = ({ className, style, size = 16, color = 'white', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <mask id='path-1-inside-1_3644_20922' fill={color}>
                <path d='M3.2 0V1L0 1V0H3.2Z' />
                <path d='M5.6 4V3L0 3V4L5.6 4Z' />
                <path d='M8 7V6L0 6V7L8 7Z' />
            </mask>
            <path {...fill(inh)} d='M3.2 0V1L0 1V0H3.2Z' fill={color} />
            <path {...fill(inh)} d='M5.6 4V3L0 3V4L5.6 4Z' fill={color} />
            <path {...fill(inh)} d='M8 7V6L0 6V7L8 7Z' fill={color} />
            <path
                {...fill(inh)}
                d='M3.2 1V2H4.2V1H3.2ZM3.2 0H4.2V-1H3.2V0ZM0 1H-1V2H3.72529e-08L0 1ZM0 0V-1H-1V0H0ZM5.6 3H6.6V2L5.6 2V3ZM5.6 4L5.6 5H6.6V4H5.6ZM0 3L-4.25747e-08 2H-1V3H0ZM0 4H-1V5L8.51495e-08 5L0 4ZM8 6H9V5H8V6ZM8 7V8H9V7H8ZM0 6L-5.96046e-08 5H-1V6H0ZM0 7H-1V8H5.96046e-08L0 7ZM4.2 1V0H2.2V1H4.2ZM3.72529e-08 2L3.2 2V5.96046e-08L-3.72529e-08 1.78814e-07L3.72529e-08 2ZM-1 0V1H1V0H-1ZM3.2 -1H0V1H3.2V-1ZM4.6 3V4H6.6V3H4.6ZM4.25747e-08 4L5.6 4V2L-4.25747e-08 2L4.25747e-08 4ZM1 4V3H-1V4H1ZM5.6 3L-8.51495e-08 3L8.51495e-08 5L5.6 5L5.6 3ZM7 6V7H9V6H7ZM5.96046e-08 7L8 7V5L-5.96046e-08 5L5.96046e-08 7ZM1 7V6H-1V7H1ZM8 6L-5.96046e-08 6L5.96046e-08 8L8 8V6Z'
                fill={color}
                mask='url(#path-1-inside-1_3644_20922)'
            />
        </svg>
    </div>
);

export const IconLoader = ({
    className = '',
    style,
    size = 16,
    color = 'black',
    isInheritStyle: inh = true,
}: IconProps) => {
    const dur = 180;
    const kk = 10;

    const [arrOpacity, setArrOpacity] = useState([1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1].reverse());
    const refTimerLoop = useRef(-1);
    useEffect(() => {
        const loop = () => {
            const k = 1 / kk;
            setArrOpacity((arr) => [...arr.map((v) => (v + k > 1 ? k : v + k))]);
            // @ts-ignore
            refTimerLoop.current = setTimeout(loop, (dur * 10) / kk);
        };
        loop();
        return () => {
            clearTimeout(refTimerLoop.current);
        };
    }, []);

    return (
        <div className={`${className} relative h-4 w-4`} style={{ width: size + 'px', height: size + 'px', ...style }}>
            <svg key='0' width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.00062 0C8.45941 0 8.83132 0.355681 8.83132 0.794435V2.41508C8.83132 2.85384 8.45941 3.20952 8.00062 3.20952C7.54184 3.20952 7.16992 2.85384 7.16992 2.41508V0.794435C7.16992 0.355681 7.54184 0 8.00062 0Z'
                    fill={color}
                    fillOpacity={arrOpacity[0]}
                />
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M3.08241 1.53617C3.45266 1.27708 3.97243 1.35409 4.24335 1.70818L5.24019 3.01105C5.5111 3.36514 5.43057 3.86222 5.06032 4.12131C4.69007 4.3804 4.1703 4.30339 3.89938 3.9493L2.90254 2.64642C2.63163 2.29234 2.71216 1.79526 3.08241 1.53617Z'
                    fill={color}
                    fillOpacity={arrOpacity[1]}
                />
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0.0420443 5.51842C0.185776 5.10175 0.655488 4.87541 1.09117 5.01287L2.70273 5.5213C3.13842 5.65876 3.3751 6.10797 3.23137 6.52463C3.08763 6.9413 2.61792 7.16764 2.18223 7.03019L0.570676 6.52175C0.134989 6.38429 -0.101687 5.93509 0.0420443 5.51842Z'
                    fill={color}
                    fillOpacity={arrOpacity[2]}
                />
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M3.23137 9.47545C3.3751 9.89212 3.13842 10.3413 2.70273 10.4788L1.09117 10.9872C0.655488 11.1247 0.185776 10.8983 0.0420443 10.4817C-0.101688 10.065 0.134989 9.61579 0.570676 9.47834L2.18223 8.9699C2.61792 8.83244 3.08763 9.05878 3.23137 9.47545Z'
                    fill={color}
                    fillOpacity={arrOpacity[3]}
                />
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M5.05645 11.8772C5.42826 12.1343 5.51178 12.6309 5.24301 12.9865L4.24617 14.3052C3.97739 14.6608 3.45809 14.7407 3.08629 14.4836C2.71448 14.2266 2.63095 13.73 2.89973 13.3744L3.89657 12.0556C4.16535 11.7001 4.68464 11.6202 5.05645 11.8772Z'
                    fill={color}
                    fillOpacity={arrOpacity[4]}
                />
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.00062 12.791C8.45941 12.791 8.83132 13.1467 8.83132 13.5855V15.2061C8.83132 15.6449 8.45941 16.0005 8.00062 16.0005C7.54184 16.0005 7.16992 15.6449 7.16992 15.2061V13.5855C7.16992 13.1467 7.54184 12.791 8.00062 12.791Z'
                    fill={color}
                    fillOpacity={arrOpacity[5]}
                />
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10.9437 11.8772C11.3155 11.6202 11.8348 11.7001 12.1036 12.0556L13.1004 13.3744C13.3692 13.73 13.2857 14.2266 12.9139 14.4836C12.5421 14.7407 12.0228 14.6608 11.754 14.3052L10.7572 12.9865C10.4884 12.6309 10.5719 12.1343 10.9437 11.8772Z'
                    fill={color}
                    fillOpacity={arrOpacity[6]}
                />
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12.7686 9.47545C12.9123 9.05878 13.3821 8.83244 13.8177 8.9699L15.4293 9.47834C15.865 9.61579 16.1017 10.065 15.9579 10.4817C15.8142 10.8983 15.3445 11.1247 14.9088 10.9872L13.2972 10.4788C12.8616 10.3413 12.6249 9.89212 12.7686 9.47545Z'
                    fill={color}
                    fillOpacity={arrOpacity[7]}
                />
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M15.9579 5.51842C16.1017 5.93509 15.865 6.38429 15.4293 6.52175L13.8177 7.03019C13.3821 7.16764 12.9123 6.9413 12.7686 6.52463C12.6249 6.10797 12.8616 5.65876 13.2972 5.5213L14.9088 5.01287C15.3445 4.87541 15.8142 5.10175 15.9579 5.51842Z'
                    fill={color}
                    fillOpacity={arrOpacity[8]}
                />
                <path
                    {...fill(inh)}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12.9177 1.53617C13.288 1.79526 13.3685 2.29234 13.0976 2.64642L12.1008 3.9493C11.8299 4.30339 11.3101 4.3804 10.9398 4.12131C10.5696 3.86222 10.489 3.36514 10.76 3.01105L11.7568 1.70818C12.0277 1.35409 12.5475 1.27708 12.9177 1.53617Z'
                    fill={color}
                    fillOpacity={arrOpacity[9]}
                />
            </svg>
        </div>
    );
};

export const IconCheck = ({ className, style, size = 8, color = '#006FBA', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M1 2.81818L3.7 5L7 1'
                stroke={color}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </div>
);

export const IconCross = ({
    className,
    style,
    size = 16,
    color = '#99A6AD',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path {...stroke(inh)} d='M11 5L5 11' stroke={color} strokeLinecap='round' />
            <path {...stroke(inh)} d='M11 11L5 5' stroke={color} strokeLinecap='round' />
        </svg>
    </div>
);

export const IconGear = ({ className, style, size = 20, color = '#B3BDC2', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle {...stroke(inh)} cx='10' cy='10' r='2.5' stroke={color} />
            <path
                {...stroke(inh)}
                d='M11.4764 1.79679C11.1701 1.66992 10.7818 1.66992 10.0053 1.66992C9.22871 1.66992 8.84043 1.66992 8.53414 1.79679C8.12576 1.96595 7.8013 2.2904 7.63215 2.69878C7.55493 2.88521 7.52471 3.10201 7.51288 3.41825C7.4955 3.88299 7.25717 4.31317 6.85441 4.5457C6.45165 4.77823 5.95995 4.76954 5.54879 4.55222C5.26899 4.40434 5.06613 4.32211 4.86607 4.29577C4.42782 4.23807 3.98461 4.35683 3.63392 4.62592C3.37091 4.82774 3.17677 5.164 2.78848 5.83653C2.4002 6.50906 2.20606 6.84532 2.16278 7.17401C2.10509 7.61226 2.22385 8.05547 2.49294 8.40615C2.61576 8.56622 2.78838 8.70078 3.05628 8.86911C3.45012 9.11658 3.70353 9.53814 3.70351 10.0033C3.70348 10.4684 3.45008 10.8899 3.05628 11.1373C2.78833 11.3057 2.61569 11.4402 2.49286 11.6003C2.22377 11.951 2.10501 12.3942 2.1627 12.8324C2.20597 13.1611 2.40012 13.4974 2.7884 14.1699C3.17669 14.8425 3.37083 15.1787 3.63384 15.3805C3.98453 15.6496 4.42774 15.7684 4.86599 15.7107C5.06603 15.6843 5.26889 15.6021 5.54866 15.4543C5.95985 15.2369 6.45159 15.2282 6.85437 15.4608C7.25716 15.6933 7.4955 16.1235 7.51289 16.5883C7.52471 16.9045 7.55493 17.1213 7.63215 17.3077C7.8013 17.7161 8.12576 18.0406 8.53414 18.2097C8.84043 18.3366 9.22871 18.3366 10.0053 18.3366C10.7818 18.3366 11.1701 18.3366 11.4764 18.2097C11.8848 18.0406 12.2093 17.7161 12.3784 17.3077C12.4556 17.1213 12.4859 16.9045 12.4977 16.5882C12.5151 16.1235 12.7534 15.6933 13.1561 15.4608C13.5589 15.2282 14.0506 15.2369 14.4619 15.4542C14.7416 15.6021 14.9445 15.6843 15.1445 15.7106C15.5827 15.7683 16.026 15.6496 16.3766 15.3805C16.6396 15.1787 16.8338 14.8424 17.2221 14.1699C17.6104 13.4973 17.8045 13.1611 17.8478 12.8324C17.9055 12.3941 17.7867 11.9509 17.5176 11.6002C17.3948 11.4402 17.2222 11.3056 16.9542 11.1373C16.5604 10.8898 16.307 10.4683 16.3071 10.0032C16.3071 9.53813 16.5605 9.11666 16.9542 8.86925C17.2222 8.70088 17.3949 8.5663 17.5177 8.40621C17.7868 8.05553 17.9056 7.61231 17.8479 7.17407C17.8046 6.84538 17.6104 6.50912 17.2222 5.83659C16.8339 5.16406 16.6397 4.8278 16.3767 4.62598C16.026 4.35689 15.5828 4.23813 15.1446 4.29583C14.9445 4.32216 14.7417 4.40439 14.4619 4.55225C14.0507 4.76958 13.559 4.77827 13.1562 4.54572C12.7534 4.31318 12.5151 3.88297 12.4977 3.4182C12.4858 3.10199 12.4556 2.8852 12.3784 2.69878C12.2093 2.2904 11.8848 1.96595 11.4764 1.79679Z'
                stroke={color}
            />
        </svg>
    </div>
);

export const IconBellDot = ({
    className,
    style,
    size = 20,
    color = '#B3BDC2',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M12 16C12 17.1 11.1 18 10 18C9.45333 18 8.94667 17.7733 8.58667 17.4133C8.22667 17.0533 8 16.5467 8 16'
                stroke={color}
                strokeMiterlimit='10'
            />
            <path
                {...stroke(inh)}
                d='M10.0185 4C7.54257 4 5.53041 5.91346 5.53041 8.26793V10.3237C5.53041 10.7576 5.33593 11.4191 5.10404 11.789L4.24383 13.1476C3.71274 13.987 4.07926 14.9188 5.05168 15.2318C8.27562 16.2561 11.7539 16.2561 14.9778 15.2318C15.8829 14.9472 16.2794 13.9301 15.7857 13.1476L14.9255 11.789C14.7011 11.4191 14.5066 10.7576 14.5066 10.3237V8.26793C14.5066 5.92057 12.4869 4 10.0185 4Z'
                stroke={color}
                strokeMiterlimit='10'
            />
            <path
                {...stroke(inh)}
                d='M8.49934 4.49688L8.48687 4.07023C8.46718 3.39702 8.52749 2.63976 9.09066 2.27038C9.35155 2.09926 9.66367 2 9.9987 2C10.3598 2 10.6944 2.11534 10.9668 2.31169C11.4738 2.67709 11.5264 3.37253 11.4993 3.99688V3.99688'
                stroke={color}
                strokeMiterlimit='10'
                strokeLinejoin='round'
            />
            <path
                {...stroke(inh)}
                d='M18 4.5C18 6.433 16.433 8 14.5 8C12.567 8 11 6.433 11 4.5C11 2.567 12.567 1 14.5 1C16.433 1 18 2.567 18 4.5Z'
                fill='#EB5757'
            />
        </svg>
    </div>
);

export const IconQuestion = ({
    className,
    style,
    size = 20,
    color = '#B3BDC2',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M8 7.4974C8 6.2474 8.75521 5.5 10.0052 5.5C11.2552 5.5 12 6.2474 12 7.4974C12 8.7474 10.0052 9.75 10.0052 11L10 11.5'
                stroke={color}
                strokeMiterlimit='3.99933'
                strokeLinecap='round'
            />
            <path
                {...stroke(inh)}
                d='M9.75 14.25V14.25C9.75 14.3881 9.86193 14.5 10 14.5V14.5C10.1381 14.5 10.25 14.3881 10.25 14.25V14.25C10.25 14.1119 10.1381 14 10 14V14C9.86193 14 9.75 14.1119 9.75 14.25V14.25ZM9.75 14.25H10.01H10'
                stroke={color}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <rect {...stroke(inh)} x='2.5' y='2.5' width='15' height='15' rx='3.5' stroke={color} />
        </svg>
    </div>
);

export const IconAvatar = ({
    className,
    style,
    size = 28,
    color = '#B3BDC2',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clipPath='url(#clip0_2749_26844)'>
                <path
                    {...stroke(inh)}
                    d='M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z'
                    fill='#F2F4F4'
                />
                <path
                    {...stroke(inh)}
                    opacity='0.55'
                    d='M22 21.48C20 23.61 17.17 25 14 25C10.83 25 7.92 23.61 6 21.48C6.67 19.19 8.5 17.63 10.67 17.63H17.42C19.42 17.63 21.25 19.27 22 21.48Z'
                    fill={color}
                />
                <path
                    {...stroke(inh)}
                    opacity='0.55'
                    d='M18.9199 11.91C18.9199 14.61 16.6699 16.82 13.9199 16.82C11.1699 16.82 8.91992 14.61 8.91992 11.91C8.91992 9.21 11.1699 7 13.9199 7C16.6699 7 18.9199 9.21 18.9199 11.91Z'
                    fill={color}
                />
            </g>
            <defs>
                <clipPath id='clip0_2749_26844'>
                    <rect width={size} height={size} fill='white' />
                </clipPath>
            </defs>
        </svg>
    </div>
);

export const IconWrite = ({ className, style, size = 16, color = 'white', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M3.5 10.1253V12H5.37474L10.3247 6.89571L8.45 5.02097L3.5 10.1253ZM12.3538 5.02097C12.5487 4.826 12.5487 4.51104 12.3538 4.31607L11.1839 3.14623C10.989 2.95126 10.674 2.95126 10.479 3.14623L9.56416 4.0611L11.4389 5.93584L12.3538 5.02097Z'
                stroke={color}
                strokeLinejoin='round'
            />
            <path {...stroke(inh)} d='M1.5 12.5H13.5' stroke={color} strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    </div>
);

export const IconGEO = ({ className, style, size = 16, color = '#006FBA', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M1.99805 5.0736C1.99805 2.82489 3.78891 1.00195 5.99805 1.00195C8.20719 1.00195 9.99805 2.82489 9.99805 5.0736C9.99805 7.00482 8.49381 9.52451 6.79763 10.7708C6.48348 11.0016 6.32641 11.117 5.99856 11.117C5.6707 11.117 5.51361 11.0016 5.19943 10.7708C3.50303 9.52454 1.99805 7.00483 1.99805 5.0736Z'
                stroke={color}
            />
            <circle {...stroke(inh)} cx='6' cy='4.99805' r='1.5' stroke={color} />
        </svg>
    </div>
);

export const IconPast = ({ className, style, size = 16, color = '#006FBA', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...fill(inh)}
                d='M1.93934 11.0578L2.29289 10.7043H2.29289L1.93934 11.0578ZM10.0607 11.0578L9.70711 10.7043L9.70711 10.7043L10.0607 11.0578ZM10.0607 2.93652L10.4142 2.58296V2.58296L10.0607 2.93652ZM5.25 7.00195C4.97386 7.00195 4.75 7.22581 4.75 7.50195C4.75 7.7781 4.97386 8.00195 5.25 8.00195V7.00195ZM8.5 8.00195C8.77614 8.00195 9 7.7781 9 7.50195C9 7.22581 8.77614 7.00195 8.5 7.00195V8.00195ZM3.49805 7.00195C3.2219 7.00195 2.99805 7.22581 2.99805 7.50195C2.99805 7.7781 3.2219 8.00195 3.49805 8.00195V7.00195ZM3.74805 8.00195C4.02419 8.00195 4.24805 7.7781 4.24805 7.50195C4.24805 7.22581 4.02419 7.00195 3.74805 7.00195V8.00195ZM3.49805 5.25C3.2219 5.25 2.99805 5.47386 2.99805 5.75C2.99805 6.02614 3.2219 6.25 3.49805 6.25V5.25ZM3.74805 6.25C4.02419 6.25 4.24805 6.02614 4.24805 5.75C4.24805 5.47386 4.02419 5.25 3.74805 5.25V6.25ZM3.49805 8.74805C3.2219 8.74805 2.99805 8.97191 2.99805 9.24805C2.99805 9.52419 3.2219 9.74805 3.49805 9.74805V8.74805ZM3.74805 9.74805C4.02419 9.74805 4.24805 9.52419 4.24805 9.24805C4.24805 8.97191 4.02419 8.74805 3.74805 8.74805V9.74805ZM5.25 5.25C4.97386 5.25 4.75 5.47386 4.75 5.75C4.75 6.02614 4.97386 6.25 5.25 6.25V5.25ZM8.5 6.25C8.77614 6.25 9 6.02614 9 5.75C9 5.47386 8.77614 5.25 8.5 5.25V6.25ZM5.25 8.74805C4.97386 8.74805 4.75 8.97191 4.75 9.24805C4.75 9.52419 4.97386 9.74805 5.25 9.74805V8.74805ZM8.5 9.74805C8.77614 9.74805 9 9.52419 9 9.24805C9 8.97191 8.77614 8.74805 8.5 8.74805V9.74805ZM10.5 5.49718H10V8.49718H10.5H11V5.49718H10.5ZM7.5 11.4972V10.9972H4.5V11.4972V11.9972H7.5V11.4972ZM1.5 8.49718H2V5.49718H1.5H1V8.49718H1.5ZM4.5 11.4972V10.9972C3.77876 10.9972 3.28813 10.9961 2.92072 10.9467C2.56769 10.8993 2.40418 10.8156 2.29289 10.7043L1.93934 11.0578L1.58579 11.4114C1.91384 11.7394 2.32355 11.8754 2.78747 11.9378C3.237 11.9982 3.80703 11.9972 4.5 11.9972V11.4972ZM1.5 8.49718H1C1 9.19015 0.998938 9.76018 1.05938 10.2097C1.12175 10.6736 1.25773 11.0833 1.58579 11.4114L1.93934 11.0578L2.29289 10.7043C2.18161 10.593 2.09792 10.4295 2.05046 10.0765C2.00106 9.70905 2 9.21842 2 8.49718H1.5ZM10.5 8.49718H10C10 9.21842 9.99894 9.70905 9.94954 10.0765C9.90208 10.4295 9.81839 10.593 9.70711 10.7043L10.0607 11.0578L10.4142 11.4114C10.7423 11.0833 10.8783 10.6736 10.9406 10.2097C11.0011 9.76018 11 9.19015 11 8.49718H10.5ZM7.5 11.4972V11.9972C8.19297 11.9972 8.763 11.9982 9.21253 11.9378C9.67645 11.8754 10.0862 11.7394 10.4142 11.4114L10.0607 11.0578L9.70711 10.7043C9.59582 10.8156 9.43231 10.8993 9.07928 10.9467C8.71187 10.9961 8.22124 10.9972 7.5 10.9972V11.4972ZM10.5 5.49718H11C11 4.80421 11.0011 4.23418 10.9406 3.78465C10.8783 3.32073 10.7423 2.91102 10.4142 2.58296L10.0607 2.93652L9.70711 3.29007C9.81839 3.40136 9.90208 3.56487 9.94954 3.91789C9.99894 4.2853 10 4.77594 10 5.49718H10.5ZM1.5 5.49718H2C2 4.77594 2.00106 4.2853 2.05046 3.91789C2.09792 3.56487 2.18161 3.40136 2.29289 3.29007L1.93934 2.93652L1.58579 2.58296C1.25773 2.91102 1.12175 3.32073 1.05938 3.78465C0.998938 4.23418 1 4.80421 1 5.49718H1.5ZM8 2.49805L7.99722 2.99804C8.54496 3.00109 8.92198 3.0155 9.20374 3.06725C9.47122 3.11638 9.60884 3.1918 9.70711 3.29007L10.0607 2.93652L10.4142 2.58296C10.1283 2.29704 9.77934 2.15625 9.38441 2.08371C9.00377 2.01379 8.54255 2.00106 8.00278 1.99805L8 2.49805ZM4 2.49805L3.99722 1.99805C3.45745 2.00106 2.99623 2.01379 2.61559 2.08371C2.22066 2.15625 1.87171 2.29704 1.58579 2.58296L1.93934 2.93652L2.29289 3.29007C2.39116 3.1918 2.52878 3.11638 2.79626 3.06725C3.07802 3.0155 3.45504 3.00109 4.00278 2.99804L4 2.49805ZM5.25 7.50195V8.00195H8.5V7.50195V7.00195H5.25V7.50195ZM3.49805 7.50195V8.00195H3.74805V7.50195V7.00195H3.49805V7.50195ZM3.49805 5.75V6.25H3.74805V5.75V5.25H3.49805V5.75ZM3.49805 9.24805V9.74805H3.74805V9.24805V8.74805H3.49805V9.24805ZM5.25 5.75V6.25H8.5V5.75V5.25H5.25V5.75ZM5.25 9.24805V9.74805H8.5V9.24805V8.74805H5.25V9.24805ZM4.75195 1.50195V2.00195H7.25195V1.50195V1.00195H4.75195V1.50195ZM8.00195 2.25195H7.50195V2.75195H8.00195H8.50195V2.25195H8.00195ZM7.25195 3.50195V3.00195H4.75195V3.50195V4.00195H7.25195V3.50195ZM4.00195 2.75195H4.50195V2.25195H4.00195H3.50195V2.75195H4.00195ZM4.75195 3.50195V3.00195C4.61388 3.00195 4.50195 2.89002 4.50195 2.75195H4.00195H3.50195C3.50195 3.44231 4.0616 4.00195 4.75195 4.00195V3.50195ZM8.00195 2.75195H7.50195C7.50195 2.89002 7.39002 3.00195 7.25195 3.00195V3.50195V4.00195C7.94231 4.00195 8.50195 3.44231 8.50195 2.75195H8.00195ZM7.25195 1.50195V2.00195C7.39002 2.00195 7.50195 2.11388 7.50195 2.25195H8.00195H8.50195C8.50195 1.5616 7.94231 1.00195 7.25195 1.00195V1.50195ZM4.75195 1.50195V1.00195C4.0616 1.00195 3.50195 1.5616 3.50195 2.25195H4.00195H4.50195C4.50195 2.11388 4.61388 2.00195 4.75195 2.00195V1.50195Z'
                fill={color}
            />
        </svg>
    </div>
);

export const IconCheck16 = ({
    className,
    style,
    size = 16,
    color = '#00C800',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M13.5 3.5L7 12.5L2.5 8.5'
                stroke={color}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </div>
);

export const IconCross16 = ({
    className,
    style,
    size = 16,
    color = '#EB5757',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path {...stroke(inh)} d='M12.375 3.625L4 12' stroke={color} strokeLinecap='round' strokeLinejoin='round' />
            <path {...stroke(inh)} d='M4 3.625L12.375 12' stroke={color} strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    </div>
);

export const IconRefresh16 = ({
    className,
    style,
    size = 16,
    color = '#73858F',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M11.9775 4.71452L11.5355 4.2621C9.58291 2.26318 6.41709 2.26318 4.46447 4.2621C2.51184 6.26101 2.51184 9.5019 4.46447 11.5008C6.41709 13.4997 9.58291 13.4997 11.5355 11.5008C12.671 10.3384 13.1462 8.75593 12.9611 7.24197M11.9775 4.71452H9.32582M11.9775 4.71452V2'
                stroke={color}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </div>
);

export const IconCheckGreenCircle12 = ({
    className,
    style,
    size = 12,
    color = '#24C38E',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect {...stroke(inh)} x='0.5' y='0.5' width='11' height='11' rx='5.5' fill={color} stroke={color} />
            <path
                {...stroke(inh)}
                d='M3 5.81818L5.7 8L9 4'
                stroke='white'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </div>
);

export const IconBucket = ({ className, style, size = 16, color = 'white', isInheritStyle: inh = true }: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 16 16' fill='none'>
            <path {...stroke(inh)} d='M13.6615 4H2.32812' stroke='white' strokeLinecap='round' />
            <path
                {...stroke(inh)}
                d='M12.5564 5.66406L12.2498 10.2635C12.1318 12.0334 12.0728 12.9184 11.4961 13.4579C10.9195 13.9974 10.0325 13.9974 8.25866 13.9974H7.74308C5.96921 13.9974 5.08228 13.9974 4.50561 13.4579C3.92893 12.9184 3.86994 12.0334 3.75194 10.2635L3.44531 5.66406'
                stroke={color}
                strokeLinecap='round'
            />
            <path {...stroke(inh)} d='M6.32812 7.33594L6.66146 10.6693' stroke={color} strokeLinecap='round' />
            <path {...stroke(inh)} d='M9.66146 7.33594L9.32812 10.6693' stroke={color} strokeLinecap='round' />
            <path
                {...stroke(inh)}
                d='M4.32812 4C4.36538 4 4.384 4 4.40089 3.99957C4.94985 3.98566 5.43414 3.63661 5.62094 3.12021C5.62668 3.10433 5.63257 3.08666 5.64435 3.05132L5.70908 2.85714C5.76433 2.69139 5.79196 2.6085 5.8286 2.53813C5.9748 2.25738 6.24529 2.06242 6.55786 2.01251C6.63621 2 6.72357 2 6.8983 2H9.09128C9.26601 2 9.35337 2 9.43172 2.01251C9.7443 2.06242 10.0148 2.25738 10.161 2.53813C10.1976 2.6085 10.2253 2.69138 10.2805 2.85714L10.3452 3.05132C10.357 3.08661 10.3629 3.10434 10.3686 3.12021C10.5554 3.63661 11.0397 3.98566 11.5887 3.99957C11.6056 4 11.6242 4 11.6615 4'
                stroke={color}
            />
        </svg>
    </div>
);

export const IconSquareArrowDown = ({
    className,
    style,
    size = 16,
    color = '#002033',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clipPath='url(#clip0_3089_28315)'>
                <path
                    {...stroke(inh)}
                    d='M7.5 5.5L6 7L4.5 5.5'
                    stroke={color}
                    strokeOpacity='0.3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    {...stroke(inh)}
                    d='M6 0.5C4.45884 0.5 3.47864 0.501367 2.76172 0.612305C2.08377 0.717272 1.68536 0.914253 1.2998 1.2998C0.914253 1.68536 0.717272 2.08377 0.612305 2.76172C0.501367 3.47864 0.5 4.45885 0.5 6C0.5 7.54116 0.501367 8.52136 0.612305 9.23828C0.717272 9.91623 0.914253 10.3146 1.2998 10.7002C1.68536 11.0857 2.08377 11.2827 2.76172 11.3877C3.47864 11.4986 4.45884 11.5 6 11.5C7.54116 11.5 8.52136 11.4986 9.23828 11.3877C9.91623 11.2827 10.3146 11.0857 10.7002 10.7002C11.0857 10.3146 11.2827 9.91623 11.3877 9.23828C11.4986 8.52136 11.5 7.54116 11.5 6L11.498 5.0791C11.4925 4.21442 11.4707 3.51368 11.3867 2.92969C11.2766 2.16441 11.0674 1.66705 10.7002 1.2998C10.3146 0.914253 9.91623 0.717272 9.23828 0.612305C8.52136 0.501367 7.54116 0.5 6 0.5Z'
                    stroke={color}
                    strokeOpacity='0.3'
                />
            </g>
            <defs>
                <clipPath id='clip0_3089_28315'>
                    <rect width='12' height='12' fill='white' transform='matrix(-1 0 0 1 12 0)' />
                </clipPath>
            </defs>
        </svg>
    </div>
);

export const IconArrowDownBadge12 = ({
    className,
    style,
    size = 12,
    color = '#B3BDC2',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <mask id='path-1-inside-1_custom' fill='white'>
                <path d='M6 7.5C5.86739 7.5 5.74025 7.44728 5.64648 7.35352L4.14648 5.85352L4.08203 5.77539C3.95387 5.58131 3.97562 5.31735 4.14648 5.14648C4.31735 4.97562 4.58131 4.95387 4.77539 5.08203L4.85352 5.14648L6 6.29297L7.14648 5.14648C7.34175 4.95122 7.65825 4.95122 7.85352 5.14648C8.04878 5.34175 8.04878 5.65825 7.85352 5.85352L6.35352 7.35352L6.27734 7.41602C6.19581 7.47037 6.09944 7.5 6 7.5Z' />
                <path d='M11 6C11 4.44086 10.9971 3.5083 10.8936 2.83887C10.8019 2.24681 10.6448 1.95146 10.3467 1.65332C10.0485 1.35518 9.75319 1.19806 9.16113 1.10645C8.4917 1.00289 7.55914 1 6 1C4.44086 1 3.5083 1.00289 2.83887 1.10645C2.24681 1.19806 1.95146 1.35518 1.65332 1.65332C1.39188 1.91476 1.2104 2.29232 1.1084 3.00098C1.00263 3.73607 1 4.68053 1 6C1 7.55914 1.00289 8.4917 1.10645 9.16113C1.19806 9.75319 1.35518 10.0485 1.65332 10.3467C1.95146 10.6448 2.24681 10.8019 2.83887 10.8936C3.5083 10.9971 4.44086 11 6 11V12C3.14487 12 2.03336 12 1.12598 11.2207L0.946289 11.0537C1.90735e-05 10.1074 0 9.046 0 6C0 3.57738 -0.000103951 2.08736 0.779297 1.13086L0.946289 0.946289C1.89256 1.87159e-05 2.954 0 6 0C9.046 0 10.1074 1.87159e-05 11.0537 0.946289C12 1.89256 12 2.954 12 6C12 9.046 12 10.1074 11.0537 11.0537C10.1074 12 9.046 12 6 12V11C7.55914 11 8.4917 10.9971 9.16113 10.8936C9.75319 10.8019 10.0485 10.6448 10.3467 10.3467C10.6448 10.0485 10.8019 9.75319 10.8936 9.16113C10.9971 8.4917 11 7.55914 11 6Z' />
            </mask>
            <path
                d='M6 7.5C5.86739 7.5 5.74025 7.44728 5.64648 7.35352L4.14648 5.85352L4.08203 5.77539C3.95387 5.58131 3.97562 5.31735 4.14648 5.14648C4.31735 4.97562 4.58131 4.95387 4.77539 5.08203L4.85352 5.14648L6 6.29297L7.14648 5.14648C7.34175 4.95122 7.65825 4.95122 7.85352 5.14648C8.04878 5.34175 8.04878 5.65825 7.85352 5.85352L6.35352 7.35352L6.27734 7.41602C6.19581 7.47037 6.09944 7.5 6 7.5Z'
                fill={color}
            />
            <path
                d='M11 6C11 4.44086 10.9971 3.5083 10.8936 2.83887C10.8019 2.24681 10.6448 1.95146 10.3467 1.65332C10.0485 1.35518 9.75319 1.19806 9.16113 1.10645C8.4917 1.00289 7.55914 1 6 1C4.44086 1 3.5083 1.00289 2.83887 1.10645C2.24681 1.19806 1.95146 1.35518 1.65332 1.65332C1.39188 1.91476 1.2104 2.29232 1.1084 3.00098C1.00263 3.73607 1 4.68053 1 6C1 7.55914 1.00289 8.4917 1.10645 9.16113C1.19806 9.75319 1.35518 10.0485 1.65332 10.3467C1.95146 10.6448 2.24681 10.8019 2.83887 10.8936C3.5083 10.9971 4.44086 11 6 11V12C3.14487 12 2.03336 12 1.12598 11.2207L0.946289 11.0537C1.90735e-05 10.1074 0 9.046 0 6C0 3.57738 -0.000103951 2.08736 0.779297 1.13086L0.946289 0.946289C1.89256 1.87159e-05 2.954 0 6 0C9.046 0 10.1074 1.87159e-05 11.0537 0.946289C12 1.89256 12 2.954 12 6C12 9.046 12 10.1074 11.0537 11.0537C10.1074 12 9.046 12 6 12V11C7.55914 11 8.4917 10.9971 9.16113 10.8936C9.75319 10.8019 10.0485 10.6448 10.3467 10.3467C10.6448 10.0485 10.8019 9.75319 10.8936 9.16113C10.9971 8.4917 11 7.55914 11 6Z'
                fill={color}
            />
            <path d='M6 11H6.5V12H6H5.5V11H6ZM6 7.5V8.5V7.5Z' fill={color} mask='url(#path-1-inside-1_custom)' />
        </svg>
    </div>
);

export const IconCaretDown8 = ({
    className,
    style,
    size = 8,
    color = '#B3BDC2',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: Math.round((size / 8) * 4) + 'px', ...style }}>
        <svg
            width={size}
            height={Math.round((size / 8) * 4)}
            viewBox='0 0 8 4'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path {...stroke(inh)} d='M7 0.5L4 3.5L1 0.5' stroke={color} strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    </div>
);

export const IconCircle12 = ({
    className,
    style,
    size = 12,
    color = 'white',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clipPath='url(#clip0_3089_28516)'>
                <circle {...fill(inh)} cx='6' cy='6' r='5' stroke='#002033' fill={color} strokeOpacity='0.1' />
            </g>
            <defs>
                <clipPath id='clip0_3089_28516'>
                    <rect width='12' height='12' fill='white' />
                </clipPath>
            </defs>
        </svg>
    </div>
);

export const IconInfo12 = ({
    className,
    style,
    size = 12,
    color = '#B3BDC2',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...fill(inh)}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.99916 2.24531C3.92597 2.24531 2.24531 3.92597 2.24531 5.99916C2.24531 8.07235 3.92597 9.75301 5.99916 9.75301C8.07235 9.75301 9.75301 8.07235 9.75301 5.99916C9.75301 3.92597 8.07235 2.24531 5.99916 2.24531ZM1.44531 5.99916C1.44531 3.48414 3.48414 1.44531 5.99916 1.44531C8.51418 1.44531 10.553 3.48414 10.553 5.99916C10.553 8.51418 8.51418 10.553 5.99916 10.553C3.48414 10.553 1.44531 8.51418 1.44531 5.99916Z'
                fill={color}
            />
            <path
                {...fill(inh)}
                d='M6.9348 8.23129L7 7.92915C6.96625 7.94712 6.91184 7.96765 6.83723 7.99102C6.76242 8.01439 6.69508 8.02629 6.63591 8.02629C6.50986 8.02629 6.42112 8.00287 6.36959 7.95579C6.31845 7.90872 6.29293 7.82016 6.29293 7.69045C6.29293 7.63906 6.30063 7.56244 6.31673 7.46217C6.33233 7.36124 6.35027 7.27154 6.37022 7.19308L6.61362 6.21622C6.63745 6.12657 6.65381 6.02801 6.66259 5.92044C6.67158 5.81311 6.67576 5.73801 6.67576 5.69539C6.67576 5.4894 6.61207 5.32224 6.48464 5.19329C6.35721 5.06443 6.17575 5 5.94059 5C5.80974 5 5.67139 5.02636 5.52498 5.07903C5.37856 5.13156 5.2255 5.19485 5.06537 5.26876L5 5.57113C5.04772 5.55113 5.10455 5.5296 5.17105 5.50732C5.23725 5.48513 5.3022 5.47366 5.36539 5.47366C5.49441 5.47366 5.58131 5.4986 5.62685 5.54771C5.6724 5.59697 5.69527 5.68458 5.69527 5.80984C5.69527 5.8791 5.68804 5.95605 5.67302 6.03967C5.65822 6.12382 5.63973 6.21281 5.61799 6.30673L5.37354 7.28752C5.3518 7.39059 5.33591 7.4828 5.32591 7.56467C5.316 7.64645 5.31123 7.72672 5.31123 7.80475C5.31123 8.00633 5.37693 8.1725 5.50829 8.30363C5.63965 8.43424 5.82383 8.5 6.06062 8.5C6.21481 8.5 6.35015 8.47715 6.46662 8.43121C6.58296 8.38541 6.73921 8.3188 6.9348 8.23129Z'
                fill={color}
            />
            <path
                {...fill(inh)}
                d='M7 4C7 4.27614 6.77614 4.5 6.5 4.5C6.22386 4.5 6 4.27614 6 4C6 3.72386 6.22386 3.5 6.5 3.5C6.77614 3.5 7 3.72386 7 4Z'
                fill={color}
            />
        </svg>
    </div>
);

export const IconHistory16 = ({
    className,
    style,
    size = 16,
    color = 'white',
    isInheritStyle: inh = true,
}: IconProps) => (
    <div className={className} style={{ width: size + 'px', height: size + 'px', ...style }}>
        <svg width={size} height={size + 1} viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                {...stroke(inh)}
                d='M8 5.83398V8.50065L9.66667 10.1673'
                stroke={color}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                {...fill(inh)}
                d='M3.73609 4.23609L3.38254 3.88254L3.73609 4.23609ZM2.89184 5.08035L2.39185 5.08286C2.39322 5.35704 2.61515 5.57896 2.88933 5.58034L2.89184 5.08035ZM4.58636 5.58887C4.8625 5.59026 5.08748 5.36753 5.08887 5.09139C5.09026 4.81525 4.86753 4.59027 4.59139 4.58888L4.58636 5.58887ZM3.38331 3.3808C3.38192 3.10466 3.15694 2.88193 2.8808 2.88332C2.60466 2.88471 2.38193 3.10969 2.38332 3.38583L3.38331 3.3808ZM2.55107 7.68995C2.58857 7.41636 2.39719 7.16418 2.1236 7.12668C1.85002 7.08918 1.59783 7.28056 1.56033 7.55415L2.55107 7.68995ZM12.2213 4.27873L12.5748 3.92518C10.028 1.37839 5.91249 1.35259 3.38254 3.88254L3.73609 4.23609L4.08965 4.58965C6.22239 2.45691 9.70473 2.4693 11.8677 4.63229L12.2213 4.27873ZM3.77873 12.7213L3.42518 13.0748C5.97197 15.6216 10.0875 15.6474 12.6175 13.1175L12.2639 12.7639L11.9104 12.4104C9.77761 14.5431 6.29527 14.5307 4.13229 12.3677L3.77873 12.7213ZM12.2639 12.7639L12.6175 13.1175C15.1474 10.5875 15.1216 6.47197 12.5748 3.92518L12.2213 4.27873L11.8677 4.63229C14.0307 6.79527 14.0431 10.2776 11.9104 12.4104L12.2639 12.7639ZM3.73609 4.23609L3.38254 3.88254L2.53829 4.72679L2.89184 5.08035L3.24539 5.4339L4.08965 4.58965L3.73609 4.23609ZM2.89184 5.08035L2.88933 5.58034L4.58636 5.58887L4.58888 5.08888L4.59139 4.58888L2.89435 4.58035L2.89184 5.08035ZM2.89184 5.08035L3.39183 5.07783L3.38331 3.3808L2.88331 3.38331L2.38332 3.38583L2.39185 5.08286L2.89184 5.08035ZM2.0557 7.62205L1.56033 7.55415C1.29271 9.50661 1.91595 11.5656 3.42518 13.0748L3.77873 12.7213L4.13229 12.3677C2.8519 11.0873 2.32442 9.34348 2.55107 7.68995L2.0557 7.62205Z'
                fill={color}
            />
        </svg>
    </div>);

export const IconNetwork = ({
                                  className,
                                  style,
                                  size = 12,
                                  color = '#006FBA',
                                  isInheritStyle: inh = true
                              }: IconProps) => (
    <div className={className} style={{width: size + 'px', height: size + 'px', ...style}}>
            <svg width={size+1} height={size + 1} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path {...stroke(inh)} d="M9.57072 3.00002C10.4548 3.90189 11 5.13729 11 6.50002C11 7.87892 10.4418 9.12746 9.53908 10.032M2.5 10.0707C1.57432 9.16327 1 7.89871 1 6.50002C1 5.1175 1.56111 3.86604 2.46801 2.96094" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <path {...stroke(inh)} d="M8.14243 4.52199C8.6729 5.02938 9 5.72442 9 6.4911C9 7.26688 8.66509 7.96931 8.12345 8.47821M3.9 8.5C3.34459 7.98946 3 7.27801 3 6.4911C3 5.71329 3.33666 5.00921 3.88081 4.5" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <circle {...stroke(inh)} cx="6" cy="6.5" r="1" stroke={color}/>
            </svg>


    </div>);