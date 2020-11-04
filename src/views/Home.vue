<template>
  <div style="background:red; width:300px;height:300px;overflow:auto" ref="div"  class="home"> 
  <div style="background:red; width:3000px;height:3000px;overflow:auto" v-dragscroll
  v-on:dragscrollmove="doSomething">
  qwe
  </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { dragscroll } from 'vue-dragscroll'

export default {
  name: 'Home',
  directives: {
    'dragscroll': dragscroll
  },
  components: {
    HelloWorld
  },
  methods:{
    doSomething(e){
      console.log("dx",e.detail.deltaX, "dy", e.detail.deltaY);
      this.$refs.div.scrollBy(e.detail.deltaX, e.detail.deltaY);
    }
  }
}
</script>
