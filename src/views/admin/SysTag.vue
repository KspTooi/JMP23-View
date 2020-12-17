<template>


  <jmp23-center-card title="标签管理">



    <template v-slot:area-modal>

      <jmv43-modal ref="modal"
                   title="标签管理"
                   :insert="$rts.insert_tag"
                   :update="$rts.update_tag"
                   :remove="$rts.remove_tag"
                   :req-type="modal_data.reqType"
                   :request="modal_data.request"
                   :request-done="()=>{$refs.table.commit()}"
      >

        <template v-slot:modal_content>


          <jmv43-modal-input label="标签名:" v-model="modal_data.request.name" />

          <jmv43-modal-input label="标签类型:" v-model="modal_data.request.type" />


          <hr>
        </template>

      </jmv43-modal>

    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="添加标签"
                        placeholder="按标签名搜索"
                        :on-insert="onInsert"
                        :on-refresh="()=>{$refs.table.commit()}"
                        :on-filter-change="onFilterChange"
      />

    </template>


    <template v-slot:area-table>

      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_tag"
                           :fields="$tf.fields_tag"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >

        <template v-slot:cell(type)="data">
          <span v-if="data.item.type === 0">系统标签</span>
          <span v-if="data.item.type === 1">用户标签</span>
        </template>

        <template v-slot:cell(createTime)="data">
          <span v-if="data.item.createTime === null"><b-btn variant="success" size="sm">暂无数据</b-btn></span>
          <span v-if="data.item.createTime !== null">{{data.item.createTime}}</span>
        </template>

        <template v-slot:cell(lastUpdateTime)="data">
          <span v-if="data.item.lastUpdateTime === null"><b-btn variant="success" size="sm">暂无数据</b-btn></span>
          <span v-if="data.item.lastUpdateTime !== null">{{data.item.lastUpdateTime}}</span>
        </template>

      </jmv33-table-general>

    </template>


  </jmp23-center-card>



</template>

<script>
export default {

  name: "SysTag",


  data(){
    return{

      //表格数据
      table_data:{
        filter: '',
        filterOn: ["name"],
      },

      //MODAL数据
      modal_data:{
        reqType:"insert",
        request:{
        }
      }

    }
  },

  methods:{

    onFilterChange(val){
      this.table_data.filter = val;
    },

    onInsert(){
      this.modal_data.reqType = "insert"

      this.modal_data.request = {}
      this.$refs.modal.load();
    },

    onUpdate(val){

      this.modal_data.reqType = "update"
      this.modal_data.request = val.item;
      this.$refs.modal.load();
    },

    onRemove(val){

      this.modal_data.reqType = "remove"

      this.modal_data.request = {
        id: val.item.id
      }

      this.$refs.modal.commitQuestion("你确定要删除标签吗?");
    }


  }


}


</script>

<style scoped>

</style>