
const wrap = (pos, max) => {
    let norm = pos;

    if (pos < 0) {
        norm = max + pos;
    } else if (pos > max - 1) {
        norm = pos - norm;
    }
    return norm;
};

const randomBinary = () => {
    return Math.floor(Math.random() + 0.2);
};


class Gol {

    constructor(x, y) {
        this.current = this.createMatrix(x, y);
        this.x = x;
        this.y = y;
        this.cordMask = [
            {x: -1, y: -1},
            {x: -1, y: 0},
            {x: -1, y: 1},
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: 1, y: -1},
            {x: 1, y: 0},
            {x: 1, y: 1},
        ];
    }

    createMatrix(width, height) {
        return Array.from({ length: height }, () => new Array(width).fill(0)).map(row => row.map(() => randomBinary()));
    }
    
    add(cordA, cordB) {
        return {
            x: wrap(cordA.x + cordB.x, this.x),
            y: wrap(cordA.y + cordB.y, this.y)
        };
    }

    isAlive(cord) {
        return this.current[cord.y][cord.x];
    }

    numberOfLivingNeighbours(cord) {
        return this.cordMask.reduce((total, mask) => total + this.isAlive(this.add(mask, cord)), 0);
    }

    newState(cord) {
        const neighbours = this.numberOfLivingNeighbours(cord);
        return this.isAlive(cord)
            ? neighbours > 3 || neighbours < 2 ? 0 : 1
            : neighbours != 3 ? 0 : 1; 
    }
    evolve() {
        this.current = this.current.map((column, y) => column.map((cell, x)=> this.newState({x: x, y: y})));
    }

    toString() {
        return this.current.reduce((total, row) => total + row.join('').replace(/0/g, ' ').replace(/1/g, '*') + '\n', '');
    }
}

module.exports = Gol;