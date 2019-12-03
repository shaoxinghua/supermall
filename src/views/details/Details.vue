<template>
  <div id='details'>
    <details-navbar class="details-navbar" @titleClick='titleClick' ref='nav'></details-navbar>
    <scroll class="details-wrapper" ref='scroll' :probe-type='3' @scroll="contentScroll"> 
        <details-swiper :top-images='topImages' ></details-swiper>
        <details-base-info :goods='goods'></details-base-info>
        <details-shop-info :shop='shop'></details-shop-info>
        <details-goods-info :detailInfo='detailInfo' @detailImgLoad='detailImgLoad'></details-goods-info>
        <details-param-info :paramInfo='paramInfo' ref='params'></details-param-info>
        <details-comment-info :commentInfo='commentInfo' ref='comment'></details-comment-info>
        <goods-list :goods='recommendInfo' ref='recommend'></goods-list>
    </scroll>
    <details-bottom-bar @addToCart='addToCart' class="details-bottom-bar"></details-bottom-bar>
    <back-top @click.native="backclick" v-show="isshow"></back-top>
    <toast :message='message' v-show='show'></toast>
  </div>
</template>

<script>
import DetailsNavbar from './childcomps/DetailsNavbar'
import DetailsSwiper from './childcomps/DetailsSwiper'
import DetailsBaseInfo from './childcomps/DetailsBaseInfo'
import DetailsShopInfo from './childcomps/DetailsShopInfo'
import DetailsGoodsInfo from './childcomps/DetailsGoodsInfo'
import DetailsParamInfo from './childcomps/DetailsParamInfo'
import DetailsCommentInfo from './childcomps/DetailsCommentInfo'
import DetailsBottomBar from './childcomps/DetailsBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import Toast from 'components/common/toast/Toast'

import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop';

import {getDetails,Goods,Shop,GoodsParam,getRecommend} from 'network/details'
import {debounce} from "common/utils.js";
import {itemListenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: 'Details',
  data () {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendInfo:[],
      themeTopsYs:[],
      getThemeTopY:null,
      message:null,
      show:false
    };
  },
  mixins:[itemListenerMixin,backTopMixin],
  components: {
      DetailsNavbar,
      DetailsSwiper,
      DetailsBaseInfo,
      DetailsShopInfo,
      Scroll,
      DetailsGoodsInfo,
      DetailsParamInfo,
      DetailsCommentInfo,
      GoodsList,
      DetailsBottomBar,
      BackTop,
      Toast
  },
  created(){
        this.iid = this.$route.params.id;

        getDetails(this.iid).then(res=>{
            console.log(res);
            const data = res.result;
            // 获取顶部图片数据
            this.topImages = data.itemInfo.topImages;
            // 获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services); 
            // 获取店铺信息
            this.shop = new Shop(data.shopInfo);   
            // 获取商品图片信息
            this.detailInfo = data.detailInfo;
            // 获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            // 获取评价信息
            if(data.rate.cRate!=0){
                this.commentInfo = data.rate.list[0]
            }
        });

        // 获取推荐信息
        getRecommend().then(res=>{
        //    console.log(res);
           this.recommendInfo = res.data.list;
        })

        this.getThemeTopY = debounce(()=>{
              this.themeTopsYs=[];
           this.themeTopsYs.push(0);
           this.themeTopsYs.push(this.$refs.params.$el.offsetTop)
           this.themeTopsYs.push(this.$refs.comment.$el.offsetTop)
           this.themeTopsYs.push(this.$refs.recommend.$el.offsetTop)

           console.log(this.themeTopsYs)
        },200)

  },
  mounted () {
     
  },
  destroyed(){
      this.$bus.$off('itemImgLoad',this.imgLoadRefresh)
  },
  methods: {
      detailImgLoad(){
           this.refresh();

           this.getThemeTopY();
         
      },
      titleClick(index){
          this.$refs.scroll.scrollTo(0,-this.themeTopsYs[index],200)
      },
      contentScroll(position){
        this.isshow = (-position.y)>1000;

        const themeTopY = -position.y;
        // console.log(themeTopY);
        // [0, 8414, 9309, 9548, __ob__: Observer]
        this.themeTopsYs.forEach((item,index)=> {    
             if(index!=3){
                 if(themeTopY>item&&themeTopY<this.themeTopsYs[index+1]){
                        this.$refs.nav.currentIndex = index;
                    }
             }else{
                 if(themeTopY>item){
                     this.$refs.nav.currentIndex = index;
                 }
             }        
        });
       

      },
      addToCart(){
         const product = {};
         product.iid = this.iid;
         product.title = this.goods.title;
         product.desc = this.goods.desc;
         product.img = this.topImages[0];
         product.nowPrice = this.goods.nowPrice;

         this.$store.dispatch('addCart',product).then((res)=>{
            //  console.log(res)
            this.show = true;
            this.message = res;
            setTimeout(()=>{
                this.show = false;
                this.message = '';
            },2000)
         });

      }

  }
}
</script>

<style lang='less' scoped>
#details{
    position: relative;
    z-index: 9;
    background: #ffffff;
    height: 100vh;
    .details-navbar{
        position: relative;
        z-index: 99;
        background-color: #fff;
    }
    .details-wrapper{
        height: calc(100% - 44px - 58px);
        position: relative;
    }
    .details-bottom-bar{
        position: relative;
        z-index: 99;
    }
}
</style>