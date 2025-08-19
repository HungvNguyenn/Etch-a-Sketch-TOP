const container = document.getElementById("container");
const resetBtn = document.getElementById("resetBtn");

const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;
const CONTAINER_SIZE = 640;

function makeGrid(size) {
    container.innerHTML = "";
    const squareSize = CONTAINER_SIZE / size;

    for(let i = 0; i < size * size; i++){
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.dataset.darkness = 0;
        square.dataset.baseColor = "";

        //hovering effect
        square.addEventListener("mouseenter", () => {
            let darkness = parseInt(square.dataset.darkness);

            if(!square.dataset.baseColor) {
                const r = Math.floor(Math.random() * 106) + 150;
                const g = Math.floor(Math.random() * 106) + 150;
                const b = Math.floor(Math.random() * 106) + 150;

                square.dataset.baseColor = `${r},${g},${b}`;
                square.style.backgroundColor = `rgb(${r},${g},${b})`;
            }

            if (darkness < 10) {
                darkness++;
                square.dataset.darkness = darkness;

                //calculating darkened color
                const [r, g, b] = square.dataset.baseColor.split(',').map(Number);
                const factor = 1 - darkness * 0.1;
                const newR = Math.floor(r * factor);
                const newG = Math.floor(g * factor);
                const newB = Math.floor(b * factor);

                square.style.backgroundColor = `rgb(${newR},${newG},${newB})`;
            }
        });
        
        container.appendChild(square);
    }
}


//action listener for reset button, reset color but keep size
resetBtn.addEventListener("click", () => {
    const squares = container.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = '';
        square.dataset.baseColor = '';
        square.dataset.darkness = 0;
    });
});

resizeBtn.addEventListener("click", () => {
  let newSize;

  do {
    newSize = parseInt(prompt("Enter new grid size (max 100 | default size is 16): "));

  if (Number.isNaN(newSize) || newSize < 1 || newSize > MAX_SIZE) {
    alert('Please enter a valid number.');
    newSize = null;
        } 
    } while(!newSize);
  
  makeGrid(newSize);
});

makeGrid(DEFAULT_SIZE);