<template>


  <b-card style="margin: 1rem 1rem 10rem 1rem" bg-variant="light">


    <jmv43-modal ref="modal"
                 title="菜单管理"
                 :insert="$rts.insert_menu"
                 :update="$rts.update_menu"
                 :remove="$rts.remove_menu"
                 :req-type="modal_data.reqType"
                 :request="modal_data.request"
                 :request-done="()=>{$refs.table.commit()}"
    >

      <template v-slot:modal_content="data">

        <b-row style="margin: 1rem 3rem">

          <b-col sm="4">
            <label>父级菜单:</label>
          </b-col>

          <b-col sm="8">
            <jmv33-select :url="$rts.list_menu" :payload="parentSelectRequestPayload" field_value="menuId" field_text="name" v-model="modal_data.request.parentId" show-zero-value="true"/>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="4">
            <label>菜单名:</label>
          </b-col>

          <b-col sm="8">
            <b-form-input size="sm" v-model="modal_data.request.name" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="4">
            <label>菜单地址:</label>
          </b-col>

          <b-col sm="8">
            <b-form-input size="sm" v-model="modal_data.request.url"></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="4">
            <label>权限节点:</label>
          </b-col>

          <b-col sm="8">
            <b-form-input size="sm" v-model="modal_data.request.perms"></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="4">
            <label>菜单类型:</label>
          </b-col>

          <b-col sm="8">

            <b-select size="sm" v-model="modal_data.request.type" required @change="menuTypeChange">
              <b-select-option value=0 >目录</b-select-option>
              <b-select-option value=1 >菜单</b-select-option>
              <b-select-option value=2 >按钮</b-select-option>
            </b-select>

          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="4">
            <label>菜单图标:</label>
          </b-col>

          <b-col sm="8">
            <b-form-input size="sm" v-model="modal_data.request.icon" required></b-form-input>
          </b-col>

        </b-row>

        <b-row style="margin: 1rem 3rem">

          <b-col sm="4">
            <label>排序值:</label>
          </b-col>

          <b-col sm="8">
            <b-form-input size="sm" v-model="modal_data.request.orderNum" required></b-form-input>
          </b-col>

        </b-row>


      </template>

    </jmv43-modal>


    <template v-slot:header>
      <h6 class="mb-0">菜单管理</h6>
    </template>

    <b-card-body class="overflow-auto">

      <b-card title="操作">

        <hr>
        <b-card-body>


          <jmp23-table-head insert-btn-text="按菜单名搜索"
                            placeholder="新增菜单"
                            :on-insert="onInsert"
                            :on-refresh="()=>{$refs.table.commit()}"
                            :on-filter-change="onFilterChange">

            <template v-slot:headExtra>
              <b-col cols="md-3">
                <b-checkbox value="true" v-model="parentOnly">仅显示父级菜单</b-checkbox>
              </b-col>
            </template>


          </jmp23-table-head>


        </b-card-body>

      </b-card>



      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_menu"
                           :fields="$tf.fields_menu"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
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

      </jmv33-table-general>


    </b-card-body>


  </b-card>


</template>

<script>


import Jmv33Select from "@/components/jmv33-components/general/jmv33-select";
export default{

  name: "Login",

  components: {Jmv33Select},
  watch:{

    parentOnly:{

      handler(nvar){

        if(nvar){
          this.$refs.table.commit({parentId:"0"});
          return true;
        }

        this.$refs.table.commit();
      }

    }


  }


  ,data(){
    return{

      parentOnly:false,

      select:{},

      parentSelectRequestPayload:{},

      table_data:{
        filter: null,
        filterOn: ["name"],
      }

      ,modal_data:{

        reqType:"insert"

        ,parents:{

        }

        ,request:{
          parentId:35
        }

      }

    }

  }


  ,methods:{

    menuTypeChange(val){

      let request = {
        type:val - 1
      }

      if(val === 0){
        request.type = 0;
      }

      this.parentSelectRequestPayload = request;

    },


    onSelectByParentId(val){
      this.modal_data.request.parentId = val;
    },

    onFilterChange(nvar){
      this.table_data.filter = nvar;
    }

    ,onRefresh(){
      this.$refs.table.commit();
    }

    ,onInsert(){
      this.modal_data.request = {}
      this.$refs.modal.load();
    }

    ,onUpdate(nvar){

      this.modal_data.reqType="update";

      console.log(nvar)

      this.parentSelectRequestPayload = {
        type:nvar.item.type - 1
      }

      if(nvar.item.type===0){
        this.parentSelectRequestPayload.type = 0;
      }

      this.modal_data.request = nvar.item;
      this.$refs.modal.load();
    }

    ,onRemove(nvar){

      this.modal_data.reqType = "remove"

      this.modal_data.request = {
        menuId: nvar.item.menuId
      }

      this.$refs.modal.commitQuestion("你确定要删除菜单吗?");
    }


  }



}
</script>

<style scoped>

</style>