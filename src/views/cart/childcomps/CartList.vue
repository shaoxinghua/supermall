<template>
  <div>
      <scroll class="cart-scroll" ref='scroll'>
          <cart-list-item v-for='item in cartList' :key='item.iid' :item-info='item'>
          </cart-list-item>
      </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import {mapGetters} from 'vuex'
export default {
  name: '',
  data () {
    return {
      
    };
  },
  components: {
      Scroll,
      CartListItem,
  },
  computed:{
      ...mapGetters(['cartList'])
  },
  activated(){
      this.$refs.scroll.refresh();
  },
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
.cart-scroll{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
}
</style>