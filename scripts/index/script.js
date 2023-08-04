const tabList = document.getElementsByClassName("tab_element");

const imageInvite = document.querySelector(".invite_image");
const imageInviteAfter = document.querySelector(".invite_image_after");
const creditGiftBlock = document.querySelector(".credit_gift_block");

const panelBlock = document.querySelector(".panel_block");

const sliderSum = {
    'short': document.getElementsByClassName("sliderSum")[0],
    'long': document.getElementsByClassName("sliderSum")[1],
};
const sliderSumButton = {
    'short': document.getElementsByClassName("sliderSumButton")[0],
    'long': document.getElementsByClassName("sliderSumButton")[1],
};
const sliderWeek = {
    'short': document.getElementsByClassName("sliderWeek")[0],
    'long': document.getElementsByClassName("sliderWeek")[1],
};

const resSumSale = document.getElementById("resSumSale");
const resSumSaleFinal = document.getElementById("resSumSalePlusAllSum");
const resDate = document.getElementById("resDate");

function equateWidth() {
    imageInvite.onload = () => {
        if (imageInvite.clientWidth !== 0) {
            console.log(imageInvite.clientWidth, 'b')
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


let slidersListShort = document.querySelector('.sliders_list_short');
let slidersListLong = document.querySelector('.sliders_list_long');

function tabClick(tab, tabInfo) {
    for (let i of tabList) {
        if (i.classList.contains("tab_element_active")) {
            i.classList.remove("tab_element_active");
            i.classList.add("tab_element_not_active");
        }
    }

    tab.classList.remove("tab_element_not_active");
    tab.classList.add("tab_element_active");
    switch (tabInfo) {
        case 'short':
            slidersListShort.style.display = 'block';
            slidersListLong.style.display = 'none';

            thumb_color = SLIDER_THUMB_COLOR_SHORT;
            sliderListColor = ['#46AFEB', '#FDFFFF'];
            sliderButtonColor = SLIDER_BUTTON_COLOR_SHORT;
            break;
        case 'long':
            slidersListShort.style.display = 'none';
            slidersListLong.style.display = 'block';
            thumb_color = SLIDER_THUMB_COLOR_LONG;

            sliderListColor = ['#f0933a', '#FDFFFF'];
            sliderButtonColor = SLIDER_BUTTON_COLOR_LONG;
            break;
    }
    state = tabInfo;

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
                sliderSum[state].innerText = slider.value;
                sliderSumButton[state].innerText = sliderSum[state].innerText;

                resSumSale.innerText = ((state === 'long' ? 0.5 : 0.1) * slider.value).toString();
                resSumSaleFinal.innerText = (parseInt(resSumSale.innerText) + parseInt(slider.value)).toString()
                for (let i of document.getElementsByClassName("resSum")) {
                    i.innerText = slider.value;
                }
                break;
            case "2":
                sliderWeek[state].innerText = slider.value;

                let today = new Date();
                today.setDate(today.getDate() + slider.value * (state === 'short' ? 1 : 7));
                resDate.innerText = today.toLocaleDateString();
                break;
        }
    }

    changeProgress();
    changeText();
}

function updateSliders() {
    for (let i of document.getElementsByClassName(`slider_${state}`)) {
        changeSliderData(i, i.attributes['1']);
    }
}

function stepSlider(button, type, action) {
    let slider = document.getElementsByClassName(`mySlider${type}`)[state === 'short' ? 0 : 1];
    slider.value = (parseInt(slider.value) + action * slider.step).toString();
    updateSliders();
}

const menuList = document.querySelector(".hamburger-menu-list")
function toggleMenu(checkBox) {
    menuList.classList.toggle('active');
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
    equateWidth();
}

if (window.innerWidth <= 980)
    resizeTabElements();

for (let i of document.getElementsByClassName("slider")) {
    i.addEventListener("input", event => {
        changeSliderData(i, i.attributes['1'])
    });
    changeSliderData(i, i.attributes['1']);
}

equateWidth();
tabClick(document.querySelector('.tab_element_active'), 'long');

