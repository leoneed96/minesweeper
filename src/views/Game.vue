<template>
  <b-container>
    <settings>settings</settings>
    <b-button @click="startPlay">Play</b-button>
    <field v-if="started" :data="gameField"
    :rowsCount="20"
    :colsCount="20"
    :cellSize="1"
    ></field>
  </b-container>
</template>
<script>
import settings from "../components/settings";
import field from "../components/field";
import Generator from "../types/generator";
export default {
  name: "Game",
  components: {
    settings,
    field,
  },
  props: {
    
  },
  data: function(){
      return {
          started: false,
          gameField: {}
      }
  },
  methods:{
      startPlay(){
        let generator = new Generator(20, 20);
        this.gameField = generator.getField();    
        this.started = true;
      }
  },
  mounted() {
    let generator = new Generator(20, 20);
    let field = generator.getField();
  },
};
</script>
