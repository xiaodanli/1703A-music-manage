export const routes = [
    {
        path:'/',
        redirect:'/music'
    },
    {
        path:'/login',
        component:() => import('@/views/login')
    },
    {
        path:'/registry',
        component:() => import('@/views/registry')
    },
    {
        path:'/music',
        component:() => import('@/views/music')
    },
    {
        path:'*',
        component:() => import('@/views/404')
    }
]