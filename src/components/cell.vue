<template>
    <div :style="style" class="cell cursor-pointer" @click="onCellClick">
        <div v-if="!cell.isOpened">?</div>
        <div v-else-if="cell.type == 0">*</div>
        <div v-else>{{cell.number || 'i'}}</div>
    </div>
</template>
<script>
export default {
    props:{
        cell:{
            type: Object,
            default: () => {}
        },
        size: {
            type: Number,
            required: true
        }
    },
    computed:{
        style(){
            let size = this.size + 'rem';
            return {
                width: size,
                height: size
            };
        }
    },
    methods: {
        onCellClick(){
            this.$emit("input", this.cell);
        }
    }

}
</script>
<style scoped>
.cell{
    width: 1rem;
    height: 1rem;
}
</style>