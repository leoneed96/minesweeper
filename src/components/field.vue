<template>
  <div
    class="field-container"
    v-dragscroll.noright="true"
    @click.capture="(e) => dragscrollFix.onClickCapture(e)"
    @dragscrollstart="dragscrollFix.onDragScrollStart()"
    @dragscrollend="dragscrollFix.onDragScrollEnd()"
  >
    <b-container :style="containerStyle" @mousewheel="onScroll">
      <b-row
        class="ml-auto mr-auto"
        :style="rowStyle"
        v-for="(row, rowIndex) in data"
        :key="rowIndex"
        :cols="row.length"
      >
        <b-col
          class="pl-0 pr-0 flex-grow-0 flex-shrink-1"
          v-for="(col, colIndex) in row"
          :key="colIndex"
        >
          <cell
            @input="onCellInput"
            :size="cellSize"
            :cell="data[rowIndex][colIndex]"
          ></cell>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import "../styles/field.scss";
import cell from "./cell";
import InputProcessor from "../types/inputProcessor";
import { dragscroll } from "vue-dragscroll";
import DragScrollClickFix from "../js/DragScrollClickFix";
export default {
  components: {
    cell,
  },
  directives: {
    dragscroll: dragscroll,
  },
  props: {
    data: {
      type: Array,
    },
    rowsCount: {
      type: Number,
      default: 10,
    },
    colsCount: {
      type: Number,
      default: 10,
    },
  },
  data: function() {
    return {
      processor: null,
      cellSize: 2,
      dragscrollFix: new DragScrollClickFix(),
    };
  },
  mounted() {
    this.processor = new InputProcessor(this.data);
  },
  computed: {
    rowStyle() {
      return {
        width: this.cellSize * this.colsCount + "rem",
      };
    },
    containerStyle() {
      return {
        height: "40rem",
      };
    },
  },
  methods: {
    onScroll(e) {
      const step = 0.1;
      e.preventDefault();
      if (e.deltaY < 0) this.cellSize += step;
      else if (this.cellSize - step > 0) this.cellSize -= step;
    },
    onCellInput(cell) {
      this.processor.processInput(cell.position);
    },
    getCell(row, col) {
      return this.data && this.data[row] && this.data[row][col];
    },
  },
};
</script>
