<template>
  <div class="field-container">
    <b-container :style="containerStyle">
      <b-row class="ml-auto mr-auto" :style="rowStyle" v-for="(row, rowIndex) in data" :key="rowIndex" :cols="row.length">
        <b-col
          class="pl-0 pr-0 flex-grow-0 flex-shrink-1"
          v-for="(col, colIndex) in row"
          :key="colIndex"
        >
          <cell @input="onCellInput" :size="cellSize" :cell="data[rowIndex][colIndex]"></cell>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import cell from "./cell";
import InputProcessor from "../types/inputProcessor"
export default {
  components: {
    cell,
  },
  props: {
    data:{
      type: Array
    },
    rowsCount: {
      type: Number,
      default: 10,
    },
    colsCount: {
      type: Number,
      default: 10,
    },
    cellSize: {
        type: Number,
        default: 5
    }
  },
  data: function() {
   return {
     processor: null,
   }
  },
  mounted() {
   this.processor = new InputProcessor(this.data); 
  },
  computed: {
      rowStyle(){
          return {
              width: this.cellSize * this.colsCount + 'rem'
          }
      },
      containerStyle(){
          return {
              height: '40rem'
          }
      }
  },
  methods:{
    onCellInput(cell){
      console.log(this.processor);
      this.processor.processInput(cell.position);
    },
    getCell(row, col){
      return this.data && this.data[row] && this.data[row][col];
    }
  }
};
</script>

<style scoped>
.col {
  flex-basis: 0;
}
.field-container{
    overflow-x: auto;
    overflow-y: auto;
}
</style>
