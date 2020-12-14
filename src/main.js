import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


//引入内部常量
import requestTools from './common/RequestTools.js'
import tableFields from "@/components/table/jmp23-table-fields"

/*引入BootStarp*/
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/*引入ElementUI*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'

import { faUser, faCamera } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


/*引入AXIOS*/
import axios from "axios";

/*引入弹窗组件*/
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//引入内部组件
import navTop from "@/components/general/jmp23-nav-top"
import navSideLeft from "@/components/general/jmp23-nav-side-left"
import contentMain from "@/components/general/jmp23-content-main"
import tableHead from "@/components/table/jmp23-table-head"
import centerCard from "@/components/general/jmp23-center-card"



//JMV33通用表格
import jmv33TableGeneral from "@/components/jmv33-components/table/jmv33-table-general"

//JMV33通用模态框
import jmv33Modal from "@/components/jmv33-components/modal/jmv33-modal"

//JMV33 带网络请求的select
import jmv33SelectGeneral from "@/components/jmv33-components/table/jmv33-table-general"


//JMP组件
Vue.component("jmp23-nav-top",navTop)
Vue.component("jmp23-nav-side-left",navSideLeft)
Vue.component("jmp23-content-main",contentMain)
Vue.component("jmp23-table-head",tableHead)
Vue.component("jmp23-center-card",centerCard)



//JMV组件
Vue.component("jmv33-table-general",jmv33TableGeneral)
Vue.component("jmv33-modal",jmv33Modal)



Vue.config.productionTip = false;


//整合FontAwesome
library.add(faUser, faCamera);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/*整合AXIOS*/
Vue.prototype.$axios = axios;
Vue.prototype.$url = requestTools;
Vue.prototype.$rts = requestTools;
Vue.prototype.$tf = tableFields;


/*整合ElementUI框架*/
Vue.use(ElementUI);


/*整合BootStarp框架*/
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

/*整合弹窗组件*/
Vue.use(VueSweetalert2);

router.beforeEach((to, from, next) => {


    if(to.path === "/logout"){
        console.log("用户登出!");
        sessionStorage.clear();
        next(from);
    }

    next();

})


let vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

