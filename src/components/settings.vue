<template>
  <div>
    <b-icon-gear-fill @click="showModal = !showModal" />
    <b-modal v-model="showModal"> </b-modal>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      settings: {
        rows: 20,
        cols: 20,
        mines: null,
      },
      showModal: false,
    };
  },
  methods: {
      onChange(){
          this.$emit("settingsChanged", this.data.settings);
      }
  },
};
</script>
