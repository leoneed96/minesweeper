<template>
  <b-container>
    <settings>settings</settings>
    <status-bar :mineRemains="processor.minesCount" @start-stop-click="onStartStop"></status-bar>
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
import statusBar from "../components/statusBar"
import settings from "../components/settings";
import field from "../components/field";
import Generator from "../types/generator";
import InputProcessor from '@/types/inputProcessor';
export default {
  name: "Game",
  components: {
    settings,
    field,
    statusBar
  },
  props: {},
  data: function () {
    return {
      started: false,
      gameField: [],
      processor: {
        minesCount: 0
      }
    };
  },
  methods: {
    onStartStop() {
      debugger;
      let generator = new Generator(20, 20);
      this.gameField = generator.getField();
      this.processor = new InputProcessor(this.gameField);
      this.started = true;
    },
  },
  mounted() {
    let generator = new Generator(20, 20);
    this.gameField = generator.getFakeField();
    this.processor = new InputProcessor(this.gameField);
  },
};
</script>
