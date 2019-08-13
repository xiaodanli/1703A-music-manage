export default  {
    namespaced:true,  //命名空间
    state:{
        username:''
    },
    mutations:{
        setName(state,name){
            state.username = name
        }
    }
}