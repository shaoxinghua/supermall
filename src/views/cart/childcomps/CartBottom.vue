<template>
 <div class="bottom-menu">
    <CheckButton class="select-all" :checked='isSelectAll' @checkBtnClick='checkBtn' ></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去结算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottom',

  data () {
    return {
      
    };
  },
  components: {
      CheckButton,
  },
  computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
       return  this.cartList.filter(item => item.checked).reduce((pre,item)=>{
                 return pre + item.nowPrice*item.count    
          },0).toFixed(2)
      },
      checkLength(){
          return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
          if(!this.cartList.length) return false;
          return !this.cartList.filter(item=>!item.checked).length
      }
  },
  mounted () {},
  methods: {
      checkBtn(){
          if(this.isSelectAll){
              this.cartList.filter(item => item.checked = false)
          }else{
              this.cartList.filter(item => item.checked = true)
          }
      }
  }
}
</script>

<style lang='less' scoped>
.bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>