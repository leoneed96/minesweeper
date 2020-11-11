<template>
  <b-container>
    <settings>settings</settings>
    <status-bar
      :mineRemains="processor.minesCount"
      :timer="timer"
      @start-stop-click="onStartStop"
    ></status-bar>
    <field
      :data="gameField"
      :processor="processor"
      @start-stop-click="onStartStop"
      :rowsCount="20"
      :colsCount="20"
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
      gameField: [],
      processor: {
        minesCount: 0,
      },
      timer: new Timer(),
    };
  },
  methods: {
    onStartStop() {
      if(this.timer){
        this.timer.Stop();
      }
      let generator = new Generator(20, 20);
      this.gameField = generator.getField();
      this.processor = new InputProcessor(this.gameField);
      this.timer = new Timer();
      this.started = true;
      this.timer.Start();
    },
  },
  mounted() {
    let generator = new Generator(20, 20);
    this.gameField = generator.getFakeField();
    this.processor = new InputProcessor(this.gameField);
  },
};
</script>
