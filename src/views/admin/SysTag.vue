<template>


  <jmp23-center-card title="标签管理">



    <template v-slot:area-modal>

      <jmv33-modal ref="modal" :jmv33_modal_data="modal_data" @done="$refs.table.commit()">

        <template v-slot:modal_content>
          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>标签名:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.name" required></b-form-input>
            </b-col>

          </b-row>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>标签类型:</label>
            </b-col>

            <b-col sm="8">
              <b-select v-model="modal_data.request.type" size="sm">
                <b-select-option value="0">系统标签</b-select-option>
                <b-select-option value="1">用户标签</b-select-option>
              </b-select>
            </b-col>

          </b-row>

          <hr>
        </template>

      </jmv33-modal>

    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="添加标签" placeholder="按标签名搜索" @onFilterChange="onFilterChange" @onInsert="onInsert"/>

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
        title: '标签管理'
        ,reqType:"insert"
        ,insert:this.$rts.insert_tag
        ,update:this.$rts.update_tag
        ,remove:this.$rts.remove_tag
        ,request:{
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