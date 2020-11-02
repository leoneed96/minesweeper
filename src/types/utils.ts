import cell from "./cell";

export default class Utils {
  public getFlatArray<T>(twoDimArray: Array<Array<T>>) {
    let result = new Array<T>();
    for (let row = 0; row < twoDimArray.length; row++) {
      for (let col = 0; col < twoDimArray[row].length; col++) {
        result.push(twoDimArray[row][col]);
      }
    }
    return result;
  }
  public getNeighborsPredicate(row: number, col: number) {
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
    return predicate;
  }
}
