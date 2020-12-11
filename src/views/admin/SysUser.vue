<template>


  <b-card style="margin: 1rem 1rem 10rem 1rem" bg-variant="light">

    <template v-slot:header>
      <h6 class="mb-0">用户管理</h6>
    </template>


    <b-card-body class="overflow-auto">

      <b-card title="操作">

        <hr>

        <b-card-body>

          <b-row>

            <b-col cols="md-3">
              <b-input-group prepend="筛选:">
                <b-form-input v-model="filter" placeholder="按名称查询"></b-form-input>
<!--                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">清除</b-button>
                </b-input-group-append>-->
              </b-input-group>
            </b-col>

            <b-col cols="md-9">

              <b-btn-group>

                <b-btn variant="info" @click="loadModal('null','insert')">添加用户</b-btn>

                <b-btn variant="info" @click="refreshUserList">
                  <span class="el-icon-refresh"/>刷新
                </b-btn>

              </b-btn-group>

            </b-col>


          </b-row>

        </b-card-body>

      </b-card>


      <jmp23-table-user :jmp23_table_data="table_data" @onUpdate="onUpdate" @onRemove="onRemove"/>


    </b-card-body>



    <jmp23-modal-request-user :jmp23_modal_data="modal_user" :done="refreshUserList"></jmp23-modal-request-user>


  </b-card>


</template>

<script>

export default {

  name: "SysUser",

  data(){
    return{


      table_data:{

        currentPage:1
        ,rows:0
        ,perPage:8
        ,fields: this.$tf.fields_menu
        ,items:[]

        ,filters:{
          filter: null,
          filterOn: null,
        }

        ,table_control:{
          commit:false,
          request:[]
        }

      }

      //用户模态框的数据
      ,modal_user:{
        reqType:"insert",
        load_modal:false,

        userId:null,
        username:null,
        password:null,
        mobile:null,
        email:null,
        status:1,
        role:5,
      },

      perPage: 8,
      currentPage: 1,
      rows:0,
      filter: "",
      filterOn: ["username"],
      fields: [

        {
          key:"userId"
          ,label:"用户ID"
          ,sortable:true
        },
        {
          key:"username"
          ,label:"用户名"
        },
        {
          key:"email"
          ,label:"邮箱"
        },
        {
          key:"mobile"
          ,label:"手机号"
        },
        {
          key:"status"
          ,label:"状态"
        },
        {
          key:"createTime"
          ,label:"操作"
        }


      ],
      userList: []
    }
  }


  ,methods:{

    onUpdate(nvar){



      this.modal_user.reqType = "update";
      this.modal_user.load_modal = true;
      this.modal_user.userId = nvar.userId;
      this.modal_user.username = nvar.username;
      this.modal_user.password = nvar.password;
      this.modal_user.email = nvar.email;
      this.modal_user.mobile = nvar.mobile;
      this.modal_user.status = nvar.status;

    }

    ,onRemove(nvar){

    }

    //加载模态框
    ,loadModal(ret, reqType){

      let user = ret.item;

      if(reqType === "update"){
        this.modal_user.reqType = reqType;
        this.modal_user.userId = user.userId;
        this.modal_user.username = user.username;
        this.modal_user.password = user.password;
        this.modal_user.email = user.email;
        this.modal_user.mobile = user.mobile;
        this.modal_user.status = user.status;
        this.modal_user.load_modal = true;
        return true;
      }

      if(reqType === "remove"){
        this.modal_user.reqType = reqType;
        this.modal_user.userId = user.userId;

        this.$swal.fire({
          title:"你确定要删除用户吗?",
          showCancelButton:true
        }).then((ret)=>{
          if(ret.isConfirmed){
            this.req_userInfo();
          }
        })

        return true;
      }


      this.modal_user.reqType = reqType;
      this.modal_user.userId = null;
      this.modal_user.username = null;
      this.modal_user.password = null;
      this.modal_user.email = null;
      this.modal_user.mobile = null;
      this.modal_user.status = null;
      this.modal_user.load_modal = true;

    },


    //加载列数据
    refreshUserList(){
      this.$axios.post(this.$url.userList).then((ret)=>{
        this.userList = ret.data.payload;
        this.rows = ret.data.payload.length;
      });
    }

  }

  ,mounted() {
    this.refreshUserList();
  }


}
</script>

<style scoped>

</style>