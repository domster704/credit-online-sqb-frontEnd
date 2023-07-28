const circleList = document.getElementsByClassName("circle_step_block");
const stepList = document.getElementsByClassName("step");

const horizontalLinesForCircles = document.getElementsByClassName("h_l_c");

function updateCircle() {
    let activeIndex = 0;
    for (let i = 0; i < circleList.length; i++) {
        circleList[i].style.display = "none";
        if (circleList[i].classList.contains("active")) {
            activeIndex = i;
        }
    }
    for (let i = 0; i < horizontalLinesForCircles.length; i++) {
        horizontalLinesForCircles[i].style.display = 'none';
    }

    console.log(activeIndex)
    if (activeIndex - 1 >= 0) {
        circleList[activeIndex - 1].style.display = 'block';
    }
    circleList[activeIndex].style.display = 'block';
    if (activeIndex + 1 < circleList.length) {
        circleList[activeIndex + 1].style.display = 'block';
    }

    let delta = activeIndex + 1;
    console.log(circleList)
    for (let i = delta - 2; i < delta; i++) {
        if (i < 0) continue;
        horizontalLinesForCircles[i].style.display = 'block';
    }

    console.log(circleList[2].style)
}

function nextStep(stepNumber) {
    for (let i = 0; i < circleList.length; i++) {
        circleList[i].classList.remove("active");
        if (i === stepNumber - 1) {
            circleList[i].classList.add("active");
        }
    }

    for (let i = 0; i < stepList.length; i++) {
        stepList[i].classList.remove("active");
        if (i === stepNumber - 1) {
            stepList[i].classList.add("active");
        }
    }

    updateCircle();
}

updateCircle();
