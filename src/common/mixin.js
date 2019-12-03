import {debounce} from "common/utils.js";

export const itemListenerMixin = {
    data(){
        return {
            imgLoadRefresh:null,
            refresh:null,
        }
    },
    mounted () {
        this.refresh = debounce(this.$refs.scroll.refresh,200);
  
        this.imgLoadRefresh = ()=>{this.refresh()}
        this.$bus.$on('itemImgLoad',this.imgLoadRefresh)
        // console.log('混入')
    }
}

export const backTopMixin ={
    data(){
        return{
            isshow:false,
        }
    },
    methods:{
        backclick(){
            this.$refs.scroll.scrollTo(0,0);
            // console.log('hunru')
        },
    }
}