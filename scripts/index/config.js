const SLIDER_THUMB_COLOR_LONG = '#FFBA7C';
const SLIDER_THUMB_COLOR_SHORT = '#9BD9FD';

const SLIDER_BUTTON_COLOR_LONG = '#FFB371';
const SLIDER_BUTTON_COLOR_SHORT = '#42A7E1';

const MIN_MAX = {
    "short": {
        "sumMinMaxText": ['100 000', '6 млн'],
        "weekMinMaxText": ['5 дней', '30 дней'],
        "sumMinMaxValue": ['1000000', '6000000'],
        "weekMinMaxValue": ['5', '30'],
        "sumValue": "1500000",
        "weekValue": "20",
        'weekType': 'дней'
    },
    "long": {
        "sumMinMaxText": ['1 млн', '25 млн'],
        "weekMinMaxText": ['8 недель', '30 недель'],
        "sumMinMaxValue": ['1000000', '25000000'],
        "weekMinMaxValue": ['8', '30'],
        "sumValue": "4500000",
        "weekValue": "20",
        'weekType': 'недель'
    }
}

const PX_IN_REM = parseFloat(getComputedStyle(document.documentElement).fontSize);