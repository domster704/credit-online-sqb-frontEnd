const tabList = document.getElementsByClassName("tab_element");

const imageInvite = document.querySelector(".invite_image");
const imageInviteAfter = document.querySelector(".invite_image_after");
const creditGiftBlock = document.querySelector(".credit_gift_block");

const panelBlock = document.querySelector(".panel_block");

const sliderSum = document.getElementById("sliderSum");
const sliderSumButton = document.getElementById("sliderSum2");
const sliderWeek = document.getElementById("sliderWeek");

const sliderSumMin = document.getElementById("sliderSumMin");
const sliderSumMax = document.getElementById("sliderSumMax");
const sliderWeekMin = document.getElementById("sliderWeekMin");
const sliderWeekMax = document.getElementById("sliderWeekMax");

const weekType = document.getElementById("weekType");

function equateWidth() {
    imageInvite.onload = () => {
        if (imageInvite.clientWidth !== 0) {
            creditGiftBlock.style.width = imageInvite.clientWidth + 'px';
        }
    };
    imageInviteAfter.onload = () => {
        if (imageInviteAfter.clientWidth !== 0) {
            creditGiftBlock.style.width = imageInviteAfter.clientWidth + 'px';
        }
    };
}

let state = 'long';
let thumb_color = SLIDER_THUMB_COLOR_LONG;
let sliderListColor = ['#f0933a', '#FDFFFF'];
let sliderButtonColor = SLIDER_BUTTON_COLOR_LONG;

function tabClick(tab, tabInfo) {
    for (let i of tabList) {
        if (i.classList.contains("tab_element_active")) {
            i.classList.remove("tab_element_active");
            i.classList.add("tab_element_not_active");
        }
    }

    tab.classList.remove("tab_element_not_active");
    tab.classList.add("tab_element_active");
    state = tabInfo;

    switch (state) {
        case 'long':
            thumb_color = SLIDER_THUMB_COLOR_LONG;
            sliderListColor = ['#f0933a', '#FDFFFF'];

            sliderButtonColor = SLIDER_BUTTON_COLOR_LONG;
            break;
        case 'short':
            thumb_color = SLIDER_THUMB_COLOR_SHORT;
            sliderListColor = ['#46AFEB', '#FDFFFF'];

            sliderButtonColor = SLIDER_BUTTON_COLOR_SHORT;
            break;
    }

    let dict = MIN_MAX[tabInfo];
    sliderSumMin.innerText = dict['sumMinMaxText'][0];
    sliderSumMax.innerText = dict['sumMinMaxText'][1];

    sliderWeekMin.innerText = dict['weekMinMaxText'][0];
    sliderWeekMax.innerText = dict['weekMinMaxText'][1];

    let slider1 = document.getElementById('mySlider1');
    slider1.min = dict['sumMinMaxValue'][0];
    slider1.max = dict['sumMinMaxValue'][1];
    slider1.value = dict['sumValue'];

    let slider2 = document.getElementById('mySlider2');
    slider2.min = dict['weekMinMaxValue'][0];
    slider2.max = dict['weekMinMaxValue'][1];
    slider2.value = dict['weekValue'];

    weekType.innerText = dict['weekType'];

    for (let i of document.getElementsByClassName('slider_sum_button')) {
        i.style.setProperty('--slider-button-color', sliderButtonColor);
    }

    updateSliders();
}

function resizeTabElements() {
    let textWidth = 0;
    for (let i of tabList) {
        i.style.paddingLeft = i.style.paddingRight = '0';
        textWidth += i.clientWidth;
    }

    let widthForPadding = panelBlock.clientWidth - textWidth;
    for (let i of tabList) {
        i.style.paddingLeft = i.style.paddingRight = ((widthForPadding / 2.0 / tabList.length) / PX_IN_REM) + 'rem';
    }
}

function changeSliderData(slider, type) {
    function changeProgress() {
        const VW_IN_PX = window.innerWidth / 100.0;

        let progress = 100.0 * (slider.value - slider.min) / (slider.max - slider.min);
        let thumbSize = (() => {
            const size = 3.5 * VW_IN_PX;
            if (size <= 18) {
                return 18;
            } else if (size >= 32) {
                return 32;
            }
            return size;
        })();

        let delta = progress > 70 ? -1 : (progress < 30 ? 1 : 0);
        progress += delta * (thumbSize / 2.0 / slider.clientWidth * 100.0)

        slider.style.setProperty('--thumb-color', thumb_color);
        slider.style.background = `linear-gradient(to right, ${sliderListColor[0]} ${progress}%, ${sliderListColor[1]} ${progress}%)`;
    }

    function changeText() {
        switch (type.value) {
            case "1":
                sliderSum.innerText = slider.value + "\u00A0";
                sliderSumButton.innerText = sliderSum.innerText;
                for (let i of document.getElementsByClassName("resSum")) {
                    i.innerText = slider.value + "\u00A0";
                }
                break;
            case "2":
                sliderWeek.innerText = slider.value + "\u00A0";
                break;
        }
    }

    changeProgress();
    changeText();
}

function updateSliders() {
    for (let i of document.getElementsByClassName("slider")) {
        changeSliderData(i, i.attributes['2']);
    }
}

function stepSlider(button, type, action) {
    let slider = document.getElementById(`mySlider${type}`);
    slider.value = (parseInt(slider.value) + action * slider.step).toString();
    updateSliders();
}

window.onresize = () => {
    if (window.innerWidth <= 980)
        resizeTabElements();
    else {
        for (let i of tabList) {
            i.style.paddingLeft = i.style.paddingRight = '1.5rem';
        }
    }

    updateSliders();
}

if (window.innerWidth <= 980)
    resizeTabElements();

for (let i of document.getElementsByClassName("slider")) {
    i.addEventListener("input", event => {
        changeSliderData(i, i.attributes['2'])
    });
    changeSliderData(i, i.attributes['2']);
}
equateWidth();
tabClick(document.querySelector('.tab_element_active'), 'long');

