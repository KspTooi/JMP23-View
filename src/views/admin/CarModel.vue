<template>

  <jmp23-center-card>


    <template v-slot:area-modal>

      <jmv33-modal ref="modal" :jmv33_modal_data="modal_data" @done="$refs.table.commit()" >

        <template v-slot:modal_content>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>品牌名称:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.brandName" required></b-form-input>
            </b-col>

          </b-row>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>车系名称:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.name" required></b-form-input>
            </b-col>

          </b-row>

        </template>

      </jmv33-modal>

    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="新增车系"
                        placeholder="搜索车系"
                        :on-insert="onInsert"
                        :on-refresh="()=>{$refs.table.commit()}"
                        :on-filter-change="onFilterChange"
      />

    </template>

    <template v-slot:area-table>

      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_carmodel"
                           :fields="$tf.fields_car_model"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >


      </jmv33-table-general>

    </template>


  </jmp23-center-card>

</template>

<script>
export default {
  name: "CarModel",

  data(){
    return{

      table_data:{
        filter: "",
        filterOn: ["title"],
      },

      modal_data:{
        title: '车系管理'
        ,reqType:"insert"
        ,insert:this.$rts.insert_carmodel
        ,update:this.$rts.update_carmodel
        ,remove:this.$rts.remove_carmodel
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