<template>
  <div class="HomeRecommend">
    <div v-for="item in recommends" :key='item.id'>
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .HomeRecommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px 0;
    border-bottom: 10px solid #eee;
  }
  .HomeRecommend>div{
    flex: 1;
  }
  .HomeRecommend img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }

</style>
