import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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
                path: 'login',
                name: 'login',
                component: () => import("../components/admin/Login")
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
