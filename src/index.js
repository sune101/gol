const Gol = require('./gol');
const readline = require('readline');



const clear = () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
};

let gol = new Gol(process.stdout.columns, process.stdout.rows - 1);

const run = () => {
    setTimeout(() => {
        gol.evolve();
        const a = gol.toString();
        clear();
        process.stdout.write(a);
        run();
    }, 70);
};

run();

process.stdout.on('resize', () => {
    gol = new Gol(process.stdout.columns, process.stdout.rows - 1);
});