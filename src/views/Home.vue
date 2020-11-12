<template>
  <div>
     <img class="img mr-1" src="/img/mine_red.jpg" />
     <div style="background-image:'url(/img/mine_red.jpg)'"></div>
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

  }
}
</script>
