import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [

    {
        path: '/order',
        name: 'order',
        component: () => import("@/views/admin/Login")
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
            ,{
                path: 'sysSql',
                name: 'sysSql',
                component: () => import("@/views/admin/SysSql")
            }
            ,{
                path: 'sysTag',
                name: 'sysTag',
                component: () => import("@/views/admin/SysTag")
            }
            ,{
                path: 'article',
                name: 'article',
                component: () => import("@/views/admin/Article")
            }
            ,{
                path: 'carMake',
                name: 'carMake',
                component: () => import("@/views/admin/CarMake")
            }
            ,{
                path: 'carManufacturer',
                name: 'carMake',
                component: () => import("@/views/admin/CarManufacturer")
            }
            ,{
                path: 'carModel',
                name: 'carModel',
                component: () => import("@/views/admin/CarModel")
            }
            ,{
                path: 'carParamType',
                name: 'carParamType',
                component: () => import("@/views/admin/CarParamType")
            }
            ,{
                path: 'fileUpload',
                name: 'fileUpload',
                component: () => import("@/views/admin/FileUpload")
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
