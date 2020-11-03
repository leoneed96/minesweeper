<template>
    <div :style="style" class="cell-container" :class="cell.isOpened ? 'cell-container--opened' : ''" @click="onCellClick">
        <div class="cell-content cell--closed" v-if="!cell.isOpened"></div>
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
    background: #c0c0c0;
}
.cell-container--opened{
    border: solid 0.11rem #888888;
}
.cell-content{
    flex:1;
}
.cell--island{
    width: 100%;
    height: 100%;
}
.cell--num{
    font-weight: bold;
}

.cell--closed{
    width: 100%;
    height: 100%;
    border-top: #f4f4f4 solid;
    border-left: #f4f4f4 solid;
    border-bottom: #808080 solid;
    border-right: #808080 solid;
}
.number-1{
    color: #1d11f9;
}
.number-2{
    color: #077b08;
}
.number-3{
    color: #077b08;
}
.number-4{
    color: #090380;
}
.number-5{
    color: #090380;
}
.number-6{
    color: #1d11f9;
}
.number-7{
    color: #000000;
}
.number-8{
    color: #bdbdbd;
}
</style>