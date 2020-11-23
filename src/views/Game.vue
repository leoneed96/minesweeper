<template>
  <b-container class="game-container">
    <settings @settingsChanged="onSettingsChanged">settings</settings>
    <status-bar
      :mineRemains="processor.minesCount"
      :timer="timer"
      :dragging="dragging"
      :status="gameStatus"
      @start-stop-click="onStartStop"
    ></status-bar>
    <field
      :data="gameField"
      :processor="processor"
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
      started: false,
      gameStatus: constants.GameStatus.NOT_STARTED,
      gameField: [],
      dragging: false,
      processor: {
        minesCount: 0,
      },
      timer: new Timer(),
      fieldParams: {
        mines: 10,
        rows: 8,
        cols: 8,
      },
    };
  },
  methods: {
    onStartStop() {
      if (this.timer) {
        this.timer.Stop();
      }
      let generator = this.getGenerator();
      this.gameStatus = constants.GameStatus.STARTED;
      this.gameField = generator.getField();
      this.processor = new InputProcessor(this.gameField);
      this.timer = new Timer();
      this.started = true;
      this.timer.Start();
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
      this.onStartStop();
    },
    getGenerator(){
      return new Generator(
        this.fieldParams.rows,
        this.fieldParams.cols,
        this.fieldParams.mines,
      );
    }
  },
  mounted() {

  },
};
</script>
<style lang="scss" scoped>
.game-container {
  border-color: #c0c0c0;
}
</style>