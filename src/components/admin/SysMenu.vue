<template>


  <b-card style="margin: 1rem 1rem 10rem 1rem" bg-variant="light">

    <template v-slot:header>
      <h6 class="mb-0">菜单管理</h6>
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

                <b-btn variant="info" @click="loadModal('null','insert')">添加菜单</b-btn>

                <b-btn variant="info" @click="refreshList">
                  <span class="el-icon-refresh"/>刷新
                </b-btn>

              </b-btn-group>

            </b-col>


          </b-row>

        </b-card-body>

      </b-card>


      <b-table id="my-table"
               :items="userList"
               :fields="fields"
               striped bordered hover head-variant="light" foot-variant="light"
               :per-page="perPage"
               :current-page="currentPage"
               :filter="filter"
               :filter-included-fields="filterOn"
               sticky-header="400px"

      >
        <template v-slot:cell(perms)="data">
          <span v-if="data.item.perms === null">无需权限</span>
          {{data.item.perms}}
        </template>

        <template v-slot:cell(type)="data">
          <span v-if="data.item.type === 0"><b-btn variant="primary">目录</b-btn></span>
          <span v-if="data.item.type === 1"><b-btn variant="success">菜单</b-btn></span>
          <span v-if="data.item.type === 2"><b-btn variant="danger">按钮</b-btn></span>
        </template>


        <template v-slot:cell(createTime)="data">

          <b-btn variant="info" size="sm" @click="loadModal(data,'update')">
            <i class="el-icon-edit"></i>
          </b-btn>

          <span style="margin: 0 2px"></span>

          <b-btn variant="danger" size="sm" @click="loadModal(data,'remove')">
            <i class="el-icon-delete"></i>
          </b-btn>

        </template>

      </b-table>


      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
      />

<!--      <p class="mt-3">Current Page: {{ currentPage }}</p>-->


    </b-card-body>


<!--    MODAL DIALOG 模态框区域-->
    <b-modal id="edit-user-modal" title="编辑用户" centered hide-footer>

      <b-form @submit.prevent="req_userInfo">

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>用户名:</label>
          </b-col>

          <b-col sm="9">
            <b-form-input size="sm" v-model="modal_user.username" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>密码:</label>
          </b-col>

          <b-col sm="9">
            <b-form-input type="password" size="sm" v-model="modal_user.password" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>手机号:</label>
          </b-col>

          <b-col sm="9">
            <b-form-input size="sm" v-model="modal_user.mobile" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>邮箱:</label>
          </b-col>

          <b-col sm="9">
            <b-form-input size="sm" v-model="modal_user.email" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>状态:</label>
          </b-col>

          <b-col sm="9">
            <b-radio-group size="sm" v-model="modal_user.status" required>
              <b-radio value="1">启用</b-radio>
              <b-radio value="0">禁用</b-radio>
            </b-radio-group>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>角色:</label>
          </b-col>

          <b-col sm="9">
            <b-select v-model="modal_user.role" size="sm" required>
              <b-select-option value="5">管理员</b-select-option>
              <b-select-option value="6">测试人员</b-select-option>
            </b-select>
          </b-col>

        </b-row>

        <b-row style="text-align: center">

          <b-col>
            <b-btn variant="info" type="submit" >保存</b-btn>
            <span style="margin: 0 10px"></span>
            <b-btn variant="danger" @click="$bvModal.hide('edit-user-modal')">取消</b-btn>
          </b-col>

        </b-row>
      </b-form>



    </b-modal>



  </b-card>


</template>

<script>

export default {


  name: "Login"

  ,data(){
    return{

      //用户模态框的数据
      modal_user:{
        reqType:"insert",
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
          key:"name"
          ,label:"菜单名"
          ,sortable:true
        },
        {
          key:"url"
          ,label:"菜单地址"
        },
        {
          key:"perms"
          ,label:"所属权限"
        },
        {
          key:"type"
          ,label:"类型"
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

    //加载模态框
    loadModal(ret, reqType){

      let user = ret.item;

      if(reqType === "edit"){
        this.modal_user.reqType = reqType;
        this.modal_user.userId = user.userId;
        this.modal_user.username = user.username;
        this.modal_user.password = user.password;
        this.modal_user.email = user.email;
        this.modal_user.mobile = user.mobile;
        this.modal_user.status = user.status;
        this.$bvModal.show("edit-user-modal");
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
      this.$bvModal.show("edit-user-modal");

    },

    //处理用户数据请求
    req_userInfo(){

      let data = this.modal_user;
      let url = this.$url.user_update;

      if(this.modal_user.reqType === "insert"){
        url = this.$url.user_insert;
      }

      if(this.modal_user.reqType === "update"){
        url = this.$url.user_update;
      }

      if(this.modal_user.reqType === "remove"){
        url = this.$url.user_remove;
      }

      let req = this.$rts.post(url,data);


      req.then((ret)=>{


        if(ret.data.code === this.$url.code_success){
          this.$swal.fire(ret.data.msg,"","success");
          this.$bvModal.hide("edit-user-modal");
          this.refreshList();
          return true;
        }

        this.$swal.fire(ret.data.msg,"","error");

      })



    },


    //加载列数据
    refreshList(){
      this.$axios.post(this.$url.menu_list).then((ret)=>{
        this.userList = ret.data.payload;
        this.rows = ret.data.payload.length;
      });
    }

  }

  ,mounted() {
    this.refreshList();
  }


}
</script>

<style scoped>

</style>