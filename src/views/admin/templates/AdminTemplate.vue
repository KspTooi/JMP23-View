<template title="templates">

  <jmp23-center-card>

    <template v-slot:area-modal>

      <jmv43-modal ref="modal"
                   title="templates"
                   :insert="$rts.templates"
                   :update="$rts.templates"
                   :remove="$rts.templates"
                   :req-type="modal_data.reqType"
                   :request="modal_data.request"
                   :request-done="()=>{$refs.table.commit()}"
      >

        <template v-slot:modal_content>



        </template>


      </jmv43-modal>


    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="templates"
                        placeholder="templates"
                        :on-insert="onInsert"
                        :on-refresh="()=>{$refs.table.commit()}"
                        :on-filter-change="onFilterChange"
      />



    </template>


    <template v-slot:area-table>

      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.templates"
                           :fields="$tf.templates"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >

      </jmv33-table-general>

    </template>

  </jmp23-center-card>

</template>

<script>
import {formatDate} from "@/common/jmv43-date";

export default {

  name: "Message",

  data(){
    return{
      //表格数据
      table_data:{
        filter: '',
        filterOn: ["templates"],
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