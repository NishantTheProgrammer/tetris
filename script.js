console.log('hello')

const M = 20;
const N = 10;
let grid;

let pointer = {
    x: 0,
    y: 0,
    color: null,
    shape: []
};

const shapes = [
    [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
    ],
    [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 0, y: 3},
    ]
];


const getRandomColor = () => {
    const random = Math.floor(Math.random() * 10) + 1;
    return random;
}

const saveShapeOnGrid = () => {
    pointer.shape.forEach(({ x, y }) => {
        grid[pointer.x + x][pointer.y + y] = pointer.color;
    });


    console.log(grid);
}

const getRandomShape = () => {
    const index = Math.floor(Math.random() * shapes.length);
    return shapes[index];
}


let i = 2;
const getNextItem = () => {
    saveShapeOnGrid();
    pointer.color = getRandomColor();
    pointer.shape = getRandomShape();
    pointer.x = 0;
    pointer.y = 0;
}

const intializeGrid = () => {
    grid = new Array(N).fill(0).map(() => {
        return new Array(M).fill(0);
    });
    getNextItem();
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


                    let color;

                    const hasColor = pointer.shape.some(obj => {
                        return (obj.x + pointer.x) == rowIndex && (obj.y + pointer.y) == colIndex;
                    });


                    if(hasColor) {
                        color = pointer.color;
                    }




                    return `<div class="${className} color-${color ?? col}"></div>`
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
const printOnGrid = () => {

    const {x, y} = pointer;
    

    // grid[x][y] ;


    render();

}


const startGame = () => {
    intializeGrid();
    render();
}


startGame();

const keyDownHandler = e => {
    switch(e.code) {
        case 'KeyN': getNextItem(); break;
        case 'Space': printOnGrid(); break;
        case 'ArrowUp': move(-1, 0); break;
        case 'ArrowDown': move(1, 0); break;
        case 'ArrowLeft': move(0, -1); break;
        case 'ArrowRight': move(0, 1); break;
    }
    render();
}


document.addEventListener('keydown', keyDownHandler);