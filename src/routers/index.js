import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const Home = ()=>import( 'views/home/Home.vue');
const Category = ()=>import( 'views/category/Category.vue');
const Cart = ()=>import( 'views/cart/Cart.vue');
const Profile = ()=>import( 'views/profile/Profile.vue');
const Details = ()=>import( 'views/details/Details.vue');


const routes = [
  {path:'',redirect:'/home'},
  {path:'/home',component:Home},
  {path:'/category',component:Category},
  {path:'/cart',component:Cart},
  {path:'/profile',component:Profile},
  {path:'/details/:id',component:Details},

];

const router = new Router({
  routes,
  mode:'history'
})

export default router
