<template>

  <b-card style="margin: 1rem 1rem 10rem 1rem" bg-variant="light">


    <jmv43-modal ref="modal"
                 title="用户管理"
                 :insert="$rts.insert_user"
                 :update="$rts.update_user"
                 :remove="$rts.remove_user"
                 :req-type="modal_data.reqType"
                 :request="modal_data.request"
                 :request-done="()=>{$refs.table.commit()}"
    >

      <template v-slot:modal_content="data">

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>用户名:</label>
          </b-col>

          <b-col sm="9">
            <b-form-input size="sm" v-model="modal_data.request.username" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>密码:</label>
          </b-col>

          <b-col sm="9">
            <b-form-input type="password" size="sm" v-model="modal_data.request.password" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>手机号:</label>
          </b-col>

          <b-col sm="9">
            <b-form-input size="sm" v-model="modal_data.request.mobile" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>邮箱:</label>
          </b-col>

          <b-col sm="9">
            <b-form-input size="sm" v-model="modal_data.request.email" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="3">
            <label>状态:</label>
          </b-col>

          <b-col sm="9">
            <b-radio-group size="sm" v-model="modal_data.request.status" required>
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
            <b-select v-model="modal_data.request.role" size="sm" required>
              <b-select-option value="5">管理员</b-select-option>
              <b-select-option value="6">测试人员</b-select-option>
            </b-select>
          </b-col>

        </b-row>

      </template>
    </jmv43-modal>


    <template v-slot:header>
      <h6 class="mb-0">用户管理</h6>
    </template>


    <b-card-body class="overflow-auto">

      <b-card title="操作">

        <hr>

        <b-card-body>

          <jmp23-table-head insert-btn-text="新增用户"
                            placeholder="按名称"
                            :on-insert="onInsert"
                            :on-refresh="()=>{$refs.table.commit()}"
                            :on-filter-change="onFilterChange"
          />

        </b-card-body>

      </b-card>



      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_user"
                           :fields="$tf.fields_user"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >

        <template v-slot:cell(status)="data">
          <span v-if="data.item.status === 1"><b-btn variant="success" size="sm">正常</b-btn></span>
          <span v-if="data.item.status === 0"><b-btn variant="danger" size="sm">封禁</b-btn></span>
        </template>

      </jmv33-table-general>


    </b-card-body>




  </b-card>




</template>

<script>



export default {

  name: "SysUser",

  data(){
    return{

      //表格数据
      table_data:{
        filter: '',
        filterOn: ["username"],
      }

      //模态框的数据
      ,modal_data:{
        reqType:"insert"
        ,request:{
        }
      }

    }
  }


  ,methods: {

    //列表查询条件更改
    onFilterChange(nvar){
      this.table_data.filter = nvar;
    },

    //加入列表
    onInsert(){
      this.modal_data.request={}
      this.modal_data.reqType="insert"
      this.$refs.modal.load();
    }

    //更新列表
    ,onUpdate(nvar) {

      this.modal_data.request = nvar.item;

      this.modal_data.request.role = 5;
      this.modal_data.reqType = "update";

      this.$refs.modal.load();
    }

    //删除列表
    ,onRemove(nvar) {

      this.modal_data.reqType = "remove"

      this.modal_data.request = {
        userId: nvar.item.userId
      }

      this.$refs.modal.commitQuestion("你确定要删除用户吗?");

    }

  }


}
</script>

<style scoped>

</style>