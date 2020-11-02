<template>
    <div :style="style" class="cell-container" @click="onCellClick">
        <div class="cell-content cell--closed" v-if="!cell.isOpened">?</div>
        <div class="cell-content cell--mine" v-else-if="cell.type == 0">*</div>
        <div class="cell-content cell--island" v-else-if="cell.type == 1"></div>
        <div class="cell-content cell--num" :class="getNumClass(cell)" v-else>{{cell.number}}</div>
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
        },
        getNumClass(cell){
            if(cell.type == 2)
            return `number-${cell.number}`;
        }
    }

}
</script>
<style scoped>
.cell-container{
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.cell-container:hover{
    background: whitesmoke;
}
.cell-content{
    flex:1;
}
.cell--island{
    background: #d4d3d3;
    width: 100%;
    height: 100%;
}
</style>