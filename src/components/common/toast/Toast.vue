<template>
  <div class="Toast">
    {{message}}
  </div>
</template>

<script>
export default {
  name: '',
  props:{
      message:{
          type:String,
          default:'哈哈哈'
      }
  },
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
.Toast{
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    color: #fff;
    background-color:rgba(0,0,0,.5);
}
</style>