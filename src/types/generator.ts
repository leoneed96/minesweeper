import cell from "./cell";
import { position } from "./cell";
import { CellType } from "./cell";
import utils from "./utils";
export default class Generator {
  constructor(
    rowCount: number,
    colCount: number,
    minesCount: number | undefined,
    easyStart: boolean = false
  ) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.easyStart = easyStart;
    this.minesCount =
      !!minesCount ? minesCount :
        Math.round(this.rowCount * this.colCount * this.defaultMinesCoeff);
  }

  easyStart: boolean = false;
  rowCount: number;
  colCount: number;
  minesCount: number;
  defaultMinesCoeff: number = 0.15625;
  private utils: utils = new utils();
  private field: Array<Array<cell>> = new Array<Array<cell>>();
  private flatField: Array<cell> = new Array<cell>();

  public generateEmptyField() {
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        let curCell = new cell(new position(row, col));
        curCell.type = CellType.fake;
        this.flatField.push(curCell);
      }
    }
    this.setGameField(false);
    return this.field;
  }
  public initializeField(startPoint: position, easyStart: boolean) {
    if (easyStart)
      this.initStartIsland(startPoint);

    this.initMines();
    this.initValues();
    this.setGameField();

    return this.field;
  }

  private initMines() {
    let mines = this.getMinesPositions();
    mines.forEach(mine => {
      let item = this.flatField.find(x => x.position.col == mine.col && x.position.row == mine.row);
      if (item)
        item.type = CellType.mine;
    })
  }
  private setGameField(check: boolean = true) {
    if (
      check && (
        this.flatField.length != this.rowCount * this.colCount ||
        this.flatField.filter((x) => x.type == CellType.mine).length !=
        this.minesCount)
    )
      throw new Error("Flat field is not correctly initialized");
    this.field = new Array<Array<cell>>();
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
      if (cell.type !== CellType.fake) return;
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
    return this.flatField.filter(this.utils.getNeighborsPredicate(row, col));
  }
  private getMinesPositions(): Array<position> {
    let availablePositions = this.getAvailableMinePositions();

    if (availablePositions.length < this.minesCount)
      throw "availablePositions.length < this.minesCount";

    let result = new Array<position>();
    do {
      let rndVal = this.getRandomArrayElement(availablePositions);
      availablePositions.splice(availablePositions.indexOf(rndVal), 1);
      result.push(rndVal);
    } while (result.length != this.minesCount);
    return result;
  }
  private initStartIsland(startPoint: position): void {
    const areaSize = this.getStartIslandArea();
    var flatField = this.flatField;
    let setIsland = (point: position) => {
      let startCell = flatField.find(x => x.position.col == point.col && x.position.row == point.row);
      if (startCell)
        startCell.type = CellType.island;
    };
    setIsland(startPoint);
    let currentAreaSize = 1;
    while (currentAreaSize != areaSize) {
      let potencialIslands = new Array<cell>();
      this.flatField.filter(x => x.type == CellType.island).forEach(item => {
        let neighbors = this.getNeighbors(item.position.row, item.position.col).filter(x => x.type !== CellType.island);
        potencialIslands = potencialIslands.concat(neighbors);
      })
      let neighborToOpen = this.getRandomArrayElement(potencialIslands);
      setIsland(neighborToOpen.position);
      currentAreaSize++;
    }

  }
  private getStartIslandArea() {
    const totalCells = this.flatField.length;
    const freePart = 1 - (this.minesCount / totalCells);
    const maxIslandPart = 0.2 * freePart;

    const maxIslandArea = Math.round(totalCells * maxIslandPart);
    const minIslandArea = 1;
    const islandArea = this.getRandom(minIslandArea, maxIslandArea);

    return islandArea;
  }
  private getAvailableMinePositions(): Array<position> {
    return this.flatField.filter(x =>
      x.type !== CellType.island &&
      !this.getNeighbors(x.position.row, x.position.col).some(x => x.type == CellType.island))
      .map(x => x.position);
  }
  private getRandom(max: number, min: number = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  private getRandomArrayElement<T>(arr: Array<T>) {
    let index = this.getRandom(0, arr.length);
    return arr[index];
  }
}
