<template>
  <jmp23-center-card>


    <template v-slot:area-modal>

      <jmv33-modal ref="modal" :jmv33_modal_data="modal_data" @done="$refs.table.commit()" >

        <template v-slot:modal_content>


          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>参数名称:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.typeName" required></b-form-input>
            </b-col>

          </b-row>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>是否启用:</label>
            </b-col>

            <b-col sm="8">

              <b-select v-model="modal_data.request.state" required size="sm">
                <b-select-option value="1">有效</b-select-option>
                <b-select-option value="0">无效</b-select-option>
              </b-select>

            </b-col>

          </b-row>


        </template>

      </jmv33-modal>

    </template>

    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="新增参数类型" placeholder="搜索参数类型" @onFilterChange="onFilterChange" @onInsert="onInsert" @onRefresh="$refs.table.commit()"/>

    </template>


    <template v-slot:area-table>

      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_paramtype"
                           :fields="$tf.fields_car_paramtype"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >


      </jmv33-table-general>

    </template>

  </jmp23-center-card>
</template>

<script>
export default {

  name: "CarParamType",

  data(){
    return{

      table_data:{
        filter: "",
        filterOn: ["title"],
      },

      modal_data:{
        title: '参数类型管理'
        ,reqType:"insert"
        ,insert:this.$rts.insert_paramtype
        ,update:this.$rts.update_paramtype
        ,remove:this.$rts.remove_paramtype
        ,request:{
        }
      },

    }
  },

  methods:{

    onFilterChange(val){
      this.table_data.filter = val;
    },

    onInsert(val){
      this.modal_data.reqType="insert"

      this.modal_data.request = {};

      this.$refs.modal.load();
    },

    onUpdate(val){
      this.modal_data.reqType="update"
      this.modal_data.request = val.item;
      this.$refs.modal.load();
    },

    onRemove(val){
      this.modal_data.request = val.item;
      this.modal_data.reqType="remove"
      this.$refs.modal.commitQuestion("是否要删除这条记录?");
    }

  }


}
</script>

<style scoped>

</style>