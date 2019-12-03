export default {
    addCart(context,payload){

      return new  Promise((resolve,reject)=>{
        const oldProduct = context.state.cartList.find(item =>item.iid === payload.iid)

        if(oldProduct){
            // oldProduct.count +=1;
            context.commit('addCounter',oldProduct)
            resolve('当前的商品数量加1')
  
        }else{
            payload.count = 1;
            // context.state.cartList.push(payload);
            context.commit('addToCart',payload)
            resolve('添加了新的商品')
      }
    })   
    }  
  }