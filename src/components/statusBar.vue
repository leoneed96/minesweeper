<template>
  <div class="row status-bar-container align-items-center ml-0 mr-0 mb-1">
    <div class="col-3">
      {{mineRemains}}
    </div>
    <div class="col-6">
      <div class="face-btn" :class="faceBtnClass" @click="$emit('start-stop-click')">
      </div>
    </div>
    <div class="col-3">
      {{timeCounter}}
    </div>
  </div>
</template>
<script>
import "../styles/status-bar.scss";
import timer from "../types/timer"
import constants from "../js/constants"
export default {
  props: {
    mineRemains: {
      type: Number,
    },
    timer: {
      type: timer,
    },
    status: {
      type: String,
      required: true
    },
    dragging: {
      type: Boolean,
    }
  },
  computed: {
    faceBtnClass(){
      if(this.status === constants.GameStatus.LOST)
        return 'face-btn--lost';
      else if(this.status === constants.GameStatus.WIN)
        return 'face-btn--win';
      else if(this.dragging)
        return "face-btn--action"
    }
  },
  data: function() {
    return {
      startTime: null,
      timeCounter: 0,
      started: false
    };
  },
  watch: {
    "timer.elapsed"(val){
      if(val)
        this.timeCounter = Math.round(val);
    }
  },
  mounted() {
   
  },
  methods: {
    onFaceClick(){
      this.$emit("startStopClick", this.started);
    }
  },
};
</script>
