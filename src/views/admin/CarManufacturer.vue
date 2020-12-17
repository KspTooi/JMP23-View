<template>

  <jmp23-center-card>


    <template v-slot:area-modal>

      <jmv43-modal ref="modal"
                   title="厂商管理"
                   :insert="$rts.insert_carmanufacturer"
                   :update="$rts.update_carmanufacturer"
                   :remove="$rts.remove_carmanufacturer"
                   :req-type="modal_data.reqType"
                   :request="modal_data.request"
                   :request-done="()=>{$refs.table.commit()}"
      >

        <template v-slot:modal_content>


          <jmv43-modal-input label="厂商名称:" v-model="modal_data.request.manufacturerName" ></jmv43-modal-input>

        </template>

      </jmv43-modal>

    </template>


    <template v-slot:area-table-head>


      <jmp23-table-head insert-btn-text="新增厂商"
                        placeholder="搜索厂商"
                        :on-insert="onInsert"
                        :on-refresh="()=>{$refs.table.commit()}"
                        :on-filter-change="onFilterChange"
      />


    </template>



    <template v-slot:area-table>

      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_carmanufacturer"
                           :fields="$tf.fields_car_manufacturer"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >


      </jmv33-table-general>

    </template>

  </jmp23-center-card>


</template>

<script>
export default {

  name: "CarManufacturer",

  data(){
    return{

      table_data:{
        filter: "",
        filterOn: ["title"],
      },

      modal_data:{
        reqType:"insert"
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