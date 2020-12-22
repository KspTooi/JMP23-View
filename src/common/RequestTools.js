import axios from "axios";
import swal from "sweetalert2";
import router from '@/router'


let server = "http://127.0.0.1:18001";
let oss = "https://jmp32.oss-cn-shenzhen.aliyuncs.com";


const UNAUTHORIZED = 401;
axios.interceptors.response.use(
    response => response,

    error => {

        const {status} = error.response;

        if(status === 401){
            //swal.fire("验证失败,请登录.", "", "error");
            sessionStorage.clear();
            router.push("/login").then(r => {
                console.log(r);
            });
        }


        return Promise.reject(error);
    }
);


axios.interceptors.request.use(
    config => {

        let jToken = sessionStorage.getItem("jToken");


        if(jToken!==null){
            config.headers.jToken = jToken;
            return config;
        }

        delete axios.defaults.headers.common["jToken"];

        return config
    }
)


export default {

    name: "RequestTools"

    ,code_success:200

    ,code_error:500

    ,get_file_image:oss + "/"

    ,export_user:server + "/admin/v1/export/sysuser"

    ,get_kaptcha:server + "/admin/kaptcha"

    ,insert_file_upload:server + "/admin/v1/files/insert"

    ,admin_account_login:server + "/admin/v1/login"

    ,admin_account_logout:server + "/admin/v1/logout"

    ,list_user:server + "/admin/v1/user/list"

    ,insert_user:server + "/admin/v1/user/insert"

    ,update_user:server + "/admin/v1/user/update"

    ,remove_user:server + "/admin/v1/user/remove"

    ,list_menu:server + "/admin/v1/menu/list"

    ,insert_menu:server + "/admin/v1/menu/insert"

    ,update_menu:server + "/admin/v1/menu/update"

    ,remove_menu:server + "/admin/v1/menu/remove"

    ,list_tag:server + "/admin/v1/tag/list"

    ,insert_tag:server + "/admin/v1/tag/insert"

    ,update_tag:server + "/admin/v1/tag/update"

    ,remove_tag:server + "/admin/v1/tag/remove"


    ,list_article:server + "/admin/v1/article/list"

    ,insert_article:server + "/admin/v1/article/insert"

    ,update_article:server + "/admin/v1/article/update"

    ,remove_article:server + "/admin/v1/article/remove"


    ,list_make:server + "/admin/v1/make/list"

    ,insert_make:server + "/admin/v1/make/insert"

    ,update_make:server + "/admin/v1/make/update"

    ,remove_make:server + "/admin/v1/make/remove"

    ,list_carmanufacturer:server + "/admin/v1/manufacturer/list"

    ,insert_carmanufacturer:server + "/admin/v1/manufacturer/insert"

    ,update_carmanufacturer:server + "/admin/v1/manufacturer/update"

    ,remove_carmanufacturer:server + "/admin/v1/manufacturer/remove"

    ,list_paramtype:server + "/admin/v1/paramtype/list"

    ,insert_paramtype:server + "/admin/v1/paramtype/insert"

    ,update_paramtype:server + "/admin/v1/paramtype/update"

    ,remove_paramtype:server + "/admin/v1/paramtype/remove"


    ,list_carmodel:server + "/admin/v1/carmodel/list"

    ,insert_carmodel:server + "/admin/v1/carmodel/insert"

    ,update_carmodel:server + "/admin/v1/carmodel/update"

    ,remove_carmodel:server + "/admin/v1/carmodel/remove"



    ,list_car:server + "/admin/v1/car/list"

    ,insert_car:server + "/admin/v1/car/insert"

    ,update_car:server + "/admin/v1/car/update"

    ,remove_car:server + "/admin/v1/car/remove"



    ,list_product:server + "/admin/v1/product/list"

    ,insert_product:server + "/admin/v1/product/insert"

    ,update_product:server + "/admin/v1/product/update"

    ,remove_product:server + "/admin/v1/product/remove"



    ,list_activity:server + "/admin/v1/activity/list"

    ,insert_activity:server + "/admin/v1/activity/insert"

    ,update_activity:server + "/admin/v1/activity/update"

    ,remove_activity:server + "/admin/v1/activity/remove"


    ,list_message:server + "/admin/v1/message/list"

    ,insert_message:server + "/admin/v1/message/insert"

    ,update_message:server + "/admin/v1/message/update"

    ,remove_message:server + "/admin/v1/message/remove"


    ,list_role:server + "/admin/v1/role/list"

    ,insert_role:server + "/admin/v1/role/insert"

    ,update_role:server + "/admin/v1/role/update"

    ,remove_role:server + "/admin/v1/role/remove"





    ,post(url,data) {


        let promise = axios.post(url, data);

        promise.catch(function (ret) {
            console.log(ret)
            swal.fire("请求服务器时发生错误!", "", "error");
        })


        return promise;
    }




}