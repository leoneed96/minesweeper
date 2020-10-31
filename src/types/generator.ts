import cell from "./cell";
import { position } from "./cell";
import { CellType } from "./cell";
export default class Generator {
  constructor(
    rowCount: number,
    colCount: number,
    minesCount: number | undefined
  ) {
    this.rowCount = rowCount;
    this.colCount = colCount;

    this.minesCount =
      minesCount ||
      Math.round(this.rowCount * this.colCount * this.defaultMinesCoeff);
  }

  rowCount: number;
  colCount: number;
  minesCount: number;
  defaultMinesCoeff: number = 0.15625;
  private field: Array<Array<cell>> = new Array<Array<cell>>();
  private flatField: Array<cell> = new Array<cell>();

  public getField() {
    this.initFlatFieldWithMines();
    this.initValues();

    this.setGameField();

    return this.field;
  }
  private initFlatFieldWithMines() {
    let mines = this.getMinesPositions();
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        let curCell = new cell(new position(row, col));
        if (mines.some((x) => x.row == row && x.col == col)) {
          debugger;
          curCell.type = CellType.mine;
        }
        this.flatField.push(curCell);
      }
    }
  }
  private setGameField() {
    if (
      this.flatField.length != this.rowCount * this.colCount ||
      this.flatField.filter((x) => x.type == CellType.mine).length !=
        this.minesCount
    )
      throw new Error("Flat field is not correctly initialized");

    for (let row = 0; row < this.rowCount; row++) {
      this.field.push([]);
      for (let col = 0; col < this.colCount; col++) {
        let cell = this.flatField.filter(
          (x) => x.position.col == col && x.position.row == row
        )[0];
        this.field[row].push(cell);
      }
    }
  }

  private initValues() {
    this.flatField.forEach((cell) => {
      if (cell.type == CellType.mine) return;
      let neighbors = this.getNeighbors(cell.position.row, cell.position.col);
      let minedneighbors = neighbors.filter((x) => x.type == CellType.mine)
        .length;
      if (minedneighbors === 0) {
        cell.type = CellType.island;
        return;
      }
      cell.type = CellType.number;
      cell.number = minedneighbors;
    });
  }
  private getNeighbors(row: number, col: number) {
    let predicate = function(cell: cell) {
      //row + 1
      let condition1 =
        cell.position.row == row + 1 && Math.abs(col - cell.position.col) <= 1;
      // row - 1
      let condition2 =
        cell.position.row == row - 1 && Math.abs(col - cell.position.col) <= 1;
      // same row
      let condition3 =
        cell.position.row == row && Math.abs(col - cell.position.col) == 1;
      return condition1 || condition2 || condition3;
    };
    return this.flatField.filter((x) => predicate(x));
  }
  private getMinesPositions(): Array<position> {
    let result = new Array<position>();
    do {
      let pos = new position(
        this.getRandom(this.rowCount),
        this.getRandom(this.colCount)
      );
      if (!result.some((x) => x.col == pos.col && x.row == pos.row)) {
        result.push(pos);
      }
    } while (result.length != this.minesCount);

    return result;
  }
  private getRandom(max: number) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
  }
}
