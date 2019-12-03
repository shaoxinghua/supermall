<template>
  <div id="tab-bar-item" @click="routeclick">
    <div v-if="!isActive"><slot name="item-image"></slot></div>
    <div v-else><slot name="item-image-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:{
        type:String
      },
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return {
        // isActive:true,
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {};
      }
    },
    methods:{
      routeclick(){
        this.$router.push(this.path)
        // console.log('route');
      }
    }
  }
</script>

<style scoped>
  #tab-bar-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  #tab-bar-item img{
    margin-top: 2px;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>
