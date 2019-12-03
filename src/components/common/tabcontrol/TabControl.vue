<template>
  <div class="tab">
    <div v-for="(item,index) in titles" :key="item.id" :class="{active:index === currentIndex}" @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabcontrol",
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex:0,
      }
    },
    methods:{
      itemclick(index){
        this.currentIndex = index;
        this.$emit('tabclick',index)
      }
    }
  }
</script>

<style scoped>
.tab{
  display: flex;
  text-align: center;
  font-size: 15px;
  line-height: 40px;
  height: 40px;
}
  .tab>div{
    flex: 1;
  }
  .tab span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
