import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [

    {
        path: '/order',
        name: 'order',
        component: () => import("../views/admin/Order")
    },
    {
        path: '/',
        name: 'Home',
/*        component: Home,*/
        redirect:"/admin"
    }
    ,{
        path: '/admin',
        name: 'admin',
        component: () => import("../views/AdminPanel")
        ,children:[
            {
                path: '/',
                name: 'index',
                component: () => import("@/components/admin/Index")
            },
            {
                path: 'login',
                name: 'login',
                component: () => import("@/views/admin/Login")
            }
            ,{
                path: 'sysUser',
                name: 'sysUser',
                component: () => import("@/views/admin/SysUser")
            }
            ,{
                path: 'sysMenu',
                name: 'sysMenu',
                component: () => import("@/views/admin/SysMenu")
            }
        ]
    }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
