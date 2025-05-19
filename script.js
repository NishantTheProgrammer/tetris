console.log('hello')

const M = 50;
const N = 70;
let grid;

let pointer = {
    x: 0,
    y: 0
};


const getRandomColor = () => {
    const random = Math.floor(Math.random() * 10) + 1;
    return random;
}

const intializeGrid = () => {
    grid = new Array(N).fill(0).map(() => {
        return new Array(M).fill(0);
    })
}

const render = () => {
    const innerHTML = grid.map((row, rowIndex) => {
        return `
            <div class="row">
            ${
                row.map((col, colIndex) => {
                    let className = 'box';
                    if(rowIndex == pointer.x && colIndex == pointer.y) {
                        className += ' selected'
                    }
                    return `<div class="${className} color-${col}"></div>`
                }).join('')
            }
            </div>
        `;
    }).join('');

    document.getElementById('root').innerHTML = innerHTML;
}

const move = (rowIncrease, colIncrease) => {
    pointer.y += rowIncrease;
    pointer.x += colIncrease;
}
const rotate = () => {

    const {x, y} = pointer;
    
    grid[x][y] = getRandomColor();

    render();

}


const startGame = () => {
    intializeGrid();
    render();
}


startGame();

const keyDownHandler = e => {
    console.log(e.code);
    switch(e.code) {
        case 'Space': rotate(); break;
        case 'ArrowUp': move(-1, 0); break;
        case 'ArrowDown': move(1, 0); break;
        case 'ArrowLeft': move(0, -1); break;
        case 'ArrowRight': move(0, 1); break;
    }
    render();
}


document.addEventListener('keydown', keyDownHandler);