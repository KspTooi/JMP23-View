import axios from "axios";
import swal from "sweetalert2";

let server = "http://127.0.0.1:18001";


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



    ,post(url,data) {


        let promise = axios.post(url, data);

        promise.catch(function () {
            swal.fire("请求服务器时发生错误!", "", "error");
        })


        return promise;
    }




}