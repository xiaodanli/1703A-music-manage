import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './routes'

Vue.use(Router)

let router =  new Router({
  routes
})

let writeList = ['/login','/registry'];

router.beforeEach((to,from,next) => {
    if(writeList.includes(to.path)){
        next();
        return
    }
    if(window.localStorage.getItem('token')){
        next();
        return
    }else{
        next({
            path:'/login'
        })
    }
})

export default router
