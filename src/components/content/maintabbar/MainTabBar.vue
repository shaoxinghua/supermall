<template>
  <div id="maintabbar">
    <Tabbar>
      <Tabbaritem  path="/home" activeColor="#ff5777">
        <img slot="item-image" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-image-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </Tabbaritem>
      <Tabbaritem path="/category" activeColor="#ff5777">
        <img slot="item-image" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-image-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </Tabbaritem>
      <Tabbaritem path="/cart" activeColor="#ff5777">
        <img slot="item-image" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-image-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </Tabbaritem>
      <Tabbaritem path="/profile" activeColor="#ff5777">
        <img slot="item-image" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-image-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </Tabbaritem>
    </Tabbar>
  </div>
</template>

<script>
  import Tabbar from 'components/common/tabbar/TabBar'
  import Tabbaritem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components:{
      Tabbar,
      Tabbaritem
    }
  }
</script>

<style scoped>

</style>
