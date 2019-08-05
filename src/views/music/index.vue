<template>
    <div>music</div>
</template>
<script>
export default {
    created(){
        this.$api.music.getList().then(res => {
            console.log(res);
        })
    }
}
</script>