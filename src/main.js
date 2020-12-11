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
import modalUser from "@/components/modal/jmp23-modal-request-user"
import tableMenu from "@/components/table/jmp23-table-menu"
import tableUser from "@/components/table/jmp23-table-user"


Vue.component("jmp23-nav-top",navTop)
Vue.component("jmp23-nav-side-left",navSideLeft)
Vue.component("jmp23-content-main",contentMain)
Vue.component("jmp23-modal-request-user",modalUser)
Vue.component("jmp23-table-menu",tableMenu)
Vue.component("jmp23-table-user",tableUser)


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

let vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

