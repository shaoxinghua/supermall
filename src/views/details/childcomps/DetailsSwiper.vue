<template>
  <swiper class="details-swiper">
      <swiper-item v-for='item in topImages' :key='item.id'>
        <img :src="item" alt="">
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: '',
  props:{
     topImages:{
         type:Array,
         default(){
             return []
         }
     }
  },
  data () {
    return {
      
    };
  },
  components: {
      Swiper,
      SwiperItem
  },
  mounted () {},
  created() {
    
  }
}
</script>

<style lang='less' scoped>
.details-swiper{
    height: 300px;
    overflow: hidden;
}
</style>