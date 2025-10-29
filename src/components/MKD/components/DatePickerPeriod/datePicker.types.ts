export interface DateRange {
    from: Date | null;
    to: Date | null;
}

export interface DataRangeProps {
    value: DateRange;
    onChange?: (range: DateRange) => void;
    onCancel?: () => void;
    onConfirm?: (range?: DateRange) => void;
    isFillingAnimate?: boolean;
    singleDate?: boolean;
    isHideButtons?: boolean;
}

export interface MonthDataRangeProps extends DataRangeProps {
    isSelectYear?: boolean;
}
