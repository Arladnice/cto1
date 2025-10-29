export interface IStyledColor {
    bg: string;
    text?: string;
    border?: string;
    icon?: string;
}

export interface IStyledType {
    default: IStyledColor;
    hover: IStyledColor;
    active: IStyledColor;
    disabled: IStyledColor;
    loading: IStyledColor;
}