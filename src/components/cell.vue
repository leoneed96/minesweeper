<template>
  <div
    :style="sizeStyle"
    class="cell-container"
    :class="cell.isOpened ? 'cell-container--opened' : ''"
    @click="onCellClick"
    @contextmenu="processFlag"
  >
    <div
      class="cell-content cell-content--closed"
      :style="cellStyle"
      v-if="!cell.isOpened"
    ></div>
    <div
      class="cell-content cell-content--mine"
      :style="cellStyle"
      v-else-if="cell.type == 0"
    >
      *
    </div>
    <div
      class="cell-content cell-content--island"
      :style="cellStyle"
      v-else-if="cell.type == 1"
    ></div>
    <div
      class="cell-content cell-content--num"
      :style="cellStyle"
      :class="getNumClass(cell)"
      v-else
    >
      {{ cell.number }}
    </div>
  </div>
</template>
<script>
import "../styles/cell.scss";
export default {
  props: {
    cell: {
      type: Object,
      default: () => {},
    },
    size: {
      type: Number,
      required: true,
    },
  },
  computed: {
    sizeStyle() {
      let size = this.size + "rem";
      return {
        width: size,
        height: size,
      };
    },
    cellStyle() {
      let style = {
        "border-width": this.size / 8 + "rem",
        "font-size": this.size / 1.5 + "rem",
      };
      if (this.cell.isFlag)
        style["background-image"] = `url(${require("@/assets/flag.png")})`;
      return style;
    },
  },
  data: function() {
    return {
      isFlag: false,
    };
  },
  methods: {
    onCellClick() {
      if (!this.cell.isFlag) this.$emit("input", this.cell);
    },
    getNumClass(cell) {
      if (cell.type == 2) return `cell-content--num--${cell.number}`;
    },
    processFlag(e) {
      e.preventDefault();
      if (this.cell.isOpened) return;
      this.cell.isFlag = !this.cell.isFlag;
      this.$emit("input", this.cell, true);
    },
  },
};
</script>
<style scoped></style>
