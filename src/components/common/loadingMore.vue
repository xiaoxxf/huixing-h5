<template>
 <div class="loading_container" v-if='loadingMoreShow'>
   <p class="loadingMoreShow">加载中...</p>
 </div>
</template>

<script>
   export default {
     data(){
           return{

           }
       },
     props: ['loadingMoreShow'],

     mounted(){

     },
     beforeDestroy(){
     }
   }
</script>

<style lang="scss" scoped>
   @import '../../style/mixin';
   .loadingMoreShow{
     margin-bottom: 2rem;
     text-align: center;
     color: grey;
     font-size: 0.7rem;
     padding: .4rem 0;
   }
</style>
