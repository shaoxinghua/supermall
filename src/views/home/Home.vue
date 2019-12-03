<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="home-tab" @tabclick="tabcli" ref='tab1' v-show="isFixed" ></tab-control>
    <scroll class="content"
            ref='scroll' 
            :probe-type="3" 
            @scroll="contentscroll"
            :pull-up-load='true'
            @pullingUp='loadMore'>
      <home-swiper :banners="banners" @swiperImgLoad='swiperImgLoad'></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="home-tab" @tabclick="tabcli" ref='tab2'></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
   
   <back-top @click.native="backclick" v-show="isshow"></back-top>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/common/tabcontrol/TabControl'
  import Scroll from 'components/common/scroll/Scroll'


  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop';
  


  import HomeSwiper from './childcomps/HomeSwiper'
  import HomeRecommend from './childcomps/HomeRecommend'
  import FeatureView from './childcomps/FeatureView'

  import {getHomeMultidata,getHomeGoods} from "network/home";
 
 import {itemListenerMixin} from 'common/mixin.js'
  export default {
    name: "home.vue",
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data(){
      return {
        banners:null,
        recommends:null,
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isshow:false,
        tabOffsetTop:0,
        isFixed:false,
        saveY:0,
       
      }
    },
    mixins:[itemListenerMixin],
    created() {
      // 1.请求多个数据
      this.getHomeMultidata();

      // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      tabcli(index){
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
        }
        this.$refs.tab1.currentIndex = index;
        this.$refs.tab2.currentIndex = index;
      },

      backclick(){
          this.$refs.scroll.scrollTo(0,0);
     
      },

      contentscroll(position){
          // 回到顶部
          this.isshow = (-position.y)>1000;

          // tabcontrol吸顶效果
          this.isFixed = (-position.y)>this.tabOffsetTop;
      },

      loadMore(){
        this.getHomeGoods(this.currentType);
      },

      swiperImgLoad(){

        this.tabOffsetTop = this.$refs.tab2.$el.offsetTop;
        // console.log(this.tabOffsetTop);

      },

      // 网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        })
      }
    },
    mounted(){
    

    },
    activated(){
      // console.log(this.saveY)
      // this.$refs.scroll.scrollTo(0,this.saveY, 0);
      // this.$refs.scroll.refresh();

    },
    deactivated(){
      // this.saveY = this.$refs.scroll.getScrollY();
      // console.log(this.saveY)
      this.$bus.$off('itemImgLoad',this.imgLoadRefresh)
    }

  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height:100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
 
}
.content{
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom:49px;
  left: 0;
  right: 0;
}
  .home-tab{
    position: sticky;
    top:44px;
    background-color: #fff;
    z-index: 9;
  }

</style>
