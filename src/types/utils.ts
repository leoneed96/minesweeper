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
}
