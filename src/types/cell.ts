export class position {
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
  row: number;
  col: number;
}

export enum CellType {
  mine,
  island,
  number,
}

export default class cell {
  constructor(position: position) {
    this.position = position;
  }
  position: position;
  public type!: CellType;
  public number!: number | undefined;
  public isOpened: boolean = false;
}
