<template>
  <div
    class="field-container pt-1"
    v-dragscroll.noright="true"
    @click.capture="(e) => dragscrollFix.onClickCapture(e)"
    @dragscrollstart="onDragScrollStart"
    @dragscrollend="onDragScrollEnd"
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
import statusBar from "../components/statusBar";
import InputProcessor from "../types/inputProcessor";
import { dragscroll } from "vue-dragscroll";
import DragScrollClickFix from "../js/DragScrollClickFix";
export default {
  components: {
    cell,
    statusBar,
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
    processor: {
      type: InputProcessor,
      required: true,
    },
  },
  data: function () {
    return {
      cellSize: 2,
      dragscrollFix: new DragScrollClickFix(),
    };
  },
  mounted() {},
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
  watch: {},
  methods: {
    onScroll(e) {
      const step = 0.1;
      e.preventDefault();
      if (e.deltaY < 0) this.cellSize += step;
      else if (this.cellSize - step > 0) this.cellSize -= step;
    },
    onCellInput(cell, updateOnly) {
      this.processor.processInput(cell.position, updateOnly);
    },
    getCell(row, col) {
      return this.data && this.data[row] && this.data[row][col];
    },
    onDragScrollStart(){
      this.dragscrollFix.onDragScrollStart();
      this.$emit("onDrag", true);
    },
    onDragScrollEnd(){
      this.dragscrollFix.onDragScrollEnd();
      this.$emit("onDrag", false);
    }
  },
};
</script>
