function createBoard(isFirstBoard = 0) {
    let dimensions;
    if (isFirstBoard) {
        dimensions = 16;
    }
    else {
        dimensions = parseInt(prompt("Please type a dimension for the board"));
        if (dimensions > 100) dimensions = 100;
    }
    
    const height = (1/dimensions)*100
    const container = document.getElementById("container")
    container.innerHTML = '';
    for (let i = 0; i < dimensions; i++)
        for (let j = 0; j < dimensions; j++) {
            const div = document.createElement("div");
            div.style.cssText = `height: ${height}%; width: ${height}%; `
            div.classList.add('pixel');
            container.appendChild(div);
        }
    
    addBoardListeners();
}

function updatePixelColor(pixel, color = 'black') {
    pixel.style.backgroundColor = color;
}

function addBoardListeners() {
    const pixels = document.querySelectorAll('.pixel');
    let mouseDown = 1;  //Keeps track of when mouse is being held down.
    pixels.forEach(pixel => {
        //pixel.onmousedown = () => mouseDown++;
        //pixel.onmouseup  = () => mouseDown--;
        pixel.onmouseover = () => {if (mouseDown) updatePixelColor(pixel)}});
}

function addButtonListeners () {
    const button = document.getElementById("dimensions")
    button.addEventListener("click", () => createBoard());
}

createBoard(1);
addButtonListeners();


