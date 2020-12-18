<template title="消息管理">

  <jmp23-center-card>

    <template v-slot:area-modal>

      <jmv43-modal ref="modal"
                   title="消息管理"
                   :insert="$rts.insert_message"
                   :update="$rts.update_message"
                   :remove="$rts.remove_message"
                   :req-type="modal_data.reqType"
                   :request="modal_data.request"
                   :request-done="()=>{$refs.table.commit()}"
      >

        <template v-slot:modal_content>

          <jmv43-modal-input label="内容" v-model="modal_data.request.content"/>
          <jmv43-modal-input label="链接" v-model="modal_data.request.link"/>

        </template>


      </jmv43-modal>


    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="添加消息"
                        placeholder="搜索消息"
                        :on-insert="onInsert"
                        :on-refresh="()=>{$refs.table.commit()}"
                        :on-filter-change="onFilterChange"
      />



    </template>


    <template v-slot:area-table>

      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_message"
                           :fields="$tf.fields_message"
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
        filterOn: ["content"],
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