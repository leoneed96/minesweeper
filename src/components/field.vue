<template>
  <div class="field-container">
    <b-container :style="containerStyle">
      <b-row class="ml-auto mr-auto" :style="rowStyle" v-for="(row, index) in data" :key="index" :cols="row.length">
        <b-col
          class="pl-0 pr-0 flex-grow-0 flex-shrink-1"
          v-for="(col, index) in row"
          :key="index"
        >
          <cell :size="cellSize"></cell>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import cell from "./cell";
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

   }
  },
  mounted() {
    
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
