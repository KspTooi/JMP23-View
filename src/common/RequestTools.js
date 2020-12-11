import axios from "axios";
import swal from "sweetalert2";

let server = "http://127.0.0.1:18001";

export default {

    name: "RequestTools"

    ,code_success:200

    ,code_error:500

    ,admin_account_login:server + "/admin/v1/login"

    ,admin_account_logout:server + "/admin/v1/logout"

    ,userList:server + "/admin/v1/user/list"

    ,user_insert:server + "/admin/v1/user/insert"

    ,user_update:server + "/admin/v1/user/update"

    ,user_remove:server + "/admin/v1/user/remove"

    ,menu_list:server + "/admin/v1/menu/list"

    ,menu_insert:server + "/admin/v1/menu/insert"

    ,menu_update:server + "/admin/v1/menu/update"

    ,menu_remove:server + "/admin/v1/menu/remove"



    ,post(url,data) {

        let promise = axios.post(url, data);

        promise.catch(function () {
            swal.fire("请求服务器时发生错误!", "", "error");
        })


        return promise;
    }


}