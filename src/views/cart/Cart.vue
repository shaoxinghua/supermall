<template>
  <div>
    <nav-bar class="cart-nav">
      <div slot="center" >购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
import CartList from './childcomps/CartList'
import CartBottom from './childcomps/CartBottom'

  export default {
    name: "cart",
    components:{
      NavBar,
      CartList,
      CartBottom,
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
.cart-nav{
  background-color:var(--color-high-text);
  color: #fff;
}
</style>
