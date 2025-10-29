const TRANSPARENT = '#00000000';

export default {
    primary: {
        blue: {
            default: {bg: '#006FBA', text: '#FFFFFF', icon: '#FFFFFF'},
            hover: {bg: '#0066AB'},
            active: {bg: '#005086'},
            disabled: {bg: '#B3D4EB', text: '#FFFFFF', icon: '#FFFFFF'},
            loading: {bg: '#006FBA', icon: '#FFFFFF'}
        },
        gray: {
            default: {bg: '#9EB5C6', text: '#FFFFFF', icon: '#FFFFFF'},
            hover: {bg: '#8AA5BA'},
            active: {bg: '#7492A9'},
            disabled: {bg: '#CFDAE2', text: '#FFFFFF', icon: '#FFFFFF'},
            loading: {bg: '#9EB5C6', icon: '#FFFFFF'}
        },
        green: {
            default: {bg: '#24C38E', text: '#FFFFFF', icon: '#FFFFFF'},
            hover: {bg: '#1AAB7B'},
            active: {bg: '#168E66'},
            disabled: {bg: '#A7E7D2', text: '#FFFFFF', icon: '#FFFFFF'},
            loading: {bg: '#24C38E', icon: '#FFFFFF'}
        },
        red: {
            default: {bg: '#EB5757', text: '#FFFFFF', icon: '#FFFFFF'},
            hover: {bg: '#DC4A4A'},
            active: {bg: '#CF3D3D'},
            disabled: {bg: '#F5ABAB', text: '#FFFFFF', icon: '#FFFFFF'},
            loading: {bg: '#EB5757', icon: '#FFFFFF'}
        },
    },
    outlined: {
        blue: {
            default: {bg: '#FFFFFF', text: '#006FBA', border: '#006FBA', icon: '#006FBA'},
            hover: {bg: '#DDF1FC80'},
            active: {bg: '#DDF1FC'},
            disabled: {bg: '#FFFFFF', text: '#B3D4EB', border: '#B3D4EB', icon: '#B3D4EB'},
            loading: {bg: '#FFFFFF', icon: '#006FBA'}
        },
        gray: {
            default: {bg: '#FFFFFF', text: '#8AA5BA', border: '#9EB5C6', icon: '#8AA5BA'},
            hover: {bg: '#F4F7FA'},
            active: {bg: '#ECF0F4'},
            disabled: {bg: '#FFFFFF', text: '#CFDAE2', border: '#CFDAE2', icon: '#CFDAE2'},
            loading: {bg: '#FFFFFF', icon: '#9EB5C6'}
        },
        green: {
            default: {bg: '#FFFFFF', text: '#24C38E', border: '#24C38E', icon: '#24C38E'},
            hover: {bg: '#EFFBF7'},
            active: {bg: '#DEF6EE'},
            disabled: {bg: '#FFFFFF', text: '#A7E7D2', border: '#A7E7D2', icon: '#A7E7D2'},
            loading: {bg: '#FFFFFF', icon: '#24C38E'}
        },
        red: {
            default: {bg: '#FFFFFF', text: '#EB5757', border: '#EB5757', icon: '#EB5757'},
            hover: {bg: '#FCEEEE'},
            active: {bg: '#FFDADA'},
            disabled: {bg: '#FFFFFF', text: '#F5ABAB', border: '#F5ABAB', icon: '#F5ABAB'},
            loading: {bg: '#FFFFFF', icon: '#EB5757'}
        },
    },
    secondary: {
        blue: {
            default: {bg: '#DDF1FC', text: '#596E7A', border: '#E6E9EB', icon: '#596E7A'},
            hover: {bg: '#D0EDFD'},
            active: {bg: '#C5EAFF'},
            disabled: {bg: '#F0F9FF', text: '#B3BDC2', icon: '#B3BDC2'},
            loading: {bg: '#DDF1FC', icon: '#002033'}
        },
        gray: {
            default: {bg: '#F2F4F4', text: '#596E7A', border: '#E6E9EB', icon: '#73858F'},
            hover: {bg: '#E6E9EB'},
            active: {bg: '#D9DEE1'},
            disabled: {bg: '#F9F9F9', text: '#B3BDC2', icon: '#B3BDC2'},
            loading: {bg: '#F2F4F4', icon: '#002033'}
        },
        green: {
            default: {bg: '#DEF6EE', text: '#596E7A', border: '#E6E9EB', icon: '#596E7A'},
            hover: {bg: '#C9F2E5'},
            active: {bg: '#B9EDDB'},
            disabled: {bg: '#EFFBF7', text: '#B3BDC2', icon: '#B3BDC2'},
            loading: {bg: '#DEF6EE', icon: '#002033'}
        },
        red: {
            default: {bg: '#FCEEEE', text: '#596E7A', border: '#E6E9EB', icon: '#596E7A'},
            hover: {bg: '#FFDADA'},
            active: {bg: '#FFC5C5'},
            disabled: {bg: '#FFF9F9', text: '#B3BDC2', icon: '#B3BDC2'},
            loading: {bg: '#FCEEEE', icon: '#002033'}
        },
    },
    subtle: {
        blue: {
            default: {bg: TRANSPARENT, text: '#006FBA', border: TRANSPARENT, icon: '#006FBA'},
            hover: {bg: '#F0F9FF'},
            active: {bg: '#DDF1FC'},
            disabled: {bg: TRANSPARENT, text: '#B3D4EB', icon: '#B3D4EB'},
            loading: {icon: '#006FBA',}
        },
        gray: {
            default: {bg: TRANSPARENT, text: '#73858F', border: TRANSPARENT, icon: '#73858F'},
            hover: {bg: '#F2F4F4'},
            active: {bg: '#E6E9EB'},
            disabled: {bg: TRANSPARENT, text: '#D9DEE1', icon: '#D9DEE1'},
            loading: {icon: '#002033'}
        },
        green: {
            default: {bg: TRANSPARENT, text: '#24C38E', border: TRANSPARENT, icon: '#24C38E'},
            hover: {bg: '#EFFBF7'},
            active: {bg: '#DEF6EE'},
            disabled: {bg: TRANSPARENT, text: '#A7E7D2', icon: '#A7E7D2'},
            loading: {icon: '#24C38E'}
        },
        red: {
            default: {bg: TRANSPARENT, text: '#EB5757', border: TRANSPARENT, icon: '#EB5757'},
            hover: {bg: '#FCEEEE'},
            active: {bg: '#FFDADA'},
            disabled: {bg: TRANSPARENT, text: '#F5ABAB', icon: '#F5ABAB'},
            loading: {icon: '#EB5757'}
        },
    },
    forModal: {
        blue: {
            default: {bg: '#DDF1FC', text: '#002033', border: TRANSPARENT, icon: '#006FBA'},
            hover: {bg: '#D0EDFD'},
            active: {bg: '#C5EAFF'},
            disabled: {bg: '#F0F9FF', text: '#B3BDC2', icon: '#B3D4EB'},
            loading: {bg: '#DDF1FC', icon: '#006FBA'}
        },
        gray: {
            default: {bg: '#F2F4F4', text: '#002033', border: TRANSPARENT, icon: '#73858F'},
            hover: {bg: '#E6E9EB'},
            active: {bg: '#D9DEE1'},
            disabled: {bg: '#F9F9F9', text: '#B3BDC2', icon: '#B3BDC2'},
            loading: {bg: '#F2F4F4', icon: '#002033'}
        },
        green: {
            default: {bg: '#DEF6EE', text: '#002033', border: TRANSPARENT, icon: '#596E7A'},
            hover: {bg: '#C9F2E5'},
            active: {bg: '#B9EDDB'},
            disabled: {bg: '#EFFBF7', text: '#B3BDC2', icon: '#B3BDC2'},
            loading: {bg: '#DEF6EE', icon: '#002033'}
        },
        red: {
            default: {bg: '#FCEEEE', text: '#002033', border: TRANSPARENT, icon: '#EB5757'},
            hover: {bg: '#FFDADA'},
            active: {bg: '#FFC5C5'},
            disabled: {bg: '#FFF9F9', text: '#B3BDC2', icon: '#F5ABAB'},
            loading: {bg: '#FCEEEE', icon: '#EB5757'}
        },
    },
};













