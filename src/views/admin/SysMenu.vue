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
                <b-form-input v-model="table_data.filters.filter" placeholder="按名称查询"></b-form-input>
<!--                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">x</b-button>
                </b-input-group-append>-->
              </b-input-group>

            </b-col>

            <b-col cols="md-3">

              <b-btn-group>
                <b-btn variant="info" @click="loadModal('null','insert')">添加菜单</b-btn>

                <b-btn variant="info" @click="table_data.table_control.commit = true;parentOnly=false">
                  <span class="el-icon-refresh"/>刷新
                </b-btn>

              </b-btn-group>

            </b-col>

            <b-col cols="md-3">
              <b-checkbox value="true" v-model="parentOnly">仅显示父级菜单</b-checkbox>
            </b-col>

          </b-row>

        </b-card-body>

      </b-card>


      <jmp23-table-menu :jmp23_table_data="table_data"
                        @onUpdate="onUpdate"
                        @onRemove="onRemove"
      />


    </b-card-body>

  </b-card>


</template>

<script>

export default {

  name: "Login"


  ,watch:{

    parentOnly:{

      handler(nvar){

        if(nvar){
          this.table_data.table_control.commit = [true,{parentId:"0"}];
          return true;
        }

        this.table_data.table_control.commit = true;
      }

    }


  }



  ,data(){
    return{

      table_data:{

        table_control:{
          commit: [false,{}],
        },

        filters:{
          filter: null,
          filterOn: ["name"],
        }

      },


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
      }

      ,parentOnly:false

    }

  }


  ,methods:{



    onUpdate(nvar){
      console.log(nvar)
    }

    ,onRemove(nvar){

    }


    ,onFiltered(filterItem){
      this.rows = filterItem.length;
    },

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

    }


  }





}
</script>

<style scoped>

</style>