import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import adminUrl from './common/AdminUrl'

/*引入BootStarp*/
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/*引入ElementUI*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'



/*引入AXIOS*/
import axios from "axios";

Vue.config.productionTip = false;


//整合FontAwesome
dom.watch();
library.add(faUserSecret);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/*整合AXIOS*/
Vue.prototype.$axios = axios;
Vue.prototype.$url = adminUrl;


/*整合ElementUI框架*/
Vue.use(ElementUI);


/*整合BootStarp框架*/
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

let vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

