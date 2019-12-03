<template>
  <div class="DetailsNavbar">
      <nav-bar>
          <div slot="left" class="left" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
            <div  class='title-item' v-for='(item,index) in titles' :key="item" :class="{active:index===currentIndex}" @click='titleClick(index)'>{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from  "components/common/navbar/NavBar"
export default {
  name: 'DetailsNavbar',
  data () {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
    };
  },
  components: {
      NavBar
  },
  mounted () {},
  methods: {
      titleClick(index) {
          this.currentIndex = index;
          this.$emit('titleClick',index)
      },
      backClick(){
          this.$router.back();
      }
  }
}
</script>

<style lang='less' scoped>
.left{
    img{
        margin-top:10px;
    }
}
.title{
    display: flex;
    font-size:13px; 
    .title-item{
        flex:1;
    }
    .active{
        color:var(--color-high-text);
    }
}

</style>