<template>
  <div class="row">
    <div class="col-3">
      {{mineRemains}}
    </div>
    <div class="col-6">
      <div @click="$emit('start-stop-click')">here comes the face</div>
    </div>
    <div class="col-3">
      {{timeCounter}}
    </div>
  </div>
</template>
<script>
import timer from "../types/timer"
export default {
  props: {
    mineRemains: {
      type: Number,
    },
    timer: {
      type: timer,
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
