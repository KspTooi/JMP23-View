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
                <b-form-input v-model="table_data.filters.filter" placeholder="按名称查询"></b-form-input>
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


    <modal ref="modal" :jmp23_modal_data="modal_data" @done="refreshUserList"></modal>


  </b-card>


</template>

<script>

import modal from "@/components/modal/jmp23-modal-request-user"


export default {

  components:{
    modal:modal
  },

  name: "SysUser",

  data(){
    return{

      //表格数据
      table_data:{

        filters:{
          filter: null,
          filterOn: ["username"],
        }

        ,table_control:{
          commit:false,
          request:[]
        }

      }

      //模态框的数据
      ,modal_data:{

        reqType:"insert",
        load_modal:false,

        //提交请求
        commit:false,

        //请求信息
        request:{
        }

      }

    }
  }


  ,methods: {



    onUpdate(nvar) {
      this.modal_data.request = nvar.item;
      this.modal_data.request.role = 5;
      this.modal_data.reqType = "update";


      this.$refs.modal.loadWithData("update");
    }

    ,onRemove(nvar) {

      this.modal_data.reqType = "remove"

      this.modal_data.request = {
        userId: nvar.item.userId
      }

      this.$swal.fire({
        title: "你确定要删除用户吗?",
        showCancelButton: true
      }).then((ret) => {

        this.$refs.modal.commit();

      })


    }

    //加载模态框
    ,loadModal(ret, reqType) {

      this.modal_data.reqType = reqType;
      this.modal_data.request = {}

      this.$refs.modal.load();
    },

    //加载列数据
    refreshUserList() {
      this.table_data.table_control.commit = true;
    }

  }


}
</script>

<style scoped>

</style>