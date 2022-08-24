function updateSelectedColor() {
    selectedColor = document.getElementById('color-picker').value;
}

function generateRandomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16); //https://css-tricks.com/snippets/javascript/random-hex-color/
    randomColorHex = "#" + randomColor;
    return randomColorHex;
}

function updatePixelColor() {
    if (rainbowMode) {
        this.style.backgroundColor = generateRandomColor();
    }
    else {
        this.style.filter = '';
        this.style.backgroundColor = selectedColor;
    }

    if (oscillateMode) {
        this.style.filter = `brightness(${currentBrightness}%)`;
        currentBrightness -= oscillateBy;
        if (currentBrightness <= 0 || currentBrightness >= 100)
            oscillateBy = -oscillateBy;
    }
}

function addPixelListeners(pixel) {
    pixel.addEventListener("mouseover", updatePixelColor)
}

function clearBoard() {
    pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = defaultColor;
        pixel.style.filter = '';
    });
}

function toggleRainbowMode() {
    rainbowMode = !rainbowMode;
}

function toggleOscillateMode() {
    oscillateMode = !oscillateMode;
}

function createBoard() {
    const dimensions = document.getElementById("dims-slider").value;
    const height = (1/dimensions)*100
    const container = document.getElementById("container")
    container.innerHTML = '';
    for (let i = 0; i < dimensions; i++)
        for (let j = 0; j < dimensions; j++) {
            const pixel = document.createElement("div");
            pixel.style.cssText = `background-color: ${defaultColor}; height: ${height}%; width: ${height}%; `
            pixel.classList.add('pixel');
            addPixelListeners(pixel);
            container.appendChild(pixel);
        } 
}

function addInputListeners () {
    const dimSlider = document.getElementById("dims-slider");
    dimSlider.addEventListener("change", createBoard);

    const colorPicker = document.getElementById("color-picker");
    colorPicker.addEventListener("change", updateSelectedColor);

    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", clearBoard);

    const rainbowButton = document.getElementById("rainbow");
    rainbowButton.addEventListener("click", toggleRainbowMode);

    const oscillateButton = document.getElementById("oscillate");
    oscillateButton.addEventListener("click", toggleOscillateMode);
}

const defaultColor = "white";
let selectedColor = document.getElementById("color-picker").value;

let rainbowMode = false;

let oscillateMode = false;
let currentBrightness = 100;
let oscillateBy = 3;    //How much the brightness of the color will decrease by

createBoard();
addInputListeners();


