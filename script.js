console.log('hello')

const M = 20;
const N = 10;
let grid;
const intializeGrid = () => {
    grid = new Array(N).fill(0).map(() => {
        return new Array(M).fill(0);
    })
}

const render = () => {
    console.log(grid);

    const innerHTML = grid.map(row => {
        return `
            <div class="row">
            ${
                row.map(col => {
                    return `<div class="box">${col}</div>`
                }).join('')
            }
            </div>
        `;
    }).join('');

    document.getElementById('root').innerHTML = innerHTML;
}



const startGame = () => {
    intializeGrid();
    render();
}


startGame();