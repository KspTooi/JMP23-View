<template>
  <jmp23-center-card title="商品管理">


    <template v-slot:area-modal>

      <jmv43-modal ref="modal"
                   title="商品管理"
                   :insert="$rts.insert_product"
                   :update="$rts.update_product"
                   :remove="$rts.remove_product"
                   :req-type="modal_data.reqType"
                   :request="modal_data.request"
                   :request-done="()=>{$refs.table.commit()}"
      >

        <template v-slot:modal_content>

          <jmv43-modal-input label="商品名" v-model="modal_data.request.name"></jmv43-modal-input>

          <jmv43-modal-input label="售后服务:" v-model="modal_data.request.makeId"></jmv43-modal-input>

          <jmv43-modal-slot label="描述:"></jmv43-modal-slot>
          <jmv43-editor v-model="modal_data.request.description"></jmv43-editor>

          <hr>

        </template>


      </jmv43-modal>


    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="新增商品"
                        placeholder="按名称"
                        :on-insert="onInsert"
                        :on-refresh="()=>{$refs.table.commit()}"
                        :on-filter-change="onFilterChange"
      />

    </template>


    <template v-slot:area-table>

      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_product"
                           :fields="$tf.fields_product"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >




      </jmv33-table-general>


    </template>


  </jmp23-center-card>
</template>

<script>
export default {
  name: "product",

  data(){
    return{

      //表格数据
      table_data:{
        filter: '',
        filterOn: ["name"],
      }

      //模态框的数据
      ,modal_data:{
        reqType:"insert"
        ,request:{
        }
      }

    }
  },

  methods:{

    onFilterChange(val){
      this.table_data.filter = val;
    },

    onInsert(val){
      this.modal_data.reqType = "insert";
      this.modal_data.request = {};
      this.$refs.modal.load();

    },

    onUpdate(val){
      this.modal_data.reqType = "update";
      this.modal_data.request = val.item;
      this.$refs.modal.load();
    },

    onRemove(val){
      this.modal_data.reqType = "remove";
      this.modal_data.request = val.item;
      this.$refs.modal.commitQuestion("你确定要删除吗?");
    }


  }




}
</script>

<style scoped>

</style>