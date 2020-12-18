<template>
  <jmp23-center-card title="活动管理">


    <template v-slot:area-modal>

    </template>


    <template v-slot:area-modal>

      <jmv43-modal ref="modal"
                   title="活动管理"
                   :insert="$rts.insert_activity"
                   :update="$rts.update_activity"
                   :remove="$rts.remove_activity"
                   :req-type="modal_data.reqType"
                   :request="modal_data.request"
                   :request-done="()=>{$refs.table.commit()}"
      >

        <template v-slot:modal_content>

          <jmv43-modal-input label="活动标题" v-model="modal_data.request.title"/>

          <jmv43-modal-input label="创建者:" v-model="modal_data.request.author"/>

          <jmv43-modal-input-date label="开始时间" v-model="modal_data.request.begin_time"></jmv43-modal-input-date>

          <jmv43-modal-input-date label="结束时间" v-model="modal_data.request.end_time"></jmv43-modal-input-date>

          <jmv43-modal-input label="链接:" v-model="modal_data.request.link"/>

        </template>


      </jmv43-modal>


    </template>

    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="新增活动"
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
                           :url="$rts.list_activity"
                           :fields="$tf.fields_activity"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >

        <template v-slot:cell(begin_time)="data">
          {{fmt(new Date(data.item.begin_time),"yyyy-MM-dd")}}
        </template>

        <template v-slot:cell(end_time)="data">
          {{fmt(new Date(data.item.end_time),"yyyy-MM-dd")}}
        </template>


      </jmv33-table-general>


    </template>


  </jmp23-center-card>
</template>

<script>

import {formatDate} from "@/common/jmv43-date"

export default {
  name: "activity",

  data(){
    return{

      //表格数据
      table_data:{
        filter: '',
        filterOn: ["title"],
      }

      //模态框的数据
      ,modal_data:{
        reqType:"insert"
        ,request:{
        }
        ,converter:{

        }
      }

    }
  },

  methods:{

    fmt(date, fmt){
      return formatDate(date,fmt);
    },

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

      this.modal_data.request.begin_time = formatDate(new Date(val.item.begin_time),"yyyy-MM-dd");
      this.modal_data.request.end_time = formatDate(new Date(val.item.end_time),"yyyy-MM-dd");

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