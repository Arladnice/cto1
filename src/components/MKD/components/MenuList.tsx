import clsx from 'clsx';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import CustomScrollbarVertical from '@/components/MKD/components/Scrollbar/CustomScrollbarVertical.tsx';

interface DropdownProps extends React.HTMLAttributes<Element> {
    className?: string;
    value?: ReactNode | string;
    error?: boolean;
    border?: boolean;
    disabled?: boolean;
    placeholder?: string;
    children?: React.ReactNode;
    widthFit?: boolean;
    hideIconArrow?: boolean;
    empty?: boolean;
}

const Droplist = ({
    className = '',
    value,
    error = false,
    border = true,
    disabled = false,
    placeholder = null,
    children, // Содержимое выпадающего списка
    widthFit = false, // Подогнать ширину выпадающего списка под ширину компонента
    hideIconArrow = false, // Скрыть иконку стрелочки
    empty = false, // Скрыть контур
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [domRect, setDomRect] = useState<DOMRect | null>(null);
    const refDropdown = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const update = () => {
            const domRect = refDropdown.current?.getBoundingClientRect();
            domRect && setDomRect(domRect);
        };
        const ro = new ResizeObserver(() => update());
        ro.observe(refDropdown.current);

        window.addEventListener('scroll', update);

        return () => window.removeEventListener('scroll', update);
    }, []);
    return (
        <>
            <div
                ref={refDropdown}
                onClick={() => {
                    const domRect = refDropdown.current.getBoundingClientRect();
                    setDomRect(domRect);
                    setIsOpen(true);
                }}
                className={clsx(
                    'relative cursor-pointer',
                    'flex flex-row items-center',
                    !empty && 'h-[24px] w-full',
                    !empty && 'gap-[5px] rounded-[2px] px-[6px] py-[2px] text-[11px]',
                    !empty && 'bg-[white] text-[#1A3747] placeholder:text-[#B3BDC2]',

                    !empty && isOpen && 'shadow-[inset_0_0_0_1px_#006FBA]',
                    !empty &&
                        !isOpen &&
                        border &&
                        'shadow-[inset_0_0_0_1px_#E6E9EB] hover:shadow-[inset_0_0_0_1px_#B3D4EB] focus:shadow-[inset_0_0_0_1px_#006FBA]',

                    !empty && error && border && 'shadow-[inset_0_0_0_1px_#EB5757]',

                    !empty && disabled && 'bg-[#F9F9F9]',
                    !empty && disabled && border && 'shadow-[inset_0_0_0_1px_#E6E9EB]',

                    className
                )}
            >
                <div className={clsx('h-full w-full content-center text-[11px]', !value && 'text-[#B3BDC2]')}>
                    {value ?? placeholder}
                </div>
                {!hideIconArrow && children && (
                    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M3 4.5C4.17157 5.67157 6 7.5 6 7.5C6 7.5 7.82843 5.67157 9 4.5' fill='#B3BDC2' />
                    </svg>
                )}
            </div>
            {isOpen && (
                <>
                    <div
                        role='menulistback'
                        className='fixed top-0 left-0 h-screen w-screen opacity-0'
                        onClick={() => setIsOpen(false)}
                        style={{ zIndex: '99998' }}
                    />
                    <div
                        role='menulistwrap'
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                            'fixed origin-top-left',
                            !empty && 'rounded-[6px] focus:outline-none',
                            !empty && 'bg-white outline-1 -outline-offset-1 outline-[#0020331A]',
                            !empty && 'shadow-[0px_2px_3px_0px_#A6A6A640]'
                        )}
                        style={{
                            left: `${domRect.left}px`,
                            top: `${domRect.top + domRect.height + 1}px`,
                            zIndex: '99999',
                            width: widthFit ? `${domRect.width}px` : 'auto',
                        }}
                    >
                        {children}
                    </div>
                </>
            )}
        </>
    );
};

interface MenuListProps {
    arrList: string[] | null;
    value: string | ReactNode;
    onChange: (index: number, value: string) => void;
    className?: string;
    error?: boolean;
    border?: boolean;
    disabled?: boolean;
    placeholder?: string;
    widthFit?: boolean;
    hideIconArrow?: boolean;
}

const MenuList = ({
    arrList = null,
    value = '',
    onChange = null,
    className = '',
    error = false,
    border = true,
    disabled = false,
    placeholder = null,
    widthFit = true, // Ширина выпадающего списка == ширине элемента
    hideIconArrow = false,
}: MenuListProps) => {
    const refDropdown = useRef(null);

    return (
        <div className={clsx('relative', 'w-full')}>
            <Droplist
                className={clsx('w-full bg-transparent', className)}
                error={error}
                disabled={disabled}
                border={border}
                value={value}
                placeholder={placeholder}
                widthFit={widthFit}
                hideIconArrow={hideIconArrow}
            >
                {arrList && (
                    <div className={clsx('flex max-h-[174px] flex-row')}>
                        <div
                            className={clsx('max-h-[174px] w-full')}
                            ref={refDropdown}
                            onClick={(e: React.MouseEvent) =>
                                onChange &&
                                onChange(
                                    +(e.target as HTMLElement).dataset.index,
                                    (e.target as HTMLElement).textContent
                                )
                            }
                        >
                            {arrList.map((item, index) => (
                                <div
                                    key={index}
                                    className={clsx(
                                        'h-[24px] w-full p-[5px_10px_6px_12px] text-[11px] text-[#405866]',
                                        'cursor-pointer hover:bg-[#F0F9FF]'
                                    )}
                                    data-index={index}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <CustomScrollbarVertical
                            targetRef={refDropdown}
                            className={clsx('mx-[4px] !my-[6px] !h-[162px] !w-[2px] !bg-[#F9F9F9]')}
                            classNameThumb={clsx('!bg-[#D9DEE1] !w-[2px]')}
                        />
                    </div>
                )}
            </Droplist>
        </div>
    );
};

export { Droplist, MenuList };
