<template>

  <b-card style="margin: 1rem 1rem 10rem 1rem" bg-variant="light">

    <jmv33-modal ref="modal" :jmv33_modal_data="modal_data" @done="$refs.table.commit()">
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
    </jmv33-modal>


    <template v-slot:header>
      <h6 class="mb-0">用户管理</h6>
    </template>


    <b-card-body class="overflow-auto">

      <b-card title="操作">

        <hr>

        <b-card-body>

          <jmp23-table-head :jmp23_table_head_data="table_head_data" @onInsert="onInsert" @onRefresh="onRefresh" @onFilterChange="onFilterChange"/>

        </b-card-body>

      </b-card>



      <jmv33-table-general ref="table" :jmv33_table_data="table_data" @onUpdate="onUpdate" @onRemove="onRemove">

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

      //表头数据
      table_head_data:{
        placeholder:"按名称筛选"
        ,insertBtnText:"新增用户"
      },

      //表格数据
      table_data:{

        url: this.$rts.list_user
        ,fields: this.$tf.fields_user

        ,filters:{
          filter: '',
          filterOn: ["username"],
        }

      }

      //模态框的数据
      ,modal_data:{

        title:'用户管理'
        ,reqType:"insert"
        ,insert:this.$rts.insert_user
        ,update:this.$rts.update_user
        ,remove:this.$rts.remove_user
        ,request:{
        }

      }

    }
  }


  ,methods: {

    //刷新列表
    onRefresh(){
      this.$refs.table.commit();
    },

    //列表查询条件更改
    onFilterChange(nvar){
      this.table_data.filters.filter = nvar;
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