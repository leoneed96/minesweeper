<template>
  <b-container class="game-container">
    <settings @settingsChanged="onSettingsChanged">settings</settings>
    <status-bar
      :mineRemains="processor && processor.minesCount"
      :timer="timer"
      :dragging="dragging"
      :status="gameStatus"
      @start-stop-click="onStartStop"
    ></status-bar>
    <field
      ref="field"
      :data="gameField"
      :processor="processor"
      @startGame="onStart"
      @mineHit="onMineHit"
      @won="onWin"
      @start-stop-click="onStartStop"
      @onDrag="dragging = $event"
      :rowsCount="fieldParams.rows"
      :colsCount="fieldParams.cols"
    ></field>
  </b-container>
</template>
<script>
import statusBar from "../components/statusBar";
import settings from "../components/settings";
import field from "../components/field";
import Generator from "../types/generator";
import InputProcessor from "@/types/inputProcessor";
import Timer from "../types/timer";
import constants from "../js/constants";
export default {
  name: "Game",
  components: {
    settings,
    field,
    statusBar,
  },
  props: {},
  data: function () {
    return {
      gameStatus: constants.GameStatus.NOT_STARTED,
      gameField: [],
      dragging: false,
      processor: null,
      timer: new Timer(),
      fieldParams: {
        mines: 10,
        rows: 8,
        cols: 8,
      },
      generator: null,
    };
  },
  methods: {
    onStartStop() {
      this.initClearField();
    },
    onMineHit() {
      this.timer.Stop();
      this.gameStatus = constants.GameStatus.LOST;
    },
    onWin() {
      this.timer.Stop();
      this.gameStatus = constants.GameStatus.WIN;
    },
    onSettingsChanged(event) {
      this.fieldParams = event.data;
      this.updateGenerator();
      this.initClearField();
    },
    onStart(cell) {
      // TODO: show loading
      this.generator.initializeField(cell);
      this.processor = new InputProcessor(this.gameField);
      this.gameStatus = constants.GameStatus.STARTED;
      if (this.timer) {
        this.timer.Stop();
      }
      this.timer = new Timer();

      this.$nextTick(() => {
        this.$refs.field.onCellInput(cell);
        this.timer.Start();
      });
    },
    initClearField() {
      if (this.timer) {
        this.timer.Stop();
      }
      this.timer = new Timer();
      this.gameStatus = constants.GameStatus.STARTED;
      this.processor = null;
      this.updateGenerator();
      this.gameField = this.generator.generateEmptyField();
    },
    updateGenerator() {
      this.generator = new Generator(
        this.fieldParams.rows,
        this.fieldParams.cols,
        this.fieldParams.mines
      );
    },
  },
  mounted() {
    this.initClearField();
  },
};
</script>
<style lang="scss" scoped>
.game-container {
  border-color: #c0c0c0;
}
</style>