<template>
    <div :style="style" class="cell">
        1
    </div>
</template>
<script>
export default {
    props:{
        data:{
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
    }
}
</script>
<style scoped>
.cell{
    width: 1rem;
    height: 1rem;
}
</style>