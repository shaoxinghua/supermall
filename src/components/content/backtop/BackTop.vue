<template>
  <div class="BackTop">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data () {
    return {
      
    };
  },
  components: {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
.BackTop{
    position: fixed;
    right: 10px;
    bottom: 50px;
    img{
        width: 43px;
        height: 43px;
    }
    
}
</style>