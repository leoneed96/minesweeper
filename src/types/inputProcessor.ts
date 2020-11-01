import cell, { position } from './cell';
import Utils from './utils';

export default class InputProcessor
{
    constructor(gameField: Array<Array<cell>>){
        let helper = new Utils();
        this.flatField = helper.getFlatArray(gameField);
    }
    flatField: Array<cell>;

    public processInput(pos: position)
    {
        let cell = this.flatField.find(x => x.position.col == pos.col && x.position.row == pos.row);
        if(cell){
            cell.isOpened = true;
        }
        // TODO: if island - pick start point then go around and open while you got island or number. Stop moving after 
        // you saw a number. 
    }
}