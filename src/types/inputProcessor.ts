import cell, { CellType, position } from './cell';
import Utils from './utils';

export default class InputProcessor {
    constructor(gameField: Array<Array<cell>>) {
        let helper = new Utils();
        this.flatField = helper.getFlatArray(gameField);
        this.updateState();
    }
    flatField: Array<cell>;
    private lost: boolean = false;
    public won: boolean = false;
    private utils: Utils = new Utils();
    public minesCount: number = 999;
    public processInput(pos: position, updateOnly: boolean = false) {
        if (updateOnly) {
            this.updateState();
            return;
        }

        if (this.lost || this.won)
            return;

        let cell = this.flatField.find(x => x.position.col == pos.col && x.position.row == pos.row);
        if (cell) {
            cell.isOpened = true;
            cell.isFlag = false;

            if (cell.type == CellType.mine) {
                this.lost = true;
                return false;
            }
            if (cell.type == CellType.number) {
                this.updateState();
                return true;
            }
            if (cell.type == CellType.island) {
                this.openIsland(pos);
                this.updateState();
                return true;
            }
        }

    }
    private isCompleted() {
        return this.flatField.filter(x => x.type === CellType.number).every(x => x.isOpened);
    }
    private updateState() {
        this.minesCount = this.flatField.filter(
            (x) => x.type == CellType.mine
        ).length - this.flatField.filter((x) => x.isFlag).length;

        this.won = this.isCompleted();
    }
    private openIsland(pos: position) {
        var that = this;
        let toOpen = new Array<cell>();

        function getChainedCells(pos: position) {
            let neighborsPredicate = that.utils.getNeighborsPredicate(pos.row, pos.col);
            let closedIslandsOrNumbersPredicate = (cell: cell) =>
                !cell.isOpened && (cell.type == CellType.island || cell.type == CellType.number);

            let first = that.flatField.filter(x =>
                toOpen.indexOf(x) == -1);
            let second = first.filter(neighborsPredicate);
            let third = second.filter(closedIslandsOrNumbersPredicate);
            return third;
        }
        toOpen.push(...getChainedCells(pos));

        for (let i = 0; i < toOpen.length; i++) {
            const cell = toOpen[i];
            cell.isFlag = false;
            cell.isOpened = true;
            if (cell.type == CellType.island)
                toOpen.push(...getChainedCells(cell.position));
        }
    }
}