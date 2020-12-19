<template>

  <jmp23-center-card title="车款管理">


    <template v-slot:area-modal>

      <jmv43-modal ref="modal"
                   title="车款管理"
                   :insert="$rts.insert_car"
                   :update="$rts.update_car"
                   :remove="$rts.remove_car"
                   :req-type="modal_data.reqType"
                   :request="modal_data.request"
                   :request-done="()=>{$refs.table.commit()}"
      >

        <template v-slot:modal_content>

          <jmv43-modal-input label="车款名" v-model="modal_data.request.name"></jmv43-modal-input>

          <jmv43-modal-input label="厂商ID" v-model="modal_data.request.makeId"></jmv43-modal-input>

        </template>

      </jmv43-modal>


    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="新增车款"
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
                           :url="$rts.list_car"
                           :fields="$tf.fields_car"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >




      </jmv33-table-general>


    </template>


  </jmp23-center-card>


</template>

<script>
export default {

  name: "Car",

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