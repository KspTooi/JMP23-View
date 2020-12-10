import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'Home',
/*        component: Home,*/
        redirect:"/admin"
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
    ,{
        path: '/admin',
        name: 'admin',
        component: () => import("../views/AdminPanel")
        ,children:[
            {
                path: '/',
                name: 'index',
                component: () => import("../components/admin/Index")
            }
            ,{
                path: 'sysUser',
                name: 'sysUser',
                component: () => import("../components/admin/SysUser")
            }
            ,{
                path: 'sysMenu',
                name: 'sysMenu',
                component: () => import("../components/admin/SysMenu")
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
